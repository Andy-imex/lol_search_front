<template>
  <div>
    <b-navbar type="light" variant="faded">
      <b-navbar-brand class="mb-0" tag="h1">롤 전적검색</b-navbar-brand>
    </b-navbar>
    <b-container>
      <b-row align-h="center">
        <b-col md="8">
          <search-input
              @complete="isCompleteChange"
          />
        </b-col>
      </b-row>
      <div v-if="isComplete">
        <b-row class="userInfoContainer">
          <search-user-info
              :userInfo="this.$store.state.userInfo"
          />
        </b-row>
        <b-row align-h="center" class="userRecordContainer">
          <b-col>
            <div :key="data.id" class="recordCard" v-for="data in userRecords">
              <search-record :userData="data"/>
            </div>
          </b-col>
          <b-col cols="8">
            <div>
              <match-box :key="match.gameId"
                         :matchData="match"
                         v-for="match in this.$store.state.userMatchList"
              />
              <more-btn
                  v-if="this.$store.state.userMatchList.length > 4"
              />
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <loading-overlay
        :on="false"
        ref="loadingOverlay"
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
      userRecords: '',
      userInfo: '',
      matchList: '',
      isComplete: false
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
      /**
       *  queueType이 존재하면 한글로반환하고 존재안하면 Unranked(게임 안한사람) 를 반환하는부분
       * * @returns {[]}
       */
      queueTypeSort() {
        const queueTypeArray = ["RANKED_SOLO_5x5", "RANKED_FLEX_SR", "RANKED_TFT"];
        const storeInUserRecord = this.$store.state.userRecords;
        let resultArray = [];

        for (let i in queueTypeArray) {
          const findIndex = storeInUserRecord.findIndex(record => record.queueType === queueTypeArray[i]);
          if (typeof storeInUserRecord[findIndex] == "undefined") resultArray.push({
            "queueType": queueTypeArray[i],
            "tier": "Unranked"
          });
          else resultArray.push(storeInUserRecord[findIndex])
        }
        return resultArray
      }
    },
    methods: {
      /**
       * 공식api 에서 챔피언데이터를 받아와서 store 에 저장하는부분
       */
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
      /**
       * 공식api 에서 서머너 스펠 데이터를 받아와서 store 에 저장하는부분
       */
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
      isCompleteChange(bool) {
        this.isComplete = bool;
        this.loadingOverlayOnOff(!bool)
      },
      loadingOverlayOnOff(isOn) {
        if (isOn) this.$refs.loadingOverlay.open();
        else this.$refs.loadingOverlay.close()
      }
    },
    mounted() {
      this.getChampionData();
      this.getSpellData()
    },
    updated() {
      this.userInfo = this.$store.state.userInfo;
      this.userRecords = this.queueTypeSort;
      this.matchList = this.$store.state.userMatchList;
    }

  }
</script>

<style scoped>
  .userInfoContainer {
    margin-bottom: 15px;
    padding: 15px;
  }

  .recordCard {
    margin-bottom: 15px;
  }

</style>
