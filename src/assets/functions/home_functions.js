// function return filtered array of search input
export const searchResult = (array, input) =>
  array?.filter((product) => {
    return product?.name?.toLowerCase()?.includes(input.toLowerCase());
  });
