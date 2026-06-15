import { useEventBus } from '@vueuse/core'
import type {
	AnEventBusChannels,
	AnEventBusEvent,
	AnEventBusPayload,
	EventBusIdentifier,
	UseEventBusReturn,
} from '#ancore/types'


const noop = () => {}


// Channels predefined in the ancore config (via `AnEventBusChannels` augmentation):
// types are inferred from the registry.
export function useAnEventBus<K extends keyof AnEventBusChannels>(
	key: K
): UseEventBusReturn<AnEventBusEvent<K>, AnEventBusPayload<K>>
// Locally-typed channels: pass the event/payload types explicitly.
export function useAnEventBus<T = unknown, P = any>(
	key: EventBusIdentifier<T>
): UseEventBusReturn<T, P>
export function useAnEventBus(key: EventBusIdentifier<unknown>): UseEventBusReturn<unknown, unknown> {
	const bus = useEventBus(key)

	// The @vueuse event bus registry is a module-level singleton. During SSR that
	// singleton is shared across every request, so listeners registered on the
	// server pile up and leak between requests (and would fire for the wrong
	// request). Subscriptions are a client-only concern, so on the server we make
	// `on`/`once` no-ops while keeping `emit`/`off`/`reset` as pass-throughs.
	if (import.meta.server) {
		return {
			...bus,
			on: () => noop,
			once: () => noop,
		}
	}

	return bus
}