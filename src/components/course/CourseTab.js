import { Layout, Tabs, Space, List } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import React, { useState } from "react";

import "../../fonts/font.css";
import CourseWidget from "./CourseWidget";
import Chapters from "./chapters/Chapters";

import QuestionDetail from "./qna/QuestionDetail";
import QnAList from "./qna/QnAList";
import ReviewList from "./review/ReviewList";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

const { TabPane } = Tabs;

const CourseTab = ({ data }) => {
  const { detail, price, learns, chapters, qnas, reviews, starAvg } =
    data || {};

  return (
    <Layout className="tabsLayout" style={tabsLayoutStyle}>
      <CourseWidget price={price} />
      <Tabs
        defaultActiveKey="1"
        onChange={null}
        tabBarGutter={50}
        tabBarStyle={{
          background: "#eee",
          paddingLeft: "20%",
        }}
      >
        <TabPane tab={<p style={tabTitleStyle}>강의 소개</p>} key="1">
          <Layout className="courseInfoLayout" style={courseInfoLayoutStyle}>
            {renderDetail(detail)}
            {renderLearns(learns)}
            {chapters && (
              <Chapters
                chapters={chapters}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  marginTop: "50px",
                  marginBottom: "100px",
                }}
              />
            )}
          </Layout>
        </TabPane>
        <TabPane tab={<p style={tabTitleStyle}>강의 컨텐츠</p>} key="2">
          <Layout className="courseInfoLayout" style={courseInfoLayoutStyle}>
            {chapters && <Chapters chapters={chapters} />}
          </Layout>
        </TabPane>
        <TabPane tab={<p style={tabTitleStyle}>{"질문과 답변"}</p>} key="3">
          <Layout className="courseInfoLayout" style={courseInfoLayoutStyle}>
            <QnAs qnas={qnas} />
          </Layout>
        </TabPane>
        <TabPane tab={<p style={tabTitleStyle}>{"후기"}</p>} key="4">
          <Layout className="courseInfoLayout" style={courseInfoLayoutStyle}>
            <ReviewList reviews={reviews} starAvg={starAvg} />
          </Layout>
        </TabPane>
      </Tabs>
    </Layout>
  );
};

const renderDetail = (detail) => {
  const style = {
    width: "100%",
    maxWidth: "100%",
    minWidth: "364px",
    fontFamily: "notosans_medium",
    fontSize: "1.2rem",
    marginTop: "50px",
  };

  return (
    <div style={style}>
      <p>{detail}</p>
    </div>
  );
};

const renderLearns = (learns) => {
  return (
    <div
      className="listContainer"
      style={{
        width: "100%",
        maxWidth: "100%",
        minWidth: "364px",
        marginTop: "50px",
      }}
    >
      <List
        className="learnList"
        size="small"
        header={
          <p
            style={{
              fontFamily: "notosans_bold",
              fontSize: "20px",
            }}
          >
            배우는 내용
          </p>
        }
        bordered
        dataSource={learns || []}
        style={{
          borderRadius: "10px",
        }}
        renderItem={(item) => (
          <List.Item>
            {
              <Space>
                <CheckOutlined
                  style={{
                    color: "#0f0",
                  }}
                />
                {
                  <p
                    style={{
                      margin: "0 0",
                      fontFamily: "notosans_light",
                      fontSize: "16px",
                    }}
                  >
                    {item}
                  </p>
                }
              </Space>
            }
          </List.Item>
        )}
      />
    </div>
  );
};

const QnAs = ({ qnas }) => {
  const [currentView, setCurrentView] = useState("list");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onCardClicked = (qna) => {
    setSelectedQuestion(qna);
    setCurrentView("detail");
  };

  const onWriteBtnClicked = () => {
    setCurrentView("write");
  };

  const onBackClicked = () => {
    setCurrentView("list");
  };

  if (currentView === "list") {
    return (
      <QnAList
        onCardClicked={onCardClicked}
        onWriteBtnClicked={onWriteBtnClicked}
        qnas={qnas}
      />
    );
  } else if (currentView === "write") {
    return (
      <Editor
        toolbar={{
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }}
        placeholder="내용을 작성하세요"
        localization={{
          locale: "ko",
        }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    );
  } else if (currentView === "detail") {
    return (
      <QuestionDetail qna={selectedQuestion} onBackClicked={onBackClicked} />
    );
  }
};

const tabsLayoutStyle = {
  display: "flex",
  background: "#fff",
  position: "sticky",
  top: 0,
};

const tabTitleStyle = {
  margin: "0 0",
  fontFamily: "notosans_medium",
};

const courseInfoLayoutStyle = {
  display: "inline-block",
  background: "#fff",
  width: "50%",
  maxWidth: "720px",
  position: "relative",
  left: "20%",
};

export default CourseTab;
