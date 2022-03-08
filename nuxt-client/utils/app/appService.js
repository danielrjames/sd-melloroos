export const getModalConfig = () => {
  const config = {
    body: {
      html: false,
      text: 'This is some sample modal text.',
    },
    buttons: [
      {
        actionModel: null,
        class: 'btn-primary',
        storeAction: '',
        text: 'Confirm',
      },
      {
        actionModel: null,
        class: 'btn-white',
        storeAction: 'app/closeModal',
        text: 'Cancel',
      },
    ],
    component: null,
    header: {
      center: false,
      close: true,
      title: 'This is the title',
    },
    open: true,
    width: 'max-w-sm',
  };

  return config;
};

/* eslint-disable vue/sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
export const pageHeadConfig = (data) => {
  const config = {
    title: data.title,
    meta: [
      {
        hid: 'title',
        property: 'title',
        content: data.title,
      },
      {
        hid: 'description',
        name: 'description',
        content: data.description,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: data.ogTitle,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: data.description,
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: data.url,
      },
      {
        hid: 'og:locale',
        property: 'og:locale',
        content: 'en_US',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'San Diego Mello-Roos Tax Lookup',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: data.imgPath,
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: data.imgPath,
      },
      {
        hid: 'og:image:type',
        property: 'og:image:type',
        content: 'image/jpeg',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'San Diego Mello-Roos Open Graph Image',
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: '1200',
      },
      {
        hid: 'og:image:height',
        property: 'og:image:height',
        content: '630',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: data.imgPath,
      },
    ],
  };

  if (data.titleTemplate) {
    config.titleTemplate = `%s | ${data.titleTemplate}`;
  }

  return config;
};
