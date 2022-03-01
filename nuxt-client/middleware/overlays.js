export default async function ({ store }) {
  if (store.state.app.mobileNav) {
    if (store.state.app.loading) {
      const watcher = setInterval(() => {
        if (!store.state.app.loading) {
          clearInterval(watcher);
          store.dispatch('app/closeMobileNav');
        }
      }, 100);
    } else {
      await store.dispatch('app/closeMobileNav');
    }
  }

  if (store.state.app.modal.open) {
    await store.dispatch('app/closeModal');
  }

  if (store.state.app.navDropdown === true) {
    await store.dispatch('app/closeNavDropdown');
  }
}
