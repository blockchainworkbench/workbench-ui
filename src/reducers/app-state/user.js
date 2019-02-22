import {ACTIONS} from "../../actions";
import _ from "lodash";

const user = (state = {authenticated: false}, action) => {
    switch (action.type) {
        case ACTIONS.LOAD_USER_PROFILE:
            return {
                authenticated: false,
                loading: true
            };
        case ACTIONS.LOAD_USER_PROFILE_SUCCESS:
            const profile = _.omit(action, ['type']);
            profile.authenticated = true;
            profile.loading = false;
            return profile;
        case ACTIONS.LOAD_USER_PROFILE_FAILURE:
            if (action.code !== 401) {
                console.log(action.error);
            }
            return {
                authenticated: false,
                loading: false,
                error: action.error
            };
        case ACTIONS.LOGOUT_USER_SUCCESS:
            return {
                authenticated: false,
                loading: false
            };
        default:
            return state;
    }
};

export default user;
