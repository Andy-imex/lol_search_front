<template>
  <b-media>
    <template v-slot:aside>
      <b-img :src="getIconImagePath" alt="아이콘이미지ㅣ" height="100" width="100"></b-img>
    </template>
    <div>
      <h5>
        {{userInfo.name}}
      </h5>
      <span>{{getNickName}}</span>
    </div>

    <p>
      레벨 : {{userInfo.summonerLevel}}
    </p>
    <renewal-btn :summonerName="userInfo.name"/>
    <span>최근업데이트 : {{getUpdateTime}}</span>
  </b-media>
</template>

<script>
  import RenewalBtn from "../button/RenewalBtn";

  export default {
    props: ["userInfo"],
    components: {
      RenewalBtn
    },
    computed: {
      getIconImagePath() {
        if (typeof this.userInfo.profileIconId === "undefined") return '';
        return `//opgg-static.akamaized.net/images/profile_icons/profileIcon${this.userInfo.profileIconId}.jpg`
      },
      getUpdateTime() {
        const time = (new Date().getTime() - this.userInfo.renewalTime);
        let resultData;
        const days = Math.floor((time) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time) / (1000 * 60 * 60));
        const minutes = Math.floor((time) / (1000 * 60));

        if (days > 0) resultData = days + '일 전';
        if (hours > 0 && days < 1) resultData = hours + "시간 전";
        if (minutes > -1 && hours === 0) resultData = minutes + "분 전";
        return resultData;
      },
      getNickName() {
        const parseNull = this.userInfo.nickName === "null" ? null : this.userInfo.nickName
        return parseNull !== null ? `[${this.userInfo.nickName}]` : ''

      }

    }
  }
</script>

<style scoped>
  .userinfo {
    margin-bottom: 15px;
  }

  .myname {
    position: absolute;
    top: 40px;
    left: 130px;
  }

  .myname p {
    font-size: 38px;
  }
</style>
