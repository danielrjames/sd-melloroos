<template>
  <client-only>
    <div class="center-contents">
      <div class="auth-frame">
        <div class="auth-frame-heading">Password Reset</div>
        <app-password-reset-form :slim="false"></app-password-reset-form>
      </div>
    </div>
  </client-only>
</template>

<script>
import PasswordResetForm from '../../components/auth/password-reset/PasswordResetForm.vue';

export default {
  meta: {
    public: true,
  },

  head() {
    return {
      title: 'Password Reset',
    };
  },

  components: {
    appPasswordResetForm: PasswordResetForm,
  },
};
</script>
