export function selectActiveUser(state) {
  return state.activeUser.user;
}

export function selectIsAuthenticated(state) {
  return !!state.activeUser.token;
}
