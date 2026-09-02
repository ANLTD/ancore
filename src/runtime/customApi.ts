import type { TApi } from './types'


// Fallback target for the `#ancore/customApi` alias when the app does not
// configure `ancore.api`. Resolving the alias to a real module (instead of an
// ambient `declare module`) keeps the module from augmenting — and thus
// clashing with — the app's own auto-imported `api`.
export const api: TApi | null = null