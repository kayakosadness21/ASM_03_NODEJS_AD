const initialNavBar = {
  loginPage: false,
  chatRoomPage: false,
  productPage: false,
  dashboardPage: false,
};

const navBarActiveReducer = (state = initialNavBar, action) => {
  switch (action.type) {
    case "ACTIVE_LOGIN_PAGE":
      return {
        loginPage: true,
        chatRoomPage: false,
        productPage: false,
        dashboardPage: false,
      };
    case "ACTIVE_CHAT_ROOM_PAGE":
      return {
        loginPage: false,
        chatRoomPage: true,
        productPage: false,
        dashboardPage: false,
      };
    case "ACTIVE_PRODUCT_PAGE":
      return {
        loginPage: false,
        chatRoomPage: false,
        productPage: true,
        dashboardPage: false,
      };
    case "ACTIVE_DASHBOARD_PAGE":
      return {
        loginPage: false,
        chatRoomPage: false,
        productPage: false,
        dashboardPage: true,
      };
    default:
      return state;
  }
};
export default navBarActiveReducer;
