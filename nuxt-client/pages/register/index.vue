<template>
  <client-only>
    <div class="center-contents">
      <div class="w-96 max-w-sm auth-frame">
        <div class="auth-frame-heading">Register</div>
        <app-register-form></app-register-form>
      </div>
    </div>
  </client-only>
</template>

<script>
import RegisterForm from '../../components/auth/register/RegisterForm.vue';

export default {
  meta: {
    public: true,
  },

  head() {
    return {
      title: 'Register',
    };
  },

  components: {
    appRegisterForm: RegisterForm,
  },
};
</script>
