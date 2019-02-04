import {ACTIONS, DEPLOY_STATE, WEB3_ACCOUNT_STATE} from "../../actions";


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

const contract = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.DEPLOY_CONTRACTS:
            const newContr = {codeId: action.codeId, state: DEPLOY_STATE.DEPLOYING, message: 'Deploying Contracts'};
            const contracts = [...state.map(contract => {
                if (contract.codeId === action.codeId) {
                    return newContr;
                } else return contract;
            })];
            const findContract = contracts.find(contract => contract.codeId === action.codeId);
            if (findContract === undefined) contracts.push(newContr)
            return contracts;
        case ACTIONS.DEPLOY_CONTRACTS_UPDATE:
            return [...state.map(contract => {
                if (contract.codeId === action.codeId) {
                    return Object.assign({}, contract, {message: action.message});
                } else return contract;
            })];
        case ACTIONS.DEPLOY_CONTRACTS_SUCCESS:
            return [...state.map(contract => {
                if (contract.codeId === action.codeId) {
                    return Object.assign({}, contract, {
                        state: DEPLOY_STATE.DEPLOYED,
                        message: action.message,
                        addresses: action.addresses
                    });
                } else return contract;
            })];
        case ACTIONS.DEPLOY_CONTRACTS_FAILURE:
            return [...state.map(contract => {
                if (contract.codeId === action.codeId) {
                    return Object.assign({}, {
                        codeId: action.codeId,
                        state: DEPLOY_STATE.ERROR,
                        error: action.error
                    });
                } else return contract;
            })];
        default:
            return state;
    }
};

const web3Account = {
    state: web3AccountState,
    error: web3AccountError,
    address: web3Address,
    networkId: web3NetworkId,
    validNetwork: validNetwork,
    contract: contract
};

export default web3Account;