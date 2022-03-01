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
