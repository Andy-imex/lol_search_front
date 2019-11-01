<template>
  <b-modal :title="title" centered v-model="showModal">
    <!-- 타이틀 -->
    <b-row>
      <b-col>{{ contents }}</b-col>
    </b-row>

    <div slot="modal-footer">
      <!-- 예 버튼 -->
      <b-button
          :disabled="isLoading"
          @click="onYesClick"
          class="mr-2"
          variant="outline-primary">
        확인
        <b-spinner small v-show="isLoading"/>
      </b-button>

      <!-- 아니오 버튼 -->
      <b-button @click="onNoClick" variant="outline-warning">취소</b-button>
    </div>
  </b-modal>
</template>

<script>
  export default {
    name: "WarningModal",
    props: {
      title: {
        type: String
      },
      contents: {
        type: String
      },
      // '예' 버튼을 loading 상태로 변경 가능
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showModal: false
      }
    },
    methods: {
      openModal() {
        this.showModal = true;
      },
      onYesClick() {
        this.$emit('yes');
      },
      onNoClick() {
        this.closeModal();
      },
      closeModal() {
        this.showModal = false;
      }
    }
  }
</script>

<style>

</style>