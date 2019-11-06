<template>
  <div>
    <b-button @click="buttonClickHandler" v-if="isComplete" variant="primary">
      갱신
    </b-button>

    <b-button v-else variant="list">
      <b-spinner label="Spinning" variant="success"></b-spinner>
    </b-button>
  </div>
</template>

<script>
  import RiotApi from '../../api/RiotApi'

  export default {
    name: "RenewalBtn",
    props: ['summonerName'],
    data() {
      return {
        isComplete: true
      }
    },
    methods: {
      buttonClickHandler() {
        this.isComplete = false;
        this.getRenewalUserRecord()
      },
      getRenewalUserRecord() {
        const store = this.$store;
        RiotApi().getRenewalDataUserRecordByEncryptedSummonerId(store.state.userInfo.id)
            .then(res => {
              this.getRenewalUserInfo();
              store.dispatch("userRecordSetAction", res.data)
            })
            .catch(() => {
              alert("에러")
            })
      },
      getRenewalUserInfo() {
        RiotApi().getRenewalDataUserInfoBySummonerName(this.summonerName)
            .then(res => {
              const store = this.$store;
              store.dispatch("userInfoSetAction", res.data)
              this.isComplete = true;
            })
            .catch(() => {
              alert("삐 에러")
            })
      }
    }
  }
</script>

