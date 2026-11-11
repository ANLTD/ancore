import type { AnyServerRouteMethod, TypedFetchOptions, TypedFetchRequest, TypedServerResponse } from 'nuxt/app'


export type TApi = <
	T = unknown,
	R extends TypedFetchRequest = TypedFetchRequest,
	M extends AnyServerRouteMethod = unknown extends T ? 'get' : AnyServerRouteMethod
>(request: R, opts?: TypedFetchOptions<R, M>) => Promise<TypedServerResponse<R, T, M>>