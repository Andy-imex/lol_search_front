<template>
  <b-media class="userInfoContent" v-if="userInfo.name">
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
      /**
       * props 로 받은 userInfo 의 profileIconId 값하고 이미지 경로를합쳐 이미지 path 를 반환한다
       * * @returns {string}
       */
      getIconImagePath() {
        if (typeof this.userInfo.profileIconId === "undefined") return '';
        return `//opgg-static.akamaized.net/images/profile_icons/profileIcon${this.userInfo.profileIconId}.jpg`
      },
      /**
       * 현재 시간과 props로 받은 userInfo의 갱신시간을 계산하여 언제 갱신했는지 String 으로 반환한
       * @returns {string}
       */
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
      /**
       * props 로 받은 userInfo 의 nickName 이 null 이거나 String "null" 이 아니면 닉네임을 반환하고  해당되면 공백으로 반환한다
       * @returns {string}
       */
      getNickName() {
        const parseNull = this.userInfo.nickName === "null" ? null : this.userInfo.nickName;
        return parseNull !== null ? `[${this.userInfo.nickName}]` : ''
      }

    }
  }
</script>

<style scoped>
  .userInfoContent {
    width:100%;
    border:1px solid #ddd;
    padding: 15px;
  }
  .myname p {
    font-size: 38px;
  }
</style>
