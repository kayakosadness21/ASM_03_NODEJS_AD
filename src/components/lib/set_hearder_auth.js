const setHearder = (content) => {
  const localState = JSON.parse(localStorage.getItem("cartState"));
  if (
    localState &&
    localState.logInReducer &&
    localState.logInReducer.user &&
    localState.logInReducer.user.token
  ) {
    const token = localState.logInReducer.user.token;
    return { ...content, authorization: token };
  }
  return { ...content };
};
export default setHearder;
