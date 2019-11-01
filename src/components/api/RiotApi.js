import axios from 'axios'
import Cookies from 'js-cookie'

class RiotApi {
  constructor(baseUrl) {
    this.http = axios.create({
      baseURL: baseUrl
    })
  }

  getUserInfoBySummonerName(summonerName) {
    const encodeValue = encodeURI(summonerName.trim())
    return this.http.get(`/search/${encodeValue}`)
  }

  getUserRecordByAccountId(accountId) {
    return this.http.get(`/league/${accountId}`)
  }

  getMatchListDataByAccountIdAndBeginIndexAndEndIndex(accountId, endindex, beginIndex) {
    return this.http.get(`/matchlist/${accountId}/${endindex}/${beginIndex}`)
  }

  getMatchDataByMatchId(matchId) {
    return this.http.get(`/match/${matchId}`)
  }

  getRenewalDataUserInfoBySummonerName(summonerName) {
    const encodeValue = encodeURI(summonerName.trim())
    return this.http.put(`/search/${encodeValue}`)
  }

  /**
   * Record를 기록갱신하게만들어줘야됨
   */
  getRenewalDataUserRecordByEncryptedSummonerId(encryptedSummonerId) {
    return this.http.put(`/league/${encryptedSummonerId}`)
  }
}

let riotapi = null;
export default () => {
  if (riotapi === null) {
    riotapi = new RiotApi(Cookies.get('backend_url'));
  }
  return riotapi;
};
