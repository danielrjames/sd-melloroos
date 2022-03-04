const sanitizeAddress = (address) => {
  let temp = address.toLowerCase().trim();

  if (temp.split(' ').includes('street')) {
    temp = temp.replace('street', 'st');
  }

  if (temp.split(' ').includes('avenue')) {
    temp = temp.replace('avenue', 'av');
  }

  if (temp.split(' ').includes('ave')) {
    temp = temp.replace('ave', 'av');
  }

  if (temp.split(' ').includes('terrace')) {
    temp = temp.replace('terrace', 'ter');
  }

  if (temp.split(' ').includes('#')) {
    temp = temp.replace('#', '');
  }

  return temp;
};

const formatTaxData = (taxArray) => {
  const obj = {};

  const propArray = [
    'Base Tax:',
    'Fixed Charges:',
    'Improvement Values:',
    'Rate:',
    'Total Tax:',
    'Land Values:',
    'Net Value:',
  ];

  for (let i = 0; i < taxArray.length; i++) {
    if (propArray.includes(taxArray[i])) {
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
  if (taxArray.length > 0) {
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
          lineItem: taxArray[i],
          // phone:
          //   taxArray[i + 3] +
          //   ' ' +
          //   taxArray[i + 4] +
          //   (taxArray[i + 5] !== '' ? ' ext: ' + taxArray[i + 5] : ''),
        };

        obj.funds.push(tax);
      }
    }

    return obj;
  }

  return null;
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
      lookupDate: Date.now(),
      melloRoos: formatMelloRoos(data.specialAssessment),
      owner: data.owner,
      parcel: data.parcel,
      taxes: formatTaxData(data.taxes),
    };

    return model;
  },
};

export default propertyService;
