export default function ({ redirect, route, store }) {
  if (Object.keys(route.meta[0]).length === 0) {
    return;
  }

  const auth = store.state.auth.authenticated;

  if (route.meta.find((record) => record.auth === true) && !auth) {
    return redirect({
      path: '/sign-in',
      query: { returnUrl: route.fullPath },
    });
  }

  if (route.meta.find((record) => record.public === true) && auth) {
    return redirect({ path: '/' });
  }
}
