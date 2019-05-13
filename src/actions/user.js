const ACTIONS = {
  LOAD_USER_PROFILE: 'LOAD_USER_PROFILE',
  LOAD_USER_PROFILE_SUCCESS: 'LOAD_USER_PROFILE_SUCCESS',
  LOAD_USER_PROFILE_FAILURE: 'LOAD_USER_PROFILE_FAILURE',
  LOGOUT_USER: 'LOGOUT',
  LOGOUT_USER_SUCCESS: 'LOGOUT_SUCCESS',
  SAVE_PROFILE: 'SAVE_PROFILE',
  SAVE_PROFILE_SUCCESS: 'SAVE_PROFILE_SUCCESS',
  SAVE_PROFILE_FAILURE: 'SAVE_PROFILE_FAILURE',
}

export const USER_ACTIONS = ACTIONS

export const loadUserProfile = () => ({
  type: ACTIONS.LOAD_USER_PROFILE,
})

export const loadUserProfileSuccess = profile => ({ type: ACTIONS.LOAD_USER_PROFILE_SUCCESS, ...profile })

export const loadUserProfileFailure = (error, code = null) => ({
  type: ACTIONS.LOAD_USER_PROFILE_FAILURE,
  error: error,
  code: code,
})

export const saveProfile = (displayName, publicKey = null) => ({
  type: ACTIONS.SAVE_PROFILE,
  displayName: displayName,
  publicKey: publicKey,
})

export const saveProfileSuccess = () => ({
  type: ACTIONS.SAVE_PROFILE_SUCCESS,
})

export const saveProfileFailure = error => ({
  type: ACTIONS.SAVE_PROFILE_FAILURE,
  error: error,
})

export const logoutUser = () => ({
  type: ACTIONS.LOGOUT_USER,
})

export const logoutSuccess = () => ({
  type: ACTIONS.LOGOUT_USER_SUCCESS,
})
