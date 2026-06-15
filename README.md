# AnCore module for Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Nuxt][nuxt-src]][nuxt-href]

A set of composables, components and utilities for Nuxt to handle common tasks: data fetching with SSR, paginated lists, form validation, dialogs, i18n and more.

## Setup

```bash
npm i @anweb/nuxt-ancore
```

```ts
export default defineNuxtConfig({
  modules: ['@anweb/nuxt-ancore']
})
```

## Configuration

Options can be set inline under the `ancore` key in `nuxt.config`, or extracted
into a standalone `ancore.config.ts` at the project root:

```ts
// ancore.config.ts
import { defineAnCoreConfig } from '@anweb/nuxt-ancore'

export default defineAnCoreConfig({
  api: '~/utils/api',
  i18n: {
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: { translation: '~~/locales/en.json' }
    }
  }
})
```

Both sources are merged; values set inline in `nuxt.config` override the file.

## Composables

| Name | Description |
|---|---|
| `useAnData` | Data fetching with SSR/CSR support, URL params, query and auto-refresh |
| `useAnList` | Paginated lists with infinite scroll, filters and reverse mode |
| `useAnForm` | Form state, validation (async-validator), history and diff tracking |
| `useAnDialogs` | Dynamic dialogs: open, close, closeAll, swipe-to-dismiss |
| `useAnI18n` | i18next integration with per-component namespaces and language switching |
| `useAnEventBus` | SSR-safe `useEventBus` wrapper with a typed, predefinable channel registry |

## Components

| Name | Description |
|---|---|
| `AnTab` | Headless tab with lazy rendering and state preservation via `display: none` |
| `AnDropdown` | Dropdown with CSS Anchor Positioning, teleport and ARIA. `match-width` sizes the menu to the trigger |

## Utilities

| Name | Description |
|---|---|
| `toQuery` | Converts an object to a URL query string, filtering out null/undefined |
| `asyncInit` | SSR-aware init helper: awaits during SSR, fires without await on CSR |
| `coreApi` | Core API wrapper around `$fetch` with typed responses |

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@anweb/nuxt-ancore/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@anweb/nuxt-ancore

[npm-downloads-src]: https://img.shields.io/npm/dm/@anweb/nuxt-ancore.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/@anweb/nuxt-ancore

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
