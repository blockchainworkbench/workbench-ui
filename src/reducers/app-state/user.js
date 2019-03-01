import {ACTIONS} from "../../actions";
import _ from "lodash";

const user = (state = {authenticated: false}, action) => {
    switch (action.type) {
        case ACTIONS.LOAD_USER_PROFILE:
            return Object.assign({}, _.pick(state, ['saving']), {authenticated: false, loading: true});
        case ACTIONS.LOAD_USER_PROFILE_SUCCESS:
            return Object.assign({}, _.pick(state, ['saving']), _.omit(action, ['type']),
                {authenticated: true, loading: false});
        case ACTIONS.LOAD_USER_PROFILE_FAILURE:
            if (action.code !== 401) {
                console.log(`Error loading user profile ${action.code}`);
            }
            return {authenticated: false, loading: false, error: action.error};
        case ACTIONS.LOGOUT_USER_SUCCESS:
            return {authenticated: false, loading: false};
        case ACTIONS.SAVE_PROFILE:
            return Object.assign({}, state, {saving: true});
        case ACTIONS.SAVE_PROFILE_SUCCESS:
            return Object.assign({}, state, {saving: false});
        case ACTIONS.SAVE_PROFILE_FAILURE:
            return Object.assign({}, state, {saving: false, error: action.error});
        default:
            return state;
    }
};

export default user;
