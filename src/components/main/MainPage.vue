<template>
  <div>
    <b-navbar type="light" variant="faded">
      <b-navbar-brand class="mb-0" tag="h1">롤 전적검색</b-navbar-brand>
    </b-navbar>
    <b-container>
      <b-row align-h="center">
        <b-col md="8">
          <search-input/>
        </b-col>
      </b-row>
      <div v-if="this.$store.state.isSearch">
        <b-row class="userInfoContainer">
          <search-user-info :userInfo="this.$store.state.userInfo"/>
        </b-row>
        <b-row align-h="center" class="userRecordContainer">
          <b-col>
            <div :key="data.id" class="recordCard" v-for="data in userRecord">
              <search-record :userData="data"/>
            </div>
          </b-col>
          <b-col cols="8">
            <b-spinner label="Spinning" v-if="!getIsLoading" variant="primary">
            </b-spinner>
            <div v-else>
              <match-box :key="match.gameId" :matchData="match"
                         v-for="match in this.$store.state.userMatchList"/>

              <more-btn/>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <loading-overlay
        v-if="isLoading"
    />
  </div>
</template>


<script>
  import SearchInput from "./search/SearchInput";
  import SearchUserInfo from "./search/SearchUserInfo";
  import SearchRecord from "./search/SearchRecord";
  import MatchBox from "./match/MatchBox";
  import MoreBtn from "./button/MoreBtn";
  import LoadingOverlay from "../common/LoadingOverlay";
  import RiotDataApi from "../api/RiotDataApi";

  export default {
    name: "MainPage",
    data: () => ({
      userRecord: '',
      userInfo: '',
      matchList: '',
      isLoading: false
    }),
    components: {
      SearchInput,
      SearchRecord,
      SearchUserInfo,
      MatchBox,
      MoreBtn,
      LoadingOverlay
    },
    computed: {
      queueTypeSort() {
        const queueTypeArray = ["RANKED_SOLO_5x5", "RANKED_FLEX_SR", "RANKED_TFT"];
        const storeInUserRecord = this.$store.state.userRecord;
        let resultArray = [];

        for (let num in queueTypeArray) {
          const findIndex = storeInUserRecord.findIndex(i => i.queueType === queueTypeArray[num]);
          if (typeof storeInUserRecord[findIndex] == "undefined") resultArray.push({
            "queueType": queueTypeArray[num],
            "tier": "Unranked"
          });
          else resultArray.push(storeInUserRecord[findIndex])
        }
        return resultArray
      }

    },
    methods: {
      getChampionData() {
        RiotDataApi().getChampionData()
            .then(res => {
              const getJsonChampionData = res.data.data;
              const championJson = {};
              for (let i = 0; i < Object.keys(res.data.data).length; i++) championJson['' + getJsonChampionData[Object.keys(res.data.data)[i]].key] = getJsonChampionData[Object.keys(res.data.data)[i]];
              this.$store.dispatch("championDataSetAction", championJson)
            })
            .catch(e => {
              alert(e + "에러가 발생하였습니다.")
            })
      },
      getSpellData() {
        RiotDataApi().getSpellData()
            .then(res => {
              const getJsonSpellData = res.data.data;
              const spellJson = {};
              for (let i = 0; i < Object.keys(res.data.data).length; i++) spellJson['' + getJsonSpellData[Object.keys(res.data.data)[i]].key] = getJsonSpellData[Object.keys(res.data.data)[i]];
              this.$store.dispatch("spellDataSetAction", spellJson)
            })
            .catch(e => {
              alert(e + "에러가 발생하였습니다.")
            })
      },
      getIsLoading() {
        return this.$store.state.isLoading
      }
    },
    mounted() {
      this.getChampionData();
      this.getSpellData()
    },
    updated() {
      this.userInfo = this.$store.state.userInfo;
      this.userRecord = this.queueTypeSort;
      this.matchList = this.$store.state.userMatchList
    },
    watch:{
        loadingCheck: ()=>{

        }
    }
  }
</script>

<style scoped>
  .userInfoContainer {
    margin-bottom: 15px;
    border: 1px solid #ddd;
    padding: 15px;
  }

  .recordCard {
    margin-bottom: 15px;
  }

  .userRecordContainer .col {
    padding-left: 0;
  }
</style>
