export type TArgument<TFn extends (...args: any[]) => any, Index extends number> =
	Index extends keyof Parameters<TFn>
		? Parameters<TFn>[Index]
		: never