import React from "react";

import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";

import "../fonts/font.css";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const onSearch = (value) => console.log(value);

const SearchBox = () => {
  return (
    <Search
      placeholder="찾고 싶은 강좌를 입력해주세요"
      allowClear
      enterButton="검색"
      size="large"
      onSearch={onSearch}
      style={{
        ...searchBoxStyle,
      }}
    />
  );
};

const searchBoxStyle = {
  width: "600px",
  maxWidth: "800px",
  minWidth: "300px",
  fontSize: "larger",
  fontFamily: "nanum_gothic_bold",
  color: "#444444",
  margin: "50px",
};

export default SearchBox;