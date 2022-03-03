const sanitizeAddress = (address) => {
  const temp = address.toLowerCase().trim();

  if (temp.split(' ').includes('street')) {
    temp.replace('street', 'st');
  }

  if (temp.split(' ').includes('avenue')) {
    temp.replace('avenue', 'av');
  }

  if (temp.split(' ').includes('ave')) {
    temp.replace('ave', 'av');
  }

  if (temp.split(' ').includes('terrace')) {
    temp.replace('terrace', 'ter');
  }

  if (temp.split(' ').includes('#')) {
    temp.replace('#', '');
  }

  return temp;
};

const formatTaxData = (taxArray) => {
  const obj = {};

  for (let i = 0; i < taxArray.length; i++) {
    if (taxArray[i].includes(':')) {
      const key = taxArray[i]
        .replace(':', '')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

      const value = parseFloat(taxArray[i + 1].replace(',', ''));

      obj[key] = value;
    }
  }

  return obj;
};

const formatMelloRoos = (taxArray) => {
  const obj = {
    funds: [],
    total: parseFloat(taxArray[taxArray.length - 1].replace(',', '')),
  };

  for (let i = 6; i < taxArray.length - 4; i++) {
    if (i % 7 === 0) {
      const tax = {
        amount: parseFloat(taxArray[i + 6].replace(',', '')),
        description: taxArray[i + 2],
        fund: taxArray[i + 1],
        item: taxArray[i],
        phone:
          taxArray[i + 3] +
          ' ' +
          taxArray[i + 4] +
          (taxArray[i + 5] !== '' ? ' ext: ' + taxArray[i + 5] : ''),
      };

      obj.funds.push(tax);
    }
  }

  return obj;
};

const propertyService = {
  getLookupModel(data, clientId) {
    return {
      address: sanitizeAddress(data.address),
      clientId,
    };
  },

  transformTaxResponse(data) {
    const model = {
      address: data.address,
      date: Date.now(),
      melloRoos: formatMelloRoos(data.specialAssessment),
      owner: data.owner,
      parcel: data.parcel,
      taxes: formatTaxData(data.taxes),
    };

    return model;
  },
};

export default propertyService;
