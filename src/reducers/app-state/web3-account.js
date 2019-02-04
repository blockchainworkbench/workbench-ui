import {ACTIONS, WEB3_ACCOUNT_STATE} from "../../actions";


const web3AccountState = (state = WEB3_ACCOUNT_STATE.PENDING, action) => {
    switch (action.type) {
        case ACTIONS.CHECK_WEB3_ACCOUNT:
            return WEB3_ACCOUNT_STATE.PENDING;
        case ACTIONS.CHECK_WEB3_ACCOUNT_SUCCESS:
            return WEB3_ACCOUNT_STATE.AUTHORIZED;
        case ACTIONS.CHECK_WEB3_ACCOUNT_FAILURE:
            if (action.unsupported) return WEB3_ACCOUNT_STATE.UNSUPPORTED;
            return WEB3_ACCOUNT_STATE.UNAUTHORIZED;
        default:
            return state;
    }
};
replaceMsgSender
const web3AccountError = (state = null, action) => {
    switch (action.type) {
        case ACTIONS.CHECK_WEB3_ACCOUNT_FAILURE:
            return action.error;
        default:
            return state;
    }
};

const web3Address = (state = null, action) => {
    switch (action.type) {
        case ACTIONS.WEB3_ACCOUNT_UPDATE:
            return action.address;
        default:
            return state;
    }
};

const web3NetworkId = (state = null, action) => {
    switch (action.type) {
        case ACTIONS.WEB3_ACCOUNT_UPDATE:
            return action.networkId;
        default:
            return state;
    }
};


const validNetwork = (state = false, action) => {
    switch (action.type) {
        case ACTIONS.WEB3_ACCOUNT_UPDATE:
            return action.networkId === '806';
        default:
            return state;
    }
};

const web3Account = {
    state: web3AccountState,
    error: web3AccountError,
    address: web3Address,
    networkId: web3NetworkId,
    validNetwork: validNetwork

};

export default web3Account;