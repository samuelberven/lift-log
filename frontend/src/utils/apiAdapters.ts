// utils/apiAdapters.ts

// Check an environment variable to decide if the payload should be wrapped.
// For a Rails backend, you’d typically set VITE_WRAP_PAYLOAD=true,
// and for other backends that expect a flat structure, you might set it to "false".
const shouldWrapPayload = import.meta.env.VITE_WRAP_PAYLOAD === 'true';

export function wrapPayload<T extends object>(modelName: string, payload: T): object {
  return shouldWrapPayload ? { [modelName]: payload } : payload;
}