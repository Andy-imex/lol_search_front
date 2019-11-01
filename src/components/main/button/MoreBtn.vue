<template>
  <div>
    <b-button @click="moreBtnClickHandler"
              class="btn"
              v-if="isComplete"
    >
      더 보기
    </b-button>

    <b-button class="btn"
              v-else
              variant="light"
    >
      <b-spinner label="Spinning" variant="success"></b-spinner>
    </b-button>
  </div>
</template>

<script>
  import RiotApi from '../../api/RiotApi'

  export default {
    data() {
      return {
        isComplete: true
      }
    },
    methods: {
      moreBtnClickHandler() {
        const store = this.$store.state;
        this.isComplete = false;
        RiotApi().getMatchListDataByAccountIdAndBeginIndexAndEndIndex(store.userInfo.accountId, (store.matchDataIndex + store.morePlusNum), store.matchDataIndex)
            .then(res => {
              for (let num in res.data.matches) this.getMatchData(res.data.matches[num].gameId)
              this.$store.dispatch("userMatchDataIndexAction", store.matchDataIndex + store.morePlusNum)
            })
            .catch(e => {
              alert(e + "에러가 발생하였습니다.")
            })
      },

      getMatchData(matchId) {
        RiotApi().getMatchDataByMatchId(matchId)
            .then(res => {
              const store = this.$store;
              store.dispatch("userMatchListPush", res.data);
              this.isComplete = true;
            })
            .catch(e => {
              alert(e + "에러가 발생하였습니다.")
            })
      },
    }
  }
</script>

<style scoped>
  .btn {
    width: 100%;
  }
</style>