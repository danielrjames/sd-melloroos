export default async (context) => {
  await context.store.dispatch('property/getHistory');
};