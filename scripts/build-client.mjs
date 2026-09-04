/**
 * Self-contained build for the dsh-trajectory-graph plugin.
 *
 * Produces two artifacts with no monorepo assumptions:
 *   - lib/index.js   — the node half the host Loader imports and `apply()`s.
 *   - lib/client.js  — the browser half in the closure-factory shape the DSH
 *                      kernel expects: `window.__ModuleLoader__.load({ id,
 *                      factory: (require) => ... })`, where `require` resolves
 *                      against the browser module table.
 *
 * CSS Modules (`*.module.css`) are compiled with lightningcss into a hashed
 * class map plus a tagged style tag injected at factory execution, mirroring
 * the in-box client bundle. React and the in-box module-table packages are
 * external — the harness supplies them, so they must not be inlined.
 */

import { build } from 'esbuild'
import { transform } from 'lightningcss'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'

// The factory id must equal the loader row name (the boot-graph entry id the
// kernel checks after fetching /plugins/<id>/client.js).
const MODULE_ID = 'dsh-trajectory-graph'

const cssModulesPlugin = {
  name: 'dsh-css-modules',
  setup(buildApi) {
    buildApi.onResolve({ filter: /\.module\.css$/ }, (args) => ({
      path: join(args.resolveDir, args.path),
      namespace: 'css-modules',
    }))
    buildApi.onLoad({ filter: /.*/, namespace: 'css-modules' }, (args) => {
      const source = readFileSync(args.path)
      const { code, exports: cssExports } = transform({
        filename: args.path,
        code: source,
        cssModules: { pattern: '[hash]_[local]' },
        minify: true,
      })
      const classMap = {}
      for (const [local, exported] of Object.entries(cssExports ?? {})) {
        classMap[local] = exported.name
      }
      const css = code.toString()
      const tagId = `${MODULE_ID}/${basename(args.path)}`
      const js = [
        `var css = ${JSON.stringify(css)};`,
        `var tagId = ${JSON.stringify(tagId)};`,
        `if (typeof document !== 'undefined' && document.querySelector('style[data-plugin-css="' + tagId + '"]') === null) {`,
        `  var tag = document.createElement('style');`,
        `  tag.dataset.plugin = ${JSON.stringify(MODULE_ID)};`,
        `  tag.dataset.pluginCss = tagId;`,
        `  tag.textContent = css;`,
        `  document.head.appendChild(tag);`,
        `}`,
        `var classMap = ${JSON.stringify(classMap)};`,
        `module.exports = classMap;`,
        `module.exports.default = classMap;`,
      ].join('\n')
      return { contents: js, loader: 'js', resolveDir: dirname(args.path) }
    })
  },
}

const header = `window.__ModuleLoader__.load({
\tid: ${JSON.stringify(MODULE_ID)},
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;
\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
`

const footer = `
\t\treturn module.exports;
\t}
});
`

const clientResult = await build({
  entryPoints: ['src/client/index.ts'],
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  jsx: 'automatic',
  target: 'es2020',
  write: false,
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@deepseek-ai/dsh-client-store',
    '@deepseek-ai/dsh-client-ui-primitives',
  ],
  plugins: [cssModulesPlugin],
  logLevel: 'info',
})

if (clientResult.outputFiles.length !== 1) {
  throw new Error(`build-client: expected one output file, got ${clientResult.outputFiles.length}`)
}

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node18',
  outfile: 'lib/index.js',
  write: true,
  logLevel: 'info',
})

mkdirSync('lib', { recursive: true })
writeFileSync('lib/client.js', header + clientResult.outputFiles[0].text + footer)
console.log(`build-client: wrote lib/index.js and lib/client.js (${clientResult.outputFiles[0].contents.length} bytes client body)`)
