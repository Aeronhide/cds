import React, { useEffect, useState } from "react";
import { List, Checkbox } from "antd";
import { getThemes, setExamThemes } from "../../../actions";
import { connect } from "react-redux";

const ThemesSelect = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    props.getThemes();
  }, [props]);

  const selectingItem = (item, e) => {
    if (e.target.checked) {
      setData([...data, item]);
    } else {
      const filteredList = data.filter((el) => el !== item);
      setData(filteredList);
    }
  };

  useEffect(() => {
    props.setExamThemes(data);
  });

  const itemsList = (item) => {
    return (
      <List.Item>
        <Checkbox onChange={(e) => selectingItem(item, e)}>
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
        renderItem={(item, index) => itemsList(item, index)}
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
