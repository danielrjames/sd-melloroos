<template>
  <client-only>
    <div class="center-contents">
      <div class="auth-frame">
        <div class="auth-frame-heading">Sign In</div>
        <app-login-form :slim="false"></app-login-form>
      </div>
    </div>
  </client-only>
</template>

<script>
import LoginForm from '../../components/auth/login/LoginForm.vue';

export default {
  meta: {
    public: true,
  },

  head() {
    return {
      title: 'Sign In',
    };
  },

  components: {
    appLoginForm: LoginForm,
  },
};
</script>
