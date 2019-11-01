import axios from 'axios'
import Cookies from 'js-cookie'

class RiotDataApi {
  constructor(baseUrl) {
    this.http = axios.create({
      baseURL: baseUrl
    })
  }

  getChampionData() {
    return this.http.get(`http://ddragon.leagueoflegends.com/cdn/9.20.1/data/ko_KR/champion.json`)
  }

  getSpellData() {
    return this.http.get(`http://ddragon.leagueoflegends.com/cdn/9.20.1/data/ko_KR/summoner.json`)
  }
}

let riotDataapi = null;
export default () => {
  if (riotDataapi === null) {
    riotDataapi = new RiotDataApi(Cookies.get('riot_data_url'));
  }
  return riotDataapi;
};
