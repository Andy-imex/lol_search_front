export default {
    userInfoSetAction({commit}, userInfo){
        commit('setUserInfo', userInfo);
    },
    userRecordSetAction({commit}, userRecord){
        commit('setUserRecord', userRecord);
    },
    userMatchListPush({commit}, matchData){
        const stateMatchArray = this.state.userMatchList;
        stateMatchArray.push(matchData);

        const sortArray = stateMatchArray.sort(function(a, b) { 
            return b.gameCreation - a.gameCreation;
        });
        commit("setMatchData", sortArray)   
    },
    userMatchListInit({commit}){
        commit("setMatchData", [])
    },
    championDataSetAction({commit}, championData){
        commit("setChampionData", championData)   
    },
    spellDataSetAction({commit}, spellData){
        commit("setSpellData", spellData)   
    },
    userMatchDataIndexAction({commit}, matchDataIndex){
        commit("setMatchDataIndex", matchDataIndex)
    }
}