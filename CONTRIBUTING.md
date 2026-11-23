# Contributing

This list covers the ecosystem of [Vercel UI SDK](https://ui-sdk.dev/), developed in [vercel-labs/ui](https://github.com/vercel-labs/ui).

## Suggest a resource

1. Check that the resource is not already listed.
2. Choose the category that matches its main purpose: component libraries, framework adapters, tools, or examples and showcases.
3. Link to the official project site or repository and add a short English description of its purpose and UI SDK integration.
4. Include evidence of that integration in your pull request: public source imports, package dependencies, or explicit documentation. For a closed-source showcase, link to the live site's UI SDK attribution and say that source is unavailable.
5. Explain what you tried and why you recommend it. Note known limitations, archived status, paid features, or release restrictions when relevant.
6. Disclose your connection to the project, including when you are its author or maintainer.

Use this format, adding a source or demo link when available:

```markdown
- [Project name](https://project.example/) - What it provides and how it uses UI SDK. [Source](https://github.com/owner/project).
```

Keep entries alphabetical within community categories. Avoid star counts, version numbers, promotional claims, tracking links, and duplicate entries across categories.

## What qualifies

- Component libraries built with `@ui-sdk/core` or a UI SDK framework adapter.
- Framework adapters that render UI SDK core primitives in another framework. Keep styled collections and extensions for an existing adapter under component libraries, and identify unofficial or experimental adapters explicitly.
- Tools that inspect, debug, test, or otherwise support UI SDK applications specifically.
- Runnable examples and applications demonstrating UI SDK usage.
- Tutorials and references teaching a concrete UI SDK workflow.

A similarly named package, a copied agent skill, or a planned migration does not establish that a project uses UI SDK. A generic component library or developer tool does not qualify solely because it could be used alongside UI SDK.

Do not describe an entire project as built on UI SDK when the evidence only covers one example or a subset of its controls. Distinguish source-verified integrations from live-site attribution, and keep compatibility claims limited to what the project documents.

For libraries using multiple UI primitives, list the UI SDK collection once under component libraries. Name the collection explicitly, link directly to its documentation or source, and describe its scope. Do not create a separate entry for every component.

## Corrections and removals

Fixes for descriptions, broken links, renamed projects, and discontinued integrations are welcome. Include an official announcement or source evidence explaining the change.

## Developing the website

Use Bun 1.4.4 from the repository root:

```sh
bun install --frozen-lockfile
bun run dev
bun run test
bun run build
bun run preview
```

The Next.js site has one source tree:

- `src/app/`: routes, metadata, global styles, robots, sitemap, and the social image.
- `src/components/`: the interactive resource directory, resource list, and UI SDK agent bridge.
- `src/lib/`: README parsing, filtering, server-side content loading, and site metadata.
- `tests/`: component, agent, server-rendering, and resource tests.

Use kebab-case for source files and directories, PascalCase for React components, and Next.js's required route filenames. Keep the curated entries in `README.md`; the server reads them during the build and pre-renders the complete collection. Search and category filters run in the browser and restore shared query parameters after hydration. Filtered URLs canonicalize to the homepage.

Use the site’s paper and ink visual language for the atlas and registry. Preserve light/dark themes, keyboard navigation, mobile layout, and the UI SDK agent bridge when changing components.

Vercel deploys `main` to [awesome-ui-sdk.dev](https://awesome-ui-sdk.dev/), running tests before the production build. GitHub Actions checks every push to `main` and every pull request. Cloudflare manages DNS; Vercel serves HTTPS and redirects `www` to the apex domain. Dependencies and the bundled Geist font retain their own licenses.

## Licensing

By submitting a contribution, you agree to release your contribution to this list under [CC0 1.0 Universal](LICENSE). This does not change the license of any linked resource.
