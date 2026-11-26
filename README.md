# Awesome UI SDK [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of component libraries, framework adapters, tools, and examples for [Vercel UI SDK](https://ui-sdk.dev/).

[UI SDK](https://github.com/vercel-labs/ui) provides a framework-free TypeScript core for UI behaviors, with adapters for React, Vue, Svelte, Solid, and Web Components. This list covers that project's ecosystem.

An independent community list, unaffiliated with Vercel.

[Browse and search the collection](https://awesome-ui-sdk.dev/).

## Contents

- [Official resources](#official-resources)
- [Component libraries](#component-libraries)
- [Framework adapters](#framework-adapters)
- [Tools](#tools)
- [Examples and showcases](#examples-and-showcases)
- [Selection criteria](#selection-criteria)
- [Contributing](#contributing)
- [License](#license)

## Official resources

- [UI SDK](https://ui-sdk.dev/) - Official documentation and component reference. [Source](https://github.com/vercel-labs/ui). <!-- frameworks: react vue svelte solid web-components -->
- [Sink](https://ui-sdk.dev/sink) - Official gallery of interactive React examples, filterable by the UI SDK components, hooks, and core helpers they use. [Source](https://github.com/vercel-labs/ui/tree/main/apps/docs/app/sink). <!-- frameworks: react -->
- [Add Dark Mode](https://ui-sdk.dev/docs/guides/dark-mode) - Guide to persisting light, dark, and system preferences with UI SDK and applying the selected scheme before first paint. <!-- frameworks: react vue svelte solid web-components -->
- [Build a Component](https://ui-sdk.dev/docs/guides/build-a-component) - Walkthrough of building a reactions bar with UI SDK state, behaviors, and styling. <!-- frameworks: react vue svelte solid web-components -->
- [Built for Agents](https://ui-sdk.dev/docs/agents) - Documentation for the agent bridge, component actions, and WebMCP integration. <!-- frameworks: react vue svelte solid web-components -->
- [UI SDK Skill](https://ui-sdk.dev/docs/agents/skills) - Official skill for coding agents building with UI SDK. <!-- frameworks: react vue svelte solid web-components -->
- [LLM documentation index](https://ui-sdk.dev/llms.txt) - Entry point to machine-readable core, framework, agent, and guide documentation. <!-- frameworks: react vue svelte solid web-components -->

## Component libraries

- [agent-ui](https://kindui.dev/) - AI interface components with custom UI SDK primitives for composers, conversations, tool calls, and approvals, with React, Vue, Svelte, Solid, and Web Components renderers distributed through a shadcn registry. [Source](https://github.com/kind-ui/agent-ui) · [UI SDK integration](https://github.com/kind-ui/agent-ui/blob/main/packages/agent-ui/src/core/composer/composer.ts) · [Framework support](https://github.com/kind-ui/agent-ui/blob/main/packages/agent-ui/CHANGELOG.md#070). <!-- frameworks: react vue svelte solid web-components -->
- [audio/ui](https://www.audio-ui.dev/) - Audio controls with custom UI SDK primitives for knobs, faders, pads, and other audio interfaces, with React, Vue, Svelte, and Web Components adapters. Audio processing uses the library's own engine. [Source](https://github.com/ouestlabs/audio-ui) · [UI SDK integration](https://github.com/ouestlabs/audio-ui/blob/main/apps/www/src/registry/primitives/knob/knob.ts). <!-- frameworks: react vue svelte web-components -->
- [Dreamy UI](https://dreamy-ui.com/docs/guide/introduction) - React component registry styled with Panda CSS, with controls such as Popover using UI SDK React primitives. [UI SDK integration](https://github.com/dreamy-ui/dreamy-ui/blob/main/components/popover/popover-ui-context.tsx). <!-- frameworks: react -->
- [Eskais UI](https://github.com/p-otero/eskais-ui) - React components built on UI SDK with semantic theme tokens and agent support, distributed through a shadcn-style registry. In development. <!-- frameworks: react -->
- [Formula 2030](https://formula2030.alexandrejoly.me/) - React components styled after a concept car's control panel, wrapping UI SDK React primitives such as Slider, Switch, Tabs, and Toggle, with optional sound cues, distributed through a shadcn registry. Sound uses Web Audio. [Source](https://github.com/AlexDemzz/alexandrejoly.me/tree/master/packages/formula2030) · [UI SDK integration](https://github.com/AlexDemzz/alexandrejoly.me/blob/master/packages/formula2030/registry/formula/ui/formula/knob.tsx). <!-- frameworks: react -->
- [Frost UI](https://ui.modimihir.com/) - React components for chat, forms, navigation, and data display, with interactive demos and source examples. The author reports using UI SDK. The integration scope is unverified. [Component demos](https://ui.modimihir.com/components). <!-- frameworks: react -->
- [HextaUI (UI SDK collection)](https://hextaui.com/docs/ui-sdk-color-picker) - Styled React components in HextaUI's dedicated UI SDK collection, including color picker, token input, tree, and timeline. Other parts of the library use Base UI. [Source](https://github.com/preetsuthar17/hextaui/tree/main/components/ui). <!-- frameworks: react -->
- [Keyframery](https://keyframery.com/) - Animated React components built on UI SDK, with plain CSS motion styles and a shadcn-compatible registry. [Source](https://github.com/keyframery/keyframery). <!-- frameworks: react -->
- [Kiln](https://github.com/HoneyPaptan/kiln) - Local design-system showcase for agent interfaces, with styled UI SDK controls, a custom composer primitive, and sound cues driven by component changes. Includes setup instructions; no hosted demo. [UI SDK integration](https://github.com/HoneyPaptan/kiln/blob/main/src/system/composer/primitive.ts). <!-- frameworks: react -->
- [Kova UI](https://ui.amashona.com/) - React design system with Tailwind CSS design tokens and UI SDK-backed controls such as Select, Checkbox, and Tooltip. [Source](https://github.com/matagaralph/kova-ui) · [UI SDK integration](https://github.com/matagaralph/kova-ui/blob/main/packages/ui/src/components/Select/Select.tsx). <!-- frameworks: react -->
- [Lenso UI](https://ui.lenso.dev/) - React components with StyleX styling, glass materials, and UI SDK interactions. [Source](https://github.com/LioRael/lenso-ui) · [UI SDK dependencies](https://github.com/LioRael/lenso-ui/blob/main/packages/ui/package.json). <!-- frameworks: react -->
- [macbetter](https://github.com/kyleledbetter/macbetter) - Apple-inspired React components wrapping UI SDK controls, with macOS, iPadOS, and iOS presentation modes and CSS theme tokens. [Documentation](https://macbetter.dev/) · [UI SDK integration](https://github.com/kyleledbetter/macbetter/blob/main/packages/macbetter/src/components/button.tsx). <!-- frameworks: react -->
- [nostalgia-ui](https://github.com/giorgioliapakis/nostalgia-ui) - Mac OS 9-inspired React and Tailwind components, with UI SDK-backed dialogs, menus, and other controls in its component registry source. [UI SDK integration](https://github.com/giorgioliapakis/nostalgia-ui/blob/main/registry/new-york/ui/retro-dialog.tsx). <!-- frameworks: react -->
- [runeui](https://github.com/Martin-Business-Consultants/runeui) - Rails component partials and styles wrapping vendored UI SDK Web Components, loaded through importmap with Turbo integration and no JavaScript build step for consuming apps. [UI SDK integration](https://github.com/Martin-Business-Consultants/runeui/blob/master/app/javascript/runeui/sdk/entries.js) · [Component loader](https://github.com/Martin-Business-Consultants/runeui/blob/master/app/javascript/runeui/autoload.js). <!-- frameworks: web-components -->
- [Sadu](https://sadu-ui.pages.dev/) - React components built on UI SDK with Al Sadu weaving-inspired styles, English and Arabic labels, and right-to-left layouts, distributed through a shadcn registry. [Source](https://github.com/y0u-0/sadu-ui) · [UI SDK integration](https://github.com/y0u-0/sadu-ui/blob/main/src/sadu/sadu-switch.tsx). <!-- frameworks: react -->
- [shadcn.io (UI SDK collection)](https://www.shadcn.io/ui/ui-sdk) - Independent React component collection documented as using `@ui-sdk/react`, with live previews and shadcn CLI installation. A free account is required to view or install the code. <!-- frameworks: react -->
- [SPEC-01 Hardware](https://spec-01.vercel.app/) - Hardware-inspired React components and device examples built on UI SDK behaviors, distributed through a shadcn-compatible registry. [Source and integration details](https://github.com/shuding/spec-01). <!-- frameworks: react -->
- [ui-sdk-elements](https://jagreehal.github.io/ui-sdk-elements/) - Themed UI SDK Web Components and custom primitives, with an on-demand loader and a Vite plugin for building component CDNs. [Source](https://github.com/jagreehal/ui-sdk-elements) · [UI SDK integration](https://github.com/jagreehal/ui-sdk-elements/blob/main/src/components/step-grid.ts). <!-- frameworks: web-components -->
- [UI-Theme (UI SDK collection)](https://www.ui-theme.dev/docs/components) - Registry templates for React theme toggles, switchers, and selectors built with UI SDK controls. [UI SDK integration](https://github.com/tonyedgal/ui-theme/tree/main/packages/ui-theme-registry/src/templates/react/ui-sdk). <!-- frameworks: react -->
- [UISet](https://uiset.dev/) - Styled React components, themes, kits, and page templates built on UI SDK, installable through a shadcn registry. Its `@uiset/web` package styles UI SDK's Web Components and adds the kits as custom elements made with `@ui-sdk/web`, documented for plain HTML, Vue, Svelte, Solid, and Angular. [Source](https://github.com/superzero11/uiset) · [UI SDK integration](https://github.com/superzero11/uiset/blob/main/registry/uiset/ui/button.tsx) · [Web Components integration](https://github.com/superzero11/uiset/blob/main/web/src/inline-edit.ts) · [Web Components docs](https://uiset.dev/docs/web-components). <!-- frameworks: react vue svelte solid web-components angular -->
- [Vice City UI](https://vice-city-ui.vercel.app/) - GTA VI-inspired React design system with interactive demos of game menus, a HUD, and everyday controls. Dialogs and sliders wrap UI SDK React primitives. [Source](https://github.com/AlshehriAli0/vice-city-ui) · [UI SDK integration](https://github.com/AlshehriAli0/vice-city-ui/blob/main/src/ui/overlays/dialog.tsx). <!-- frameworks: react -->
- [ViteHub Kit](https://github.com/vite-hub/vitehub/tree/main/packages/kit) - Additional headless Vue parts, a Nuxt module, and CSS styles for UI SDK. [Integration details](https://github.com/vite-hub/vitehub/blob/main/packages/kit/README.md). <!-- frameworks: vue -->

## Framework adapters

- [ember-ui-sdk](https://dhaulagiri.github.io/ui-sdk-ember/) - Unofficial, experimental Ember adapter that renders UI SDK core primitives as unstyled Glimmer components. [Source](https://github.com/Dhaulagiri/ui-sdk-ember) · [UI SDK integration](https://github.com/Dhaulagiri/ui-sdk-ember/blob/main/packages/ember-ui-sdk/src/dialog/dialog.gts). <!-- frameworks: ember -->
- [ngx-ui-sdk](https://efuturetoday.github.io/ui-sdk-angular/) - Unofficial, experimental Angular adapter exposing UI SDK core primitives as directives on application markup, with optional themes. [Source](https://github.com/efuturetoday/ui-sdk-angular) · [UI SDK integration](https://github.com/efuturetoday/ui-sdk-angular/blob/main/projects/core/dialog/src/dialog.ts). <!-- frameworks: angular -->
- [ui-sdk-octane](https://github.com/erickarnis/ui-sdk-octane) - Unofficial, experimental Octane adapter that ports the UI SDK React component API onto UI SDK core. Supports Vite and Astro and requires building a tarball from source. [UI SDK integration](https://github.com/erickarnis/ui-sdk-octane/blob/main/src/components/tabs.tsx) · [Installation](https://github.com/erickarnis/ui-sdk-octane/blob/main/docs/install.md). <!-- frameworks: octane -->

## Tools

- [UI SDK Agent Inspector](https://github.com/Saif1803/uisdk-inspector) - Independent inspector for tracing agent bridge calls and linting UI SDK applications for agent readiness. <!-- frameworks: react -->

## Examples and showcases

- [Acme Board](https://ui-sdk-ember-board.vercel.app/) - Ember issue board with a custom UI SDK kanban primitive for moving cards and undo, plus an agent-operated issue editor built with ember-ui-sdk. [Source](https://github.com/Dhaulagiri/ember-board) · [UI SDK integration](https://github.com/Dhaulagiri/ember-board/blob/main/src/kanban.ts). <!-- frameworks: ember -->
- [Clickwheel](https://ipod-ui-sdk.vercel.app/) - iPod-style music player with custom UI SDK click-wheel and player primitives, Web Components controls, and agent actions. Music is synthesized separately with Web Audio. [Source](https://github.com/ericvalens/clickwheel) · [UI SDK integration](https://github.com/ericvalens/clickwheel/blob/main/src/primitives.js). <!-- frameworks: web-components -->
- [Cocktails](https://sboudrias.github.io/cocktails/) - Cocktail recipe app that uses UI SDK React for its list drawer and toast notifications. [Source](https://github.com/SBoudrias/cocktails) · [UI SDK integration](https://github.com/SBoudrias/cocktails/blob/main/apps/web/components/ListDrawer/index.tsx). <!-- frameworks: react -->
- [D20 Adventures](https://d20adventures.com/) - Fantasy tabletop RPG with an AI game master. The shared React UI wraps UI SDK Select, and playing requires signing in. [Source](https://github.com/johnpolacek/d20adventures.com) · [UI SDK integration](https://github.com/johnpolacek/d20adventures.com/blob/main/packages/ui/src/select.tsx). <!-- frameworks: react -->
- [Epoch](https://moladukes.github.io/epoch/) - Music player with five visual eras sharing UI SDK React controls and an agent bridge. Audio playback, synthesis, and equalization use Web Audio. [Source](https://github.com/moladukes/epoch) · [UI SDK integration](https://github.com/moladukes/epoch/blob/main/src/player/player.tsx). <!-- frameworks: react -->
- [Ferrari SF-25 Wheel](https://alexandrejoly.me/lab/formula-1) - Interactive 2025 Formula 1 steering wheel whose buttons, rotaries, and thumbwheels use UI SDK React Button, Slider, and Toggle, beside a simulated race display. Engine and radio sounds use Web Audio. [Source](https://github.com/AlexDemzz/alexandrejoly.me/tree/master/apps/web/src/lab/formula-1) · [UI SDK integration](https://github.com/AlexDemzz/alexandrejoly.me/blob/master/apps/web/src/lab/formula-1/wheel/rotary.tsx). <!-- frameworks: react -->
- [Graphisual](https://graphisual.app/) - Interactive graph editor and step-by-step algorithm visualizer with styled UI SDK React controls, including Select and Slider. [Source](https://github.com/lakbychance/graphisual) · [UI SDK integration](https://github.com/lakbychance/graphisual/tree/main/src/components/ui-sdk). <!-- frameworks: react -->
- [Liveblocks Social Media Calendar](https://liveblocks.io/examples/social-media-calendar/nextjs-social-media-calendar) - Collaborative Next.js content calendar with UI SDK React menus and Liveblocks-powered shared editing. [Source](https://github.com/liveblocks/liveblocks/tree/main/examples/nextjs-social-media-calendar) · [UI SDK integration](https://github.com/liveblocks/liveblocks/blob/main/examples/nextjs-social-media-calendar/components/ui/menu.tsx). <!-- frameworks: react -->
- [Manotes](https://manotes.dev/) - Local-first notes app with end-to-end encrypted sync. Its Solid web client uses UI SDK for dialogs, command menus, and other controls. [Source](https://github.com/klapacz/manotes) · [UI SDK integration](https://github.com/klapacz/manotes/blob/dune/apps/web/src/components/ui/command.tsx). <!-- frameworks: solid -->
- [NUS NextBus Web](https://bus.hewliyang.com/) - Campus shuttle tracker using UI SDK Svelte for stop search and view switching. The maintainer is winding down the project. [Source](https://github.com/hewliyang/nus-nextbus-web) · [UI SDK integration](https://github.com/hewliyang/nus-nextbus-web/blob/main/src/routes/%2Bpage.svelte). <!-- frameworks: svelte -->
- [oud](https://oud.so/) - Internet radio with live stations browsable by country and genre, using styled UI SDK React menus, popovers, dialogs, tabs, a combobox and a slider. Source unavailable. [UI SDK attribution](https://oud.so/about). <!-- frameworks: react -->
- [ouuo Mechanical Keyboard](https://ouuo.dev/keyboard/) - Interactive mechanical keyboard with a custom UI SDK primitive and React slider and switch controls, plus optional sound. [Source](https://github.com/LioRael/ouuo/tree/main/apps/keyboard). <!-- frameworks: react -->
- [Param CT Viewer](https://ct.taras.page/) - Browser-based CT scan viewer using UI SDK Web Components for plane selection, zoom controls, and the help popover. Source unavailable. <!-- frameworks: web-components -->
- [Perpetual](https://rolex-ui-sdk.vercel.app/) - Interactive wristwatch with custom UI SDK watch and crown primitives, Web Components bindings, and agent actions; three.js renders the watch. [Source](https://github.com/ericvalens/perpetual) · [UI SDK integration](https://github.com/ericvalens/perpetual/blob/main/src/primitives.js). <!-- frameworks: web-components -->
- [Planning Poker](https://planning-poker.scottmacleod.co/) - Real-time estimation rooms for agile teams with hidden votes and simultaneous reveal. Form controls wrap UI SDK React primitives. [Source](https://github.com/scottwmacleod/planning-poker) · [UI SDK integration](https://github.com/scottwmacleod/planning-poker/blob/main/src/components/ui/Field.tsx). <!-- frameworks: react -->
- [Pond](https://pond.raphaelsalaja.com/) - Desktop web archiver that uses the UI SDK React Tree for its sidebar. [Source](https://github.com/raphaelsalaja/pond) · [UI SDK integration](https://github.com/raphaelsalaja/pond/blob/main/packages/ui/src/sidebar/tree.tsx). <!-- frameworks: react -->
- [Pylon Example UI](https://github.com/pylonsync/pylon/tree/main/examples/_shared) - Shared React controls for Pylon's runnable full-stack examples, with styled wrappers around UI SDK primitives such as Select. [UI SDK integration](https://github.com/pylonsync/pylon/blob/main/examples/_shared/src/components/select.tsx). <!-- frameworks: react -->
- [Radio Tuner](https://justin-cole.vercel.app/) - 3D radio with a custom UI SDK station selector and React agent bridge, using HTML-in-Canvas to display controls on the model. Requires Chrome or Edge 157 or later. [Source](https://github.com/justin-at-straker/radio-tuner) · [UI SDK integration](https://github.com/justin-at-straker/radio-tuner/blob/main/src/ui/station.ts). <!-- frameworks: react -->
- [Taras Tereschenko](https://taras.page/) - Personal website with interactive cards and UI SDK React controls. Source unavailable. [Author's UI SDK attribution](https://x.com/taras_ter/status/2122075333818011836). <!-- frameworks: react -->
- [Translation Lens](https://translation-lens-six.vercel.app/) - Translation magnifier with UI SDK React settings controls and an agent bridge. Rendering uses WebGL and HTML-in-Canvas where supported, with a CSS fallback; translation uses Gemini through Vercel AI Gateway. [Source](https://github.com/justin-at-straker/translation-lens) · [UI SDK integration](https://github.com/justin-at-straker/translation-lens/blob/main/src/Panel.tsx). <!-- frameworks: react -->
- [ui-chords](https://www.ui-chords.dev/) - Browser chord instrument with a custom UI SDK joystick primitive and React transport controls for loop recording and playback. [Source](https://github.com/paisanos-io/ui-chords) · [UI SDK integration](https://github.com/paisanos-io/ui-chords/blob/main/components/joystick/joystick.ts). <!-- frameworks: react -->
- [ui-feed](https://ui-feed.dev/) - Scrollable feed of interactive UI SDK React component demos with visual variants, copyable prompts, and links to the corresponding component docs. Source unavailable. <!-- frameworks: react -->
- [UI SDK Demo](https://ui-sdkdemo.vercel.app/) - React and Next.js examples of toggles, forms, tabs, overlays, and other UI SDK components, with an exposed agent bridge. <!-- frameworks: react -->
- [ui-sdk ideas](https://uisdk.kapish.dev/) - Document-to-form and chat examples using UI SDK's agent bridge, change history, and confirmation hooks. Scripted demo mode makes real bridge calls without a model API key. [Source](https://github.com/kapishdima/uisdk-ideas) · [UI SDK integration](https://github.com/kapishdima/uisdk-ideas/blob/main/lib/agent.ts). <!-- frameworks: react -->
- [unstyled-editor](https://unstyled-editor.vercel.app/) - Lexical rich text editor with UI SDK React toolbars, menus, pickers, and dialogs. UI SDK handles the surrounding controls; Lexical handles document editing. [Source](https://github.com/htmujahid/unstyled-editor) · [UI SDK integration](https://github.com/htmujahid/unstyled-editor/blob/main/src/components/editor/plugins/toolbar/toolbar-plugin.tsx). <!-- frameworks: react -->
- [Winamp UI SDK](https://github.com/rauchg/winamp-ui-sdk) - Web Components recreation of a music player using UI SDK controls, custom primitives, and WebMCP integration. [Demo](https://winamp-ui-sdk.vercel.app/). <!-- frameworks: web-components -->

## Selection criteria

- Resources must directly use, extend, teach, or inspect UI SDK from [vercel-labs/ui](https://github.com/vercel-labs/ui).
- For libraries and tools, provide source imports, package dependencies, or documentation showing the integration. A copied skill file or migration plan alone does not establish adoption.
- A showcase without public source may qualify when its live site explicitly identifies UI SDK usage. Such attribution is not an independent source-code audit.
- Describe the specific integration. A project using UI SDK for some controls does not imply its rendering, audio, or other application logic uses the SDK.
- Prefer resources with a usable demo, documented setup, or a clear workflow. Inclusion does not certify compatibility with every UI SDK release or independently tested behavior.

General UI libraries and tools without a demonstrated UI SDK integration are outside this list's scope. Each linked project retains its own license and release status.

## Contributing

Suggest a resource or improve an entry through a pull request. Include evidence of its UI SDK integration and follow the [contribution guidelines](CONTRIBUTING.md).

To run the searchable resource website locally, see [development instructions](CONTRIBUTING.md#developing-the-website).

## License

This list is released under [CC0 1.0 Universal](LICENSE). Linked projects retain their own licenses.
