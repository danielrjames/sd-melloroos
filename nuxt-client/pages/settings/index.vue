<script>
export default {
  meta: {
    auth: true,
  },

  asyncData({ redirect }) {
    return redirect({ name: 'settings-account' });
  },
};
</script>
