export default {
    searchStart({commit}, payload){
        commit('setSearch', payload)
    },
    userDataSetAction({commit}, payload){
        const userRecord = payload;
        const userInfo = payload.pop();
        commit('setUserRecord', userRecord);
        commit('setUserInfo', userInfo);
    },
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
        commit("setMatchData", new Array())
    },
    championDataSetAction({commit}, championData){
        commit("setChampionData", championData)   
    },
    spellDataSetAction({commit}, spellData){
        commit("setSpellData", spellData)   
    },
    isLoadingChangeAction({commit}, isLoading){
        commit("setLoaidng", isLoading)
    },
    userMatchDataIndexAction({commit}, matchDataIndex){
        commit("setMatchDataIndex", matchDataIndex)
    },
    setAccountIdAction({commit}, accountID){
        commit("setAccountId", accountID)
    }
    
}