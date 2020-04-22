import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Input, Button, Checkbox } from "antd";
import {
  getAnswers,
  addAnswer,
  updateAnswer,
  deleteAnswer,
} from "../../../actions";
import Answer from "./answer";

const Answers = (props) => {
  const [data, setData] = useState({
    name: "",
    isTrue: false,
    questionId: props.question.key,
  });
  let questionKey = props.question.key;
  const date = new Date();

  useEffect(() => {
    props.getAnswers(props.question.key);
  }, []);

  const changeAnswerText = (e) => {
    setData({ ...data, questionId: questionKey, name: e.target.value });
  };

  const changeAnswerCheckbox = (e) => {
    setData({ ...data, questionId: questionKey, isTrue: e.target.checked });
  };

  const save = (data) => {
    props.updateAnswer(data);
    setData({ name: "", isTrue: false, questionId: questionKey });
  };

  const add = () => {
    props.addAnswer({ ...data, key: date.getTime() }, questionKey);
    setData({ name: "", isTrue: false, questionId: questionKey });
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      props.addAnswer({ ...data, key: date.getTime() }, questionKey);
      setData({ name: "", isTrue: false, questionId: questionKey });
    }
  };

  const deleteAnswers = (key) => {
    props.deleteAnswer(key);
  };

  return (
    <div className="answers">
      <Row>
        <Col md={20}>
          <Row>
            <Col md={24}>
              <div className="answer">
                {props.answers &&
                  props.answers
                    .filter((answer) => answer.questionId === questionKey)
                    .map((answer) => (
                      <Answer
                        answer={answer}
                        key={answer.name}
                        questionKey={questionKey}
                        changeAnswerText={changeAnswerText}
                        changeAnswerCheckbox={changeAnswerCheckbox}
                        deleteAnswers={deleteAnswers}
                        save={save}
                      />
                    ))}
              </div>
            </Col>
          </Row>
          <div className="answers_add">
            <Row>
              <Col md={24}>
                <Row>
                  <Col md={16}>
                    <div className="answers_add_group">
                      <Input
                        onChange={changeAnswerText}
                        onKeyDown={handleKeyDown}
                        className="answers_add_group_input"
                        type="text"
                        value={data.name}
                      />
                      <Checkbox
                        className="answers_add_group_checkbox"
                        checked={data.isTrue}
                        onChange={changeAnswerCheckbox}
                      >
                        Is True
                      </Checkbox>
                    </div>
                  </Col>
                  <Col md={8}>
                    <Button
                      type="primary"
                      className="answers_add_btn"
                      onClick={add}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    answers: state.answers,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  getAnswers,
  addAnswer,
  updateAnswer,
  deleteAnswer,
};
export default connect(mapStateToProps, mapDispatchToProps)(Answers);
