import React, { useEffect, useState } from "react";
import { List, Checkbox } from "antd";
import { getThemes, setExamThemes } from "../../../actions";
import { connect } from "react-redux";

const QuestionsSelect = (props) => {
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   props.getThemes();
  // }, []);

  const selectingTheme = (item, e) => {
    if (e.target.checked) {
      setData([...data, item]);
    } else {
      const filteredList = data.filter((theme) => theme !== item);
      setData(filteredList);
    }
  };
  const themesList = (item) => {
    return (
      <List.Item>
        <Checkbox onChange={(e) => selectingTheme(item, e)}>
          {item.name}
        </Checkbox>
      </List.Item>
    );
  };
  return (
    <div>
      <List
        size="small"
        bordered
        loading={props.loading}
        dataSource={[]}
        renderItem={(item, index) => themesList(item, index)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    themes: state.exam.themes,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  getThemes,
  setExamThemes,
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsSelect);
