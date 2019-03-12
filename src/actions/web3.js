const ACTIONS = {
    CHECK_WEB3_ACCOUNT: "CHECK_WEB3_ACCOUNT",
    CHECK_WEB3_ACCOUNT_SUCCESS: "CHECK_WEB3_ACCOUNT_SUCCESS",
    CHECK_WEB3_ACCOUNT_FAILURE: "CHECK_WEB3_ACCOUNT_FAILURE",
    WEB3_ACCOUNT_UPDATE: "WEB3_ACCOUNT_UPDATE"
};

export const WEB3_ACTIONS = ACTIONS;

export const WEB3_ACCOUNT_STATE = {
    PENDING: "pending",
    UNSUPPORTED: "unsupported",
    AUTHORIZED: "auth",
    UNAUTHORIZED: "unauth"
};

export const checkWeb3Account = () => ({
    type: ACTIONS.CHECK_WEB3_ACCOUNT
});

export const checkWeb3AccountSuccess = () => ({
    type: ACTIONS.CHECK_WEB3_ACCOUNT_SUCCESS
});

export const checkWeb3AccountFailure = (reason, unsupported = false) => ({
    type: ACTIONS.CHECK_WEB3_ACCOUNT_FAILURE,
    error: reason,
    unsupported: unsupported
});

export const web3AccountUpdate = (update) => ({
    type: ACTIONS.WEB3_ACCOUNT_UPDATE,
    address: update['selectedAddress'],
    networkId: update['networkVersion']
});
