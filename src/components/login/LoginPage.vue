<template>
  <div class="loginPage">
    <b-jumbotron bg-variant="success" text-variant="white">
      <template v-slot:header>
        로그인
      </template>
    </b-jumbotron>

    <login-form
    ></login-form>
  </div>
</template>

<script>
  import LoginForm from "./LoginForm";

  export default {
    name: "LoginPage",
    components: {LoginForm}
  }
</script>

<style scoped>
  .loginPage {
    max-width: 1000px;
    margin: 10px auto;
  }
</style>