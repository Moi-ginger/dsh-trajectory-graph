# dsh-trajectory-graph

An architecture-graph conversation view for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). It renders the agent loop's fixed topology — ten nodes and eleven edges — as a live diagram: scope-driven card readings, animated edge traffic, a Trajectory-style timeline, and a per-node details drawer.

It is a third view beside Chat and Trajectory. Select a session, a turn, or a step to re-read every card, reband every edge, and refocus the timeline on that scope.

## Install

```sh
dsh plugin --profile web add "github:<you>/dsh-trajectory-graph#<sha>"
```

Restart `dsh --profile web`, then open the **Architecture** tab in the conversation view.

`dsh plugin` forwards to pnpm, so npm, `file:`, and tarball specs also work:

```sh
dsh plugin --profile web add ./dsh-trajectory-graph-0.1.0.tgz
```

## Build

The committed `lib/` is prebuilt, so installation needs no build step. To rebuild from source:

```sh
pnpm install
pnpm run build
```

The build is self-contained: it bundles `src/client` with esbuild and compiles `*.module.css` with lightningcss, without any monorepo project references.

## What it shows

- **Ten nodes** — Input, Prompt assembly, Model request, Assistant message, Tool call, Session log, Turn end, DeepSeek API, Sandbox (reserved), Workspace.
- **Three scopes** — session, turn, step — drive every reading together.
- **Card readings** — each node card leads with the recorded invocation or reply (e.g. `grep {"pattern": …}`) plus badges, corner flags, a meta row, and a closing row.
- **Edge traffic** — a `Calls` / `Tokens` toggle rebands the eleven edge widths; live edges carry an animated flow trace.
- **Timeline** — Trajectory's gestures: brush-to-scope, wheel zoom, right-drag pan, edge pan, hover tooltip, `Equal width` / `Actual duration` projections, and earlier-history paging.
- **Details drawer** — per-node collapsible groups; rows that carry a tool `callId` jump into the Trajectory view.

## Requirements

- DeepSeek Harness with the web profile (`@deepseek-ai/dsh-base` plus the in-box web client).
- The `ui-conversation` and `ui-trajectory` in-box plugins (they declare the `conversation.view` slot and the `trajectory` target this view consumes).

## License

MIT
