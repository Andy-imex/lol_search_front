<template>
  <b-form @submit="searchSubmitHandler">
    <b-input-group class="mb-3">
      <b-form-input v-model="searchValue"></b-form-input>
      <b-input-group-append>
        <b-button @click="searchSubmitHandler" type="submit" variant="success">검색하기</b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form>
</template>

<script>
  import RiotApi from '../../api/RiotApi'

  export default {
    name: "SearchInput",
    data: () => ({
      searchValue: '',
      LoadValue: '',
    }),
    computed: {},
    methods: {
      /**
       * 검색을 했을때 실행하는곳
       */
      searchSubmitHandler(e) {
        e.preventDefault();
        //if (this.searchValue == this.LoadValue) return
        this.LoadValue = this.searchValue;
        this.$store.dispatch("searchStart", false);
        this.$store.dispatch("userMatchListInit");
        this.$store.dispatch("userMatchDataIndexAction", 0);
        this.getUserInfo();
      },
      getUserInfo() {
        RiotApi().getUserInfoBySummonerName(this.searchValue)
            .then(res => {
              const store = this.$store;
              if (typeof res.data.status != "undefined" && res.data.status.status_code === 404) return this.notSearchHandler()
              store.dispatch("userInfoSetAction", res.data);
              this.getUserRecord(res.data.id);
              this.getMatchListData(res.data.accountId, this.$store.state.matchDataIndex)
            })
            .catch((e) => {
              this.errorHandler(e)
            })
      },
      getUserRecord(accountId) {
        RiotApi().getUserRecordByAccountId(accountId)
            .then(res => {
              const store = this.$store;
              store.dispatch("userRecordSetAction", res.data);
              store.dispatch("searchStart", true)
            })
            .catch((e) => {
              this.errorHandler(e)
            })
      },
      getMatchListData(accountId, beginIndex) {
        const morePlusNum = this.$store.state.morePlusNum;
        RiotApi().getMatchListDataByAccountIdAndBeginIndexAndEndIndex(accountId, (beginIndex + morePlusNum), beginIndex)
            .then(res => {
              for (var num in res.data.matches) this.getMatchData(res.data.matches[num].gameId);
              this.$store.dispatch("userMatchDataIndexAction", beginIndex + morePlusNum)
            })
            .catch((e) => {
              this.errorHandler(e)
            })
      },
      getMatchData(matchId) {
        RiotApi().getMatchDataByMatchId(matchId)
            .then(res => {
              if (typeof res.data === "undefined") return;
              const store = this.$store;
              store.dispatch("userMatchListPush", res.data)
            })
            .catch((e) => {
              this.errorHandler(e)
            })
      },
      notSearchHandler() {
        this.$store.dispatch("searchStart", false);
        alert("찾지 못하였습니다.");
      },
      errorHandler(e) {
        alert(e.response.data.error_msg)
      }

    }
  }
</script>

<style scoped>
</style>