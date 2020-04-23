import React, { useState } from "react";
import { connect } from "react-redux";
import { Steps, Button, message } from "antd";
import ThemesSelect from "./themesSelect";
import QuestionsSelect from "./questionsSelect";
import ExamSettings from "./examSettings";
import { createExam } from "../../../actions";
import "../style.sass";

const ExamSetUp = (props) => {
  const [current, setCurrent] = useState(0);
  const { Step } = Steps;

  const steps = [
    {
      title: "Selecting Themes",
      content: (
        <div className="step">
          <ThemesSelect />
        </div>
      ),
    },
    {
      title: "Selecting Questions",
      content: (
        <div className="step">
          <QuestionsSelect />
        </div>
      ),
    },
    {
      title: "Settings",
      content: (
        <div className="step">
          <ExamSettings />
        </div>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const addExam = () => {
    message.success("Exam created!");
    props.createExam({ ...props.questions, ...props.settings });
  };

  return (
    <div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={addExam}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: 8 }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    questions: state.exam.questionsSelected,
    settings: state.exam.settings,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  createExam,
};
export default connect(mapStateToProps, mapDispatchToProps)(ExamSetUp);
