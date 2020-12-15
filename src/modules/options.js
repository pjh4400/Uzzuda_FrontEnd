const SELECT_OPTIONS = 'options/SELECT_OPTIONS'; // 옵션선택
const RANKING_LECTURES = 'options/RANKING_LECTURES';
const initialState = {
    first: 0,
    second: 0,
    third: 0,
    ranking: [],
}

export const selectOptions = (num, value) => ({
    type: SELECT_OPTIONS,
    num, 
    value
});

export const rankingLectures = (ranking) => ({
    type: RANKING_LECTURES,
    ranking
});



function options(state = initialState, action) {
    switch (action.type) {
        case SELECT_OPTIONS:
            switch(action.num){
                case 1:
                    return {
                        ...state,
                        first: action.value,
                    };
                case 2:
                    return {
                        ...state,
                        second: action.value,
                        third: action.third,
                    };
                case 3:
                    return {
                        ...state,
                        third: action.value,
                    };
            }
        
        case RANKING_LECTURES:
            return{
                ...state,
                ranking: action.ranking,
            }

        default:
            return state;
    }
}

export default options;