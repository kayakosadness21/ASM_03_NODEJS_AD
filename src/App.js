import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import openSocket from "socket.io-client";
import environment from "./environment";

import "./App.css";
import Layout from "./components/layout/Layout";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import Product from "./components/pages/Product";
import ProductUpdate from "./components/pages/ProductUpdate";
import ChatRoom from "./components/pages/ChatRoom";
import OrderDetail from "./components/pages/OrderDetail";
import Dashboard from "./components/pages/Dashboard";
import ProductAddNew from "./components/pages/ProductAddNew";

// USER
import PageUserHome from "./components/pages/page-user/page-user-home/page-user-home";
import PageUserAdd from "./components/pages/page-user/page-user-add/page-user-add";
import PageUserEdit from "./components/pages/page-user/page-user-edit/page-user-edit";

// ROLE
import PageRoleHome from "./components/pages/page-role/page-role-home/page-role-home";
import PageRoleAdd from "./components/pages/page-role/page-role-add/page-role-add";
import PageRoleEdit from "./components/pages/page-role/page-role-edit/page-role-edit";

// CHATBOX
import PageChat from "./components/pages/page-chat/page-chat";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, isAdmin, user } = useSelector((state) => state.logInReducer);

  useEffect(() => {
    if(user) {
      let socket = openSocket(environment.api.url);
      socket.emit("ADMIN-SIGNIN", {id: user.userId, email: user.email});
      dispatch({type: 'SHARE-SOCKET', socket});
    }

  }, [user])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route
          path="/dashboard"
          element={isLoggedIn && isAdmin ? <Dashboard /> : ""}
        />
        <Route
          path="/order/detail/:id"
          element={isLoggedIn && isAdmin ? <OrderDetail /> : ""}
        />
        <Route
          path="/products"
          element={isLoggedIn && isAdmin ? <Product /> : ""}
        />
        <Route
          path="/products/update/:id"
          element={isLoggedIn && isAdmin ? <ProductUpdate /> : ""}
        />
        <Route
          path="/products/add-new"
          element={isLoggedIn && isAdmin ? <ProductAddNew /> : ""}
        />

        {/* USER */}
        <Route
          path="/users"
          element={isLoggedIn && isAdmin ? <PageUserHome /> : ""}
        />
        <Route
          path="/users-add"
          element={isLoggedIn && isAdmin ? <PageUserAdd /> : ""}
        />
        <Route
          path="/users-edit/:id"
          element={isLoggedIn && isAdmin ? <PageUserEdit /> : ""}
        />

        {/* ROLE */}
        <Route
          path="/roles"
          element={isLoggedIn && isAdmin ? <PageRoleHome /> : ""}
        />
        <Route
          path="/roles-add"
          element={isLoggedIn && isAdmin ? <PageRoleAdd /> : ""}
        />
        <Route
          path="/roles-edit/:id"
          element={isLoggedIn && isAdmin ? <PageRoleEdit /> : ""}
        />
        <Route path="/chat-room" element={isLoggedIn ? <PageChat /> : ""} />
      </Routes>
    </Layout>
  );
}

export default App;
