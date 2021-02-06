const initState = {
    popularGames : [],
    newGames : [],
    upcomingGames : [],
    prevSearched: [],
    searchedGames: [],
}

const gamesReducer = (state=initState, action) => {
    switch(action.type) {
        case 'FETCH_GAMES':
            return {
                ...state,
                popularGames: action.payload.popularGames,
                upcomingGames: action.payload.upcomingGames,
                newGames: action.payload.newGames,
            };
        case 'FETCH_SEARCH':
            return {
                ...state,
                searchedGames: action.payload.searchedGames,
            }
        case 'CLEAR_SEARCHED':
            return {
                ...state,
                searchedGames: [],
            }
        case 'PREV_SEARCHED':
            return {
                ...state,
                prevSearched: action.payload.searchedGames,
            }
        default:
            return {...state};
    };
};

export default gamesReducer;