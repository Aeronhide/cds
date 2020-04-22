import React, { useState } from "react";
import { Button, Checkbox, Col, Input, Row } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const Answer = (props) => {
  const [editable, setEditable] = useState(false);
  const [data, setData] = useState({
    name: "",
    isTrue: false,
  });

  const changeAnswerText = (e) => {
    setData({ ...data, questionId: props.questionKey, name: e.target.value });
  };

  const changeAnswerCheckbox = (e) => {
    setData({
      ...data,
      questionId: props.questionKey,
      isTrue: e.target.checked,
    });
  };

  const editAnswer = () => {
    setData(props.answer);
    setEditable(true);
  };

  const updateAnswer = () => {
    props.save(data);
    setData({
      name: "",
      isTrue: false,
      questionId: props.questionKey,
    });
    setEditable(false);
  };

  return (
    <Row className="answer_row">
      <Col md={16}>
        <div className="answer_group">
          <Input
            type="text"
            className={`answer_group_input ${props.answer.isTrue && "correct"}`}
            disabled={!editable}
            onChange={(e) => changeAnswerText(e)}
            value={editable ? data.name : props.answer.name}
          />
          {editable ? (
            <Checkbox
              className="answer_group_checkbox"
              onChange={(e) => changeAnswerCheckbox(e)}
              checked={editable ? data.isTrue : props.answer.isTrue}
            >
              Is True
            </Checkbox>
          ) : null}
        </div>
      </Col>
      <Col md={8}>
        <div className="answer_actions visible">
          <>
            {editable ? (
              <>
                <Button
                  type="link"
                  icon={<CheckOutlined />}
                  onClick={() => updateAnswer(data)}
                />
                <Button
                  type="link"
                  onClick={() => setEditable(false)}
                  icon={<CloseOutlined />}
                />
              </>
            ) : (
              <Button
                type="link"
                onClick={editAnswer}
                icon={<EditOutlined />}
              />
            )}
          </>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => props.deleteAnswers(props.answer.key)}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Answer;
