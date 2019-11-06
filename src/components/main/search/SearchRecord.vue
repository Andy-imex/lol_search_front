<template>
  <b-card class="overflow-hidden" no-body style="max-width: 540px;">
    <b-row no-gutters>
      <b-col md="5">
        <b-card-img :src="getTierImagePath" class="rounded-0" width=""></b-card-img>
      </b-col>
      <b-col md="7">
        <b-card-body :title="getGameType" v-if="getIsUnranked">
          <b-card-text class="userRecordText">
            <div class="tierName_Unranked">
              <span>Unranked</span>
            </div>
          </b-card-text>
        </b-card-body>
        <b-card-body :title="getGameType" v-else>
          <b-card-text class="userRecordText">
            <div class="tierName">
              <span>{{userData.tier + ' ' + userData.rank}}</span>
            </div>
            <div><span>리그 포인트:{{userData.leaguePoints}}점</span></div>
            <div><span>{{userData.wins+userData.losses}} 전 {{userData.wins}}승 {{userData.losses}}패</span>
            </div>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
  export default {
    name: "SearchRecord",
    props: ['userData'],
    data() {
      return {
        isUnrank: ''
      }
    },
    computed: {
      /**
       * tierName 으로 이미지 path 반환하는 부분
       */
      getTierImagePath() {
        const rankNameText = {
          "I": "1",
          "II": "2",
          "III": "3",
          "IV": "4"
        };
        let imagePath;
        if (this.userData.tier === "Unranked") imagePath = `//opgg-static.akamaized.net/images/medals/default.png`;
        else imagePath = `//opgg-static.akamaized.net/images/medals/${this.userData.tier.toLowerCase()}_${rankNameText[this.userData.rank]}.png`;
        return imagePath
      },
      /**
       * gameType 영어로된 부분을 한글로 반환하는 부분
       */
      getGameType() {
        const gameTypeText = {
          "RANKED_TFT": "롤토체스",
          "RANKED_SOLO_5x5": "솔로랭크",
          "RANKED_FLEX_SR": "자유랭크"
        };

        return gameTypeText[this.userData.queueType]
      },
      /**
       * 해당 모드의 게임을 했는지 안했는지 체크
       * @returns {boolean}
       */
      getIsUnranked() {
        return this.userData.tier === "Unranked"
      }
    }
  }
</script>

<style>
  .tierName span {
    color: rgb(34, 136, 34);
    font-weight: bold;
  }

  .tierName_Unranked span {
    color: #879292;
    font-weight: bold;
  }

  .userRecordText div {
    width: 100%;
  }
</style>