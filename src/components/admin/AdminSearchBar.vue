<template>
  <b-form-group
      class="mb-0"
      label="검색"
      label-align-sm="right"
      label-cols-sm="3"
      label-for="filterInput"
      label-size="sm"
  >
    <b-input-group size="sm">
      <b-form-input
          @input="updateValue($event)"
          id="filterInput"
          placeholder="검색어를 입력하세요"
          type="search"
      ></b-form-input>
    </b-input-group>
  </b-form-group>
</template>

<script>
  export default {
    name: "AdminSearchBar",
    methods: {
      updateValue(value) {
        this.$emit("fillterInput", value)
      }
    }
  }
</script>

<style scoped>

</style>