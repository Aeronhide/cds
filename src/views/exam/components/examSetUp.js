import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import ThemesSelect from "./themesSelect";
import QuestionsSelect from "./questionsSelect";
import "../style.sass";
import ExamSettings from "./examSettings";

const ExamSetUp = () => {
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
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
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

export default ExamSetUp;
