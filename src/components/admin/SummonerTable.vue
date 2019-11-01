<template>
  <b-table :current-page="currentPage"
           :fields="fields"
           :filter="filter"
           :filterIncludedFields="filterOn"
           :items="items"
           :per-page="perPage"
           hover
           id="table"
  >
    <template v-slot:cell(nickName)="data">
      <input class="nickNameInput" type="text" v-if="data.item.isEdit" v-model="data.item.nickName"/>
      <div class="nickNameContainer" v-else>
        {{data.item.nickName === "null" ? null : data.item.nickName}}
      </div>
    </template>
    <template v-slot:cell(Etc)="data">
      <div v-if="data.item.isEdit">
        <b-button @click="checkButtonClick" variant="outline-primary">확인</b-button>
        <b-button @click="cancelButtonClick" variant="outline-warning">취소</b-button>
      </div>
      <div v-else>
        <b-button @click="deleteButtonClickHandler(data.item.accountId)" variant="danger">삭제</b-button>
        <b-button @click="editButtonClickHandler(data.item.accountId)" variant="info">수정</b-button>
      </div>
    </template>
  </b-table>
</template>

<script>

  export default {
    name: "SummonerTable",
    props: [
      'fields',
      'items',
      'filter',
      'filterOn',
      'currentPage',
      'perPage'
    ],
    methods: {
      deleteButtonClickHandler(accountId) {
        this.$emit("delete", accountId);
      },
      editButtonClickHandler(accountId) {
        this.$emit("edit", accountId);
      },
      cancelButtonClick() {
        this.$emit("cancel")
      },
      checkButtonClick() {
        this.$emit("check")
      }
    },

  }
</script>

<style>
  .nickNameInput {
    max-width: 120px;
  }

  .nickNameContainer {
    width: 140px;
  }
</style>