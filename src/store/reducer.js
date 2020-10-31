const { SIGNIN } = require("./actions")

const initialState = {
    user: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN:
            return {
                ...state,
                user: action.user,
            }
        default:
            return state
    }
}

export default reducer;