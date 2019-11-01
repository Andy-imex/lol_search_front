<template>
  <div class="adminPage">
    <b-jumbotron bg-variant="success" text-variant="white">
      <template v-slot:header>
        Admin
      </template>
    </b-jumbotron>
    <admin-search-bar
        @fillterInput="setFilter"
        v-model="filter"
    />

    <summoner-table
        :currentPage="currentPage"
        :fields="fields"
        :filter="filter"
        :filterOn="filterOn"
        :items="items"
        :perPage="perPage"
        @cancel="editOnOff"
        @check="summonerDataNickNameUpdate"
        @delete="deleteHandler"
        @edit="editHandler"
    >
    </summoner-table>

    <b-pagination
        :per-page="perPage"
        :total-rows="rows"
        aria-controls="table"
        v-model="currentPage">
    </b-pagination>

    <warning-modal
        @yes="summonerDataDelete"
        contents="정말 삭제하시겠습니까?"
        ref="warningModal"
        title="경고">
    </warning-modal>
    <LoadingOverlay
        ref="loadingOverlay"
    />
  </div>
</template>

<script>
  import BackendApi from '../api/BackendApi'
  import WarningModal from "../common/WarningModal";
  import SummonerTable from "./SummonerTable";
  import AdminSearchBar from "./AdminSearchBar";
  import LoadingOverlay from "../common/LoadingOverlay";

  export default {
    name: "AdminPage",
    components: {SummonerTable, WarningModal, AdminSearchBar, LoadingOverlay},
    created() {
      BackendApi().getAllSummonerData()
          .then(res => {
            res.data.map(summoner => {
              summoner.renewalTime = new Date(summoner.renewalTime).toLocaleString();
              summoner.isEdit = false;
              this.$refs.loadingOverlay.close();
              return summoner
            });
            res.data.sort((a, b) => {
              return a.renewalTime > b.renewalTime ? -1 : a.renewalTime < b.renewalTime ? 1 : 0
            });
            this.items = res.data
          })
    },
    data() {
      return {
        fields: ["name", "renewalTime", "summonerLevel", "nickName", "Etc"],
        items: [],
        filter: null,
        filterOn: [],
        perPage: 10,
        currentPage: 1,
        selectedSummonerAccountId: null
      }
    },
    methods: {
      summonerDataDelete() {
        BackendApi().deleteSummonerDataByAccountId(this.selectdSummonerAccountId)
            .then(() => {
              this.items = this.items.filter(item => item.accountId !== this.selectdSummonerAccountId);
              this.$refs.warningModal.closeModal()
            })
            .catch(err => {
              alert(err.response.data.error_msg)
            })
      },
      setFilter(value) {
        this.filter = value
      },
      deleteHandler(accountId) {
        this.selectedSummonerAccountId = accountId;
        this.$refs.warningModal.openModal()
      },
      editHandler(accountId) {
        this.selectdSummonerAccountId = accountId;
        this.items.map(item => item.isEdit = false);
        this.editOnOff()
      },
      editOnOff() {
        const selectIndex = this.items.findIndex(item => item.accountId === this.selectdSummonerAccountId);
        this.items[selectIndex].isEdit = !this.items[selectIndex].isEdit;
      },
      summonerDataNickNameUpdate() {
        const selectIndex = this.items.findIndex(item => item.accountId === this.selectdSummonerAccountId);
        if (this.items[selectIndex].nickName.trim() === '') this.items[selectIndex].nickName = null
        BackendApi().updateSummonerDataNickNameByAccount(this.selectdSummonerAccountId, this.items[selectIndex].nickName)
            .then(() => {
              this.items[selectIndex].isEdit = !this.items[selectIndex].isEdit;
            })
            .catch(err => {
              alert(err.response.data.error_msg)
            })
      }
    },
    computed: {
      rows() {
        return this.items.length
      }
    }
  }
</script>

<style scoped>
  .adminPage {
    max-width: 1000px;
    margin: 10px auto;
  }
</style>