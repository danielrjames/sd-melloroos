const getters = {
  searchResult: (state) =>
    state.current.length > 0 &&
    state.list.length > 0 &&
    state.list.find((prop) => prop.searchTerms.includes(state.current)),
};

export default getters;
