<template>
  <b-button @click="moreBtnClickHanlder"
            class="moreBtn">
    더 보기
  </b-button>
</template>

<script>
  import RiotApi from '../../api/RiotApi'

  export default {
    computed: {},
    methods: {
      moreBtnClickHanlder() {
        const store = this.$store.state;
        RiotApi().getMatchListDataByAccountIdAndBeginIndexAndEndIndex(store.userInfo.accountId, (store.matchDataIndex + store.morePlusNum), store.matchDataIndex)
            .then(res => {
              for (let num in res.data.matches) this.getMatchData(res.data.matches[num].gameId)
              this.$store.dispatch("userMatchDataIndexAction", store.matchDataIndex + store.morePlusNum)
              this.$store.dispatch("isLoadingChangeAction", true)
            })
            .catch(e => {
              alert(e + "에러가 발생하였습니다.")
            })
      },

      getMatchData(matchId) {
        RiotApi().getMatchDataByMatchId(matchId)
            .then(res => {
              const store = this.$store;
              store.dispatch("searchStart", true)
              store.dispatch("userMatchListPush", res.data)
              store.dispatch("isLoadingChangeAction", false)
            })
            .catch(e => {
              alert(e + "에러가 발생하였습니다.")
            })
      },
    }
  }
</script>

<style>
  .moreBtn {
    width: 100%;
  }
</style>