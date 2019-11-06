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
    }),
    computed: {},
    methods: {
      /**
       * 검색을 했을때 실행하는곳
       */
      searchSubmitHandler(e) {
        e.preventDefault();
        this.$emit("complete", false);
        this.$store.dispatch("userMatchListInit");
        this.$store.dispatch("userMatchDataIndexAction", 0);
        this.getUserInfo();
      },
      /**
       * 유저 정보 받아오는부분
       */
      getUserInfo() {
        RiotApi().getUserInfoBySummonerName(this.searchValue)
            .then(res => {
              const store = this.$store;
              store.dispatch("userInfoSetAction", res.data);
              this.getUserRecord(res.data.id);   //유저의 정보를 받아와서 유저 아이디를 이용해 기록을 검색
              this.getMatchListData(res.data.accountId, this.$store.state.matchDataIndex) //유저의 정보를 받아와서 유저의 accountId 와 matchDataIndex 를 이용해 matchList 검
            })
            .catch((e) => {
              this.errorHandler(e)
            })
      },
      /**
       * 유저의 기록을 받아오는부분
       * @param summonerId 라이엇에서 만든 암호화된 SummonerID
       */
      getUserRecord(summonerId) {
        RiotApi().getUserRecordByAccountId(summonerId)
            .then(res => {
              const store = this.$store;
              store.dispatch("userRecordSetAction", res.data);
            })
            .catch((e) => {
              this.errorHandler(e)
            })
      },
      /**
       * match Id를 이용해 해당 게임 기록을 받아오는부
       * @param matchId 매치 아이
       */
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
      /**
       * accountId 와 index를 이용해 매치리스트를 받아오는부
       * @param accountId 암호화된 계정 id
       * @param beginIndex 시작할 index
       */
      getMatchListData(accountId, beginIndex) {
        const morePlusNum = this.$store.state.morePlusNum;
        RiotApi().getMatchListDataByAccountIdAndBeginIndexAndEndIndex(accountId, (beginIndex + morePlusNum), beginIndex)
            .then(res => {
              for (let num in res.data.matches) this.getMatchData(res.data.matches[num].gameId);
              this.$store.dispatch("userMatchDataIndexAction", beginIndex + morePlusNum);
              this.$emit("complete", true);
            })
            .catch((e) => {
              this.errorHandler(e)
            })
      },
      errorHandler(e) {
        this.$emit("complete", true);
        alert("검색하신 소환사가 없습니다.");
      }

    }
  }
</script>

<style scoped>
</style>