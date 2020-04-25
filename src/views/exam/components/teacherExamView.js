import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  List,
  Avatar,
  Tooltip,
} from "antd";
import { getAnswers, getExam } from "../../../actions";

const TeacherExamView = (props) => {
  const { Title } = Typography;
  const [count, setCount] = useState(false);
  const settings = props.exam && props.exam.settings;
  const questions = props.exam && props.exam.questions;
  const examiners = settings && settings.examiners;
  const students = [
    { name: "Charlie Brown", status: "connected" },
    { name: "Charlie Brown", status: "disconnected" },
    { name: "Charlie Brown", status: "finished" },
    { name: "Charlie Brown", status: "connected" },
  ];
  useEffect(() => {
    props.getExam();
    props.getAnswers();
  }, []);

  const startTime = (resume, pause) => {
    if (count) {
      return resume();
    }
    return pause();
  };
  return (
    <div className="exam-view">
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Card>
            {questions &&
              questions.map((q, i) => (
                <Row key={i}>
                  <Col md={24}>
                    <Card className="exam-card" title={q.name}>
                      {props.answers &&
                        props.answers
                          .filter((an) => an.questionId === q.key)
                          .map((a) => (
                            <div
                              key={a.key}
                              className={`exam-answer ${a.isTrue && "correct"}`}
                            >
                              {a.name}
                            </div>
                          ))}
                    </Card>
                  </Col>
                </Row>
              ))}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card className="exam-view-settings">
            <Row>
              <Col md={4}>
                <Title className="title" level={4}>
                  Duration:
                </Title>
              </Col>
              <Col md={4}>
                <Title level={4}>{settings && settings.duration}</Title>
              </Col>
              <Col md={4}>
                <Button onClick={() => setCount(true)} type="primary">
                  Start Exam
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Title className="title" level={4}>
                  Subject:
                </Title>
              </Col>
              <Col md={4}>
                <Title level={4}>{settings && settings.subject}</Title>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Title className="title" level={4}>
                  Examiners:
                </Title>
              </Col>
              <Col md={4}>
                <Title level={4}>
                  {examiners &&
                    examiners.map((ex, index) => (
                      <span key={index}>
                        {index !== examiners.length - 1 ? ex + ", " : ex}
                      </span>
                    ))}
                </Title>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Title className="title" level={4}>
                  Group:
                </Title>
              </Col>
              <Col md={4}>
                <Title level={4}>{settings && settings.group}</Title>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <List
                  className="students-list"
                  header={<Title level={4}>Students</Title>}
                  itemLayout="horizontal"
                  dataSource={students}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={
                          <div className="students-list_student_title">
                            <div>{item.name + " " + index}</div>
                            <Tooltip
                              title={
                                item.status.charAt(0).toUpperCase() +
                                item.status.slice(1)
                              }
                            >
                              <div
                                className={`students-list_student_title_status ${item.status}`}
                              />
                            </Tooltip>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    exam: state.exam,
    answers: state.answers,
    loading: state.loading,
  };
};

const mapDispatchToProps = { getExam, getAnswers };
export default connect(mapStateToProps, mapDispatchToProps)(TeacherExamView);
