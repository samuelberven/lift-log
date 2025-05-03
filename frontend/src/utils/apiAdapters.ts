// utils/apiAdapters.ts

// Check an environment variable to decide if the payload should be wrapped.
// For a Rails backend, you’d typically set VITE_WRAP_PAYLOAD=true,
// and for other backends that expect a flat structure, you might set it to "false".
const shouldWrapPayload = import.meta.env.VITE_WRAP_PAYLOAD === 'true';

/**
 * Wraps a payload under a root key for the given model.
 *
 * @param modelName - The key under which the payload should live (e.g. 'exercise', 'user').
 * @param payload - The data to send to the backend.
 * @returns An object wrapped with the modelName key, or the payload itself if wrapping is disabled.
 */
export function wrapPayload<T extends object>(modelName: string, payload: T): object {
  return shouldWrapPayload ? { [modelName]: payload } : payload;
}
