export default {
    setUserRecord(state, userRecord){
        state.userRecords = userRecord;
    },
    setUserInfo(state, userInfo){
        state.userInfo = userInfo;
    },
    setMatchData(state, matchData){
        state.userMatchList = matchData
    },
    setChampionData(state, championData){
        state.championData = championData
    },
    setSpellData(state, spellData){
        state.spellData = spellData
    },
    setMatchDataIndex(state, matchDataIndex){
        state.matchDataIndex = matchDataIndex
    },
}