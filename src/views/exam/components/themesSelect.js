import React, { useEffect, useState } from "react";
import { List, Checkbox } from "antd";
import { getThemes, setExamThemes } from "../../../actions";
import { connect } from "react-redux";

const ThemesSelect = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    props.getThemes();
  }, []);

  const selectingTheme = (item, e) => {
    if (e.target.checked) {
      setData([...data, item]);
    } else {
      const filteredList = data.filter((theme) => theme !== item);
      setData(filteredList);
    }
  };

  useEffect(() => {
    props.setExamThemes(data);
  }, [data]);

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
        dataSource={props.themes}
        renderItem={(item, index) => themesList(item, index)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    themes: state.themes,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  getThemes,
  setExamThemes,
};
export default connect(mapStateToProps, mapDispatchToProps)(ThemesSelect);
