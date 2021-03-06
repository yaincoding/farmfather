import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Layout } from "antd";
import "./App.css";

import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

import Home from "./routes/Home";
import Courses from "./routes/course/Courses";
import Course from "./routes/course/Course";
import Register from "./routes/auth/Register";
import LoginPopup from "./components/auth/LoginPopup";
import InstructMain from "./routes/instruct/InstructMain";
import MyPage from "./routes/user/MyPage";

import UserContextProvider from "./context/auth/UserContextProvider";
import CourseContextProvider from "./context/course/CourseContextProvider";
import VideoPlay from "./routes/course/VideoPlay";
import BoardMain from "./routes/community/BoardMain";
import VideoMain from "./routes/nongsaro/VideoMain";

const { Content } = Layout;

const App = () => {
  const [loginPopupDisplay, setLoginPopupDisplay] = useState("none");

  const showLoginPopup = () => {
    setLoginPopupDisplay("flex");
  };

  const closeLoginPopup = () => {
    setLoginPopupDisplay("none");
  };

  return (
    <BrowserRouter>
      <UserContextProvider>
        <Layout
          className="layout"
          style={{
            minHeight: "100vh",
          }}
        >
          <LoginPopup
            display={loginPopupDisplay}
            closeLoginPopup={closeLoginPopup}
          />
          <AppHeader showLoginPopup={showLoginPopup} />
          <Content style={contentStyle}>
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/courses" component={Courses} exact />
            <Route path="/course/:id" component={Course} exact />
            <CourseContextProvider>
              <Route path="/instruct" component={InstructMain} />
            </CourseContextProvider>
            <Route path="/mypage" component={MyPage} />
            <Route path="/video/:videoId" component={VideoPlay} />
            <Route path="/community" component={BoardMain} />
            <Route path="/nongsaro" component={VideoMain} />
          </Content>
          <AppFooter />
        </Layout>
      </UserContextProvider>
    </BrowserRouter>
  );
};

const contentStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  background: "#fff",
  width: "100%",
  height: "100%",
};

export default App;
