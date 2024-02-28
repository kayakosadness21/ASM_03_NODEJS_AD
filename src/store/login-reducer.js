const initialStateLogin = {
  user: null,
  isLoggedIn: false,
  isExistedUser: true,
  isWrongPassword: false,
  isAdmin: true,
};
// user={
//     name: string
//     email: String
//     pass: String
//     phone: string
//     active: false
// }
const loginReducer = (state = initialStateLogin, action) => {
  switch (action.type) {
    case "ON_LOGIN":
      return {
        user: { ...action.payload.user },
        isLoggedIn: true,
        isExistedUser: true,
        isWrongPassword: false,
        isAdmin: action.payload.user.isAdmin ? true : false,
      };
    case "ON_LOGOUT":
      return {
        user: null,
        isLoggedIn: false,
        isExistedUser: true,
        isWrongPassword: false,
        isAdmin: true,
      };
    case "NOT_EXISTED_USER":
      return {
        user: null,
        isLoggedIn: false,
        isExistedUser: false,
        isWrongPassword: false,
        isAdmin: true,
      };

    case "WRONG_PASSWORD":
      return {
        user: null,
        isLoggedIn: false,
        isExistedUser: true,
        isWrongPassword: true,
        isAdmin: true,
      };
    case "IS_NOT_AUTHENTICATION":
      return {
        user: null,
        isLoggedIn: false,
        isExistedUser: true,
        isWrongPassword: false,
        isAdmin: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
