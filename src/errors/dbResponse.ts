export const dbResponse = {
  errorGetAll: (items: string) => {
    throw new Error(`Error fetching all ${items}`);
  },

  errorCreate: (item: string) => {
    throw new Error(`Error adding a new ${item}`);
  },

  errorFindByPK: (item: string, itemId: number) => {
    throw new Error(`${item} with ID ${itemId} not found`);
  },

  errorDelete: (item: string, itemId: number) => {
    throw new Error(`Error deleting ${item} with ID ${itemId}`);
  },
};
