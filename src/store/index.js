import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
    userInfo:'',
    userRecords:'',
    userMatchList:[],
    championData:'',
    spellData:'',
    matchDataIndex:0,
    accountId:'',
    morePlusNum:5
};

export default new Vuex.Store({
    state,
    mutations,
    actions
})