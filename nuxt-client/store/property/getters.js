const getters = {
  searchResult: (state) =>
    state.list.length > 0 &&
    state.list.find((prop) => prop.address.toLowerCase() === state.current),
};

export default getters;
