export const isValidId = (id: string | undefined): id is string => {
  return typeof id === 'string' && id.trim() !== '';
};