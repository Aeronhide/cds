import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Card, Col, Row, Checkbox, Typography, Modal } from "antd";
import "../style.sass";
// import Timer from "../../../helpers/timer";

const StudentExamView = ({
  loading,
  settings,
  answers,
  questions,
  beginExam,
  started,
}) => {
  const { Title } = Typography;
  const [data, setData] = useState({});
  const history = useHistory();
  const selectAnswer = (question, answer) => {
    if (
      (data[question] && !data[question].includes(answer)) ||
      !data[question]
    ) {
      setData({
        ...data,
        [question]: data[question] ? [...data[question], answer] : [answer],
      });
    } else {
      setData({
        ...data,
        [question]: data[question]
          ? data[question].filter((a) => a !== answer)
          : [...data[question]],
      });
    }
  };

  const finish = () => {
    let result = {};
    const ques = questions.map((q) => q.key);
    answers
      .filter((an) => an.isTrue === true && ques.includes(an.questionId))
      .forEach((a) => {
        result = {
          ...result,
          [a.questionId]: { answers: data[a.questionId], correctAnswer: a.key },
        };
      });
    const total = answers.filter(
      (an) => an.isTrue === true && ques.includes(an.questionId)
    ).length;
    const answered = Object.keys(result)
      .map(
        (q) => result[q].answers.filter((a) => a === result[q].correctAnswer)[0]
      )
      .filter((a) => a !== undefined).length;
    const grade = (answered / total).toFixed(2) * 100;
    infoModal(total, answered, grade);
  };

  const infoModal = (total, answered, grade) => {
    Modal.info({
      title: "Your result",
      maskStyle: { background: "#383838" },
      content: (
        <div>
          <Row>
            <Col md={16}>
              <Title level={4}>Subject:</Title>
            </Col>
            <Col md={8}>
              <Title level={4}>{settings && settings.subject}</Title>
            </Col>
          </Row>
          <Row>
            <Col md={16}>
              <Title level={4}>Spent time:</Title>
            </Col>
            <Col md={8}>
              <Title level={4}>00:50:00</Title>
            </Col>
          </Row>
          <Row>
            <Col md={16}>
              <Title level={4}>Total correct answers:</Title>
            </Col>
            <Col md={8}>
              <Title level={4}>{total}</Title>
            </Col>
          </Row>
          <Row>
            <Col md={16}>
              <Title level={4}>Answered:</Title>
            </Col>
            <Col md={8}>
              <Title level={4}>{answered}</Title>
            </Col>
          </Row>
          <Row>
            <Col md={16}>
              <Title level={4}>Percent completion:</Title>
            </Col>
            <Col md={8}>
              <Title level={4}>{grade} %</Title>
            </Col>
          </Row>
        </div>
      ),
      onOk() {
        history.push("/schedule");
      },
    });
  };

  return (
    <div className="student-view">
      {started ? (
        <div>
          <Row gutter={4} justify="center">
            <Col xs={24} md={16}>
              <Row>
                <Col xs={24} md={4}>
                  <Title level={3}>University: </Title>
                </Col>
                <Col xs={24} md={20}>
                  <Title level={4}>ULIM</Title>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={4}>
                  <Title level={3}>Subject: </Title>
                </Col>
                <Col xs={24} md={20}>
                  <Title level={4}>{settings && settings.subject}</Title>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={4}>
                  <Title level={3}>Group: </Title>
                </Col>
                <Col xs={24} md={20}>
                  <Title level={4}>{settings && settings.group}</Title>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={4}>
                  <Title level={3}>Student: </Title>
                </Col>
                <Col xs={24} md={20}>
                  <Title level={4}>Charlie Brown</Title>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={4}>
                  <Title level={3}>Examiners: </Title>
                </Col>
                <Col xs={24} md={20}>
                  <Title level={4}>
                    {settings && settings.examiners.join(", ")}
                  </Title>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={4}>
                  <Title level={3}>Time remained: </Title>
                </Col>
                <Col xs={24} md={20}>
                  <Title level={4}>{settings && settings.duration}</Title>
                </Col>
              </Row>
            </Col>
          </Row>
          {settings && settings.duration && (
            <Row gutter={16} justify="center">
              <Col xs={24} md={16}>
                {questions &&
                  questions.map((q, i) => (
                    <Row key={i}>
                      <Col md={24}>
                        <Card className="exam-card" title={q.name}>
                          {answers &&
                            answers
                              .filter((an) => an.questionId === q.key)
                              .map((a) => (
                                <Row
                                  key={a.key}
                                  className={`exam-answer ${
                                    data[q.key] &&
                                    data[q.key].includes(a.key) &&
                                    "correct"
                                  }`}
                                  onClick={() => selectAnswer(q.key, a.key)}
                                >
                                  <Col md={23}>
                                    <div>{a.name}</div>
                                  </Col>
                                  <Col
                                    md={1}
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <Checkbox
                                      checked={
                                        data[q.key] &&
                                        data[q.key].includes(a.key)
                                      }
                                    />
                                  </Col>
                                </Row>
                              ))}
                        </Card>
                      </Col>
                    </Row>
                  ))}
                <Row gutter={16} justify="end">
                  <Col md={24} style={{ textAlign: "right" }}>
                    <Button type="primary" size="large" onClick={finish}>
                      Finish
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </div>
      ) : (
        <div className="start-btn">
          <Button loading={loading} type="primary" onClick={beginExam}>
            START
          </Button>
        </div>
      )}
    </div>
  );
};
StudentExamView.propTypes = {
  count: PropTypes.bool,
  settings: PropTypes.object,
  questions: PropTypes.array,
  answers: PropTypes.array,
};
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(StudentExamView);
