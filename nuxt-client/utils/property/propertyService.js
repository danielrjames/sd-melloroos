const propertyService = {
  getLookupModel(data, clientId) {
    return {
      address: data,
      clientId,
    };
  },
};

export default propertyService;
