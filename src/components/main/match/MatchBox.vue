<template>
  <b-card :class="{ win : userData.win }" class="overflow-hidden matchbox" no-body>
    <b-row no-gutters>
      <b-col md="2">
        <b-card-body align="center">
          <b-card-text>
            <div class="mode_text">{{getGameMode}}</div>
            <div class="result_text">{{userData.win ? "승리" : "패배"}}</div>
            <div class="myChampion_icon">
              <b-img :src="getChampionImagePath(userData.championId)" height="50" width="50"></b-img>
            </div>
            <span>{{this.$store.state.championData[userData.championId].name}}</span>
            <div>{{getTimeStamp}}</div>
          </b-card-text>
        </b-card-body>
      </b-col>
      <b-col md="2">
        <div class="matchCol2">
          <div class="spell">
            <b-img :src="getSpellImagePath(userData.spell1Id)" height="30" width="30"></b-img>
            <b-img :src="getSpellImagePath(userData.spell2Id)" height="30" width="30"></b-img>
          </div>
          <div class="perk">
            <b-img :src="getperkImagePath(userData.perk)" height="30" width="30"></b-img>
            <b-img :src="getperkSubImagePath(userData.perkSub)" height="30" width="30"></b-img>
          </div>
        </div>
      </b-col>
      <b-col class="matchCol3" md="2">
        <div class="itemWrap">
          <b-img :id="`${getGameId}_${item}_${index}`" :key="`${getGameId}_${item}_${index}}`"
                 :src="getItemImagePath(item)" height="25" v-for="(item, index) in userData.items"
                 width="25"></b-img>

        </div>
        <div class="kda">
          <span class="kill">{{userData.kills}}</span> /
          <span class="death">{{userData.deaths}}</span> /
          <span class="assist">{{userData.assists}}</span>
        </div>

      </b-col>
      <b-col md="6">
        <b-card-body class="users_container">
          <b-card-text>
            <div class="users">
              <div :class="{ mySummoner : data.summonerName == getUserInfo.name }" :key="data.championID"
                   v-for="data in team1">
                <b-img :src="getChampionImagePath(data.championId)" heigt="20" width="20"></b-img>
                <span>{{data.summonerName}}</span>
              </div>
            </div>
            <div class="users">
              <div :class=" { mySummoner : data.summonerName == getUserInfo.name }" :key="data.championID"
                   v-for="data in team2">
                <b-img :src="getChampionImagePath(data.championId)" heigt="20" width="20"></b-img>
                <span>{{data.summonerName}}</span>
              </div>
            </div>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
  export default {
    name: "MatchBox",
    data() {
      return {
        team1: [],
        team2: [],
        userData: ''
      }
    },
    props: ['matchData'],
    computed: {
      getTimeStamp() {
        const elapsedTime = Math.floor((new Date().getTime() - this.matchData.gameCreation) / (1000 * 60 * 60));
        let resultTimeToKr;
        if (elapsedTime > 24) resultTimeToKr = Math.ceil(elapsedTime / 24) + "일 전";
        else resultTimeToKr = elapsedTime + "시간 전";
        return resultTimeToKr
      },
      getUserInfo() {
        return this.$store.state.userInfo
      },
      getGameId() {
        return this.matchData.gameId
      },
      getGameMode() {
        const queueIdData = {
          "420": "솔로랭크",
          "430": "일반",
          "440": "자유랭크",
          "450": "칼바람 나락",
          "840": "봇"
        };
        return queueIdData[this.matchData.queueId]
      }
    },
    created() {
      this.teamClassification();
      this.getUserMatchData()
    },
    methods: {
      getChampionImagePath(championid) {
        return `//opgg-static.akamaized.net/images/lol/champion/${this.$store.state.championData[championid].image.full}`
      },
      getSpellImagePath(spellid) {
        return `//opgg-static.akamaized.net/images/lol/spell/${this.$store.state.spellData[spellid].id}.png`
      },
      getperkImagePath(perkNum) {
        return `//opgg-static.akamaized.net/images/lol/perk/${perkNum}.png`
      },
      getperkSubImagePath(perkNum) {
        return `//opgg-static.akamaized.net/images/lol/perkStyle/${perkNum}.png`
      },
      getItemImagePath(itemNumber) {
        let image_path;
        if (itemNumber === 0) image_path = 'https://opgg-static.akamaized.net/images/pattern/opacity.1.png'
        else image_path = `//opgg-static.akamaized.net/images/lol/item/${itemNumber}.png`
        return image_path
      },
      teamClassification() {
        let team1 = [];
        let team2 = [];
        const participants = this.matchData.participants;


        for (let num in participants) {
          if (participants[num].teamId === 100) {
            participants[num].summonerName = this.matchData.participantIdentities[num].player.summonerName;
            team1.push(participants[num])
          } else {
            participants[num].summonerName = this.matchData.participantIdentities[num].player.summonerName;
            team2.push(participants[num])
          }
        }
        this.team1 = team1;
        this.team2 = team2;
      },
      getUserMatchData() {
        let currentUserNumber;
        for (let i = 0; i < this.matchData.participantIdentities.length; i++) {
          if (this.matchData.participantIdentities[i].player.accountId === this.$store.state.userInfo.accountId) {
            currentUserNumber = i;
            break;
          }
        }
        const userMatchData = this.matchData.participants[currentUserNumber];
        const userStats = userMatchData.stats;
        const userData = {
          "summonerName": userMatchData.summonerName,
          "championId": userMatchData.championId,
          "spell1Id": userMatchData.spell1Id,
          "spell2Id": userMatchData.spell2Id,
          "kills": userStats.kills,
          "deaths": userStats.deaths,
          "assists": userStats.assists,
          "win": userStats.win,
          "perk": userStats.perk0,
          "perkSub": userStats.perkSubStyle,
          "items": [
            userStats.item0,
            userStats.item1,
            userStats.item2,
            userStats.item3,
            userStats.item4,
            userStats.item5,
            userStats.item6
          ]
        };

        this.userData = userData;

      }
    }
  }
</script>

<style scoped>
  .users {
    width: 50%;
    display: inline-block
  }

  .mode_text {
    font-weight: bold;
  }

  .matchbox .result_text {
    font-weight: bold;
    color: #c6443e

  }

  .win .result_text {
    color: #1a78ae;
  }

  .users div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 150px;
  }

  .matchbox.win {
    background: #a3cfec
  }

  .matchbox {
    background: #e2b6b3;
    margin-bottom: 12px;
  }

  .itemWrap {
    width: 75px;
    position: relative;
  }

  .itemWrap img:last-child {
    position: absolute;
    top: 4px;
    margin-left: 5px;
  }

  .myChampion_icon {
    width: 100%
  }

  .myChampion_icon img,
  .mySummoner img {
    border-radius: 50%;
    overflow: hidden;
  }

  .mySummoner span {
    font-weight: bold;
  }

  .spell,
  .perk {
    width: 30px;
    display: inline-block;
  }

  .kda span {
    font-weight: bold;
  }

  .kda .kill,
  .kda .assist {
    color: #555e5e;
  }

  .death {
    color: #c6443e;
  }

  .users_container {
    margin-top: 15px;
  }

  .matchCol2,
  .matchCol3 {
    margin-top: 65px;
  }

  .matchCol2 {
    margin-left: 14px;
  }
</style>