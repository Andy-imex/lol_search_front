import axios from 'axios'
import Cookies from 'js-cookie'

class BackEndApi {
  constructor(baseUrl) {
    this.http = axios.create({
      baseURL: baseUrl
    })
  }

  getAllSummonerData() {
    return this.http.get(`/summoner`)
  }

  deleteSummonerDataByAccountId(accountId) {
    return this.http.delete(`/summoner/${accountId}`)
  }

  updateSummonerDataNickNameByAccount(accountId, nickname) {
    return this.http.put(`/summoner/${accountId}/${nickname}`)
  }
}

let backendapi = null;
export default () => {
  if (backendapi === null) {
    backendapi = new BackEndApi(Cookies.get('backend_url'));
  }
  return backendapi;
};
