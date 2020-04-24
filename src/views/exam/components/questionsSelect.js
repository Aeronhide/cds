import React, { useEffect, useState } from "react";
import { List, Checkbox } from "antd";
import { getExamQuestions, setExamQuestions } from "../../../actions";
import { connect } from "react-redux";

const QuestionsSelect = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    props.getExamQuestions();
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
    props.setExamQuestions(data);
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
        dataSource={props.questions}
        renderItem={(item, index) => itemsList(item, index)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    themes: state.exams.themes,
    questions: state.exams.questionsList,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  getExamQuestions,
  setExamQuestions,
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsSelect);
