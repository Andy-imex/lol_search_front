<template>
  <b-button @click="buttonClickhHandler" variant="primary">
    갱신
  </b-button>
</template>

<script>
  import RiotApi from '../../api/RiotApi'

  export default {
    name: "RenewalBtn",
    props: ['summonerName'],
    methods: {
      buttonClickhHandler() {
        this.getRenewalUserRecord()
      },
      getRenewalUserRecord() {
        const store = this.$store;
        RiotApi().getRenewalDataUserRecordByEncryptedSummonerId(store.state.userInfo.id)
            .then(res => {
              this.getRenewalUserInfo()
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
            })
            .catch(() => {
              alert("삐 에러")
            })
      }

    }
  }
</script>

