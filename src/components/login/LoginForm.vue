<template>
  <b-form>
    <b-form-group
        description="아이디를 입력해주세요."
        id="input-group-1"
        label="ID :"
        label-for="input-1"
    >
      <b-form-input
          id="input-1"
          placeholder="Enter email"
          required
          type="text"
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Password :" label-for="input-2">
      <b-form-input
          id="input-2"
          placeholder="Enter Password"
          type="password"
      ></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script>
  export default {
    name: "LoginForm"
  }
</script>

<style scoped>

</style>