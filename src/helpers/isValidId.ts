export const isValidId = (id: number | undefined): boolean => {
  return typeof id === 'number' && !isNaN(id);
};
