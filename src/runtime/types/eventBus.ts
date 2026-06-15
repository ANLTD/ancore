import type { EventBusIdentifier, UseEventBusReturn } from '@vueuse/core'


/**
 * Registry of globally-known event bus channels.
 *
 * Augment it to predefine the channels available across the app together with
 * their event (and optional payload) types. This is best done once, next to the
 * ancore config:
 *
 * ```ts
 * // ancore.config.ts (or any *.d.ts)
 * declare module '#ancore/types' {
 *   interface AnEventBusChannels {
 *     // bare form — only the event type
 *     'cart:count': number
 *     // descriptor form — event + payload
 *     'user:login': { event: { id: string }, payload: { source: string } }
 *   }
 * }
 * ```
 *
 * Channels not listed here can still be used by passing the types locally:
 * `useAnEventBus<MyEvent, MyPayload>('local-channel')`.
 */
export interface AnEventBusChannels {}

export type AnEventBusChannel = keyof AnEventBusChannels

type AnEventBusDescriptor = { event?: unknown, payload?: unknown }

// Resolve the event type for a registered channel.
// Supports both the bare form (`'ch': T`) and the descriptor form (`'ch': { event: T }`).
export type AnEventBusEvent<K> = K extends keyof AnEventBusChannels
	? AnEventBusChannels[K] extends AnEventBusDescriptor
		? AnEventBusChannels[K]['event']
		: AnEventBusChannels[K]
	: unknown

// Resolve the payload type for a registered channel (defaults to `any`).
export type AnEventBusPayload<K> = K extends keyof AnEventBusChannels
	? AnEventBusChannels[K] extends { payload: infer P }
		? P
		: any
	: any

export type { EventBusIdentifier, UseEventBusReturn }