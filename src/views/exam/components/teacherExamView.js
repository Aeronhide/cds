import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
import Timer from "../../../helpers/timer";

const TeacherExamView = ({
  settings,
  questions,
  answers,
  students,
  started,
  startExam,
  loading,
}) => {
  const { Title } = Typography;

  return (
    <div className="teacher-view">
      {settings && settings.duration && (
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Card>
              {questions &&
                questions.map((q, i) => (
                  <Row key={i}>
                    <Col md={24}>
                      <Card className="exam-card" title={q.name}>
                        {answers &&
                          answers
                            .filter((an) => an.questionId === q.key)
                            .map((a) => (
                              <div
                                key={a.key}
                                className={`exam-answer ${
                                  a.isTrue && "correct"
                                }`}
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
            <Card className="teacher-view-settings">
              <Row>
                <Col md={4}>
                  <Title className="title" level={4}>
                    Duration:
                  </Title>
                </Col>
                <Col md={4}>
                  <Title level={4}>
                    <Timer time={settings.duration} paused={started} />
                  </Title>
                </Col>
                <Col md={4}>
                  <Button
                    loading={loading}
                    onClick={() => startExam()}
                    type="primary"
                  >
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
                    {settings &&
                      settings.examiners.map((ex, index) => (
                        <span key={index}>
                          {index !== settings.examiners.length - 1
                            ? ex + ", "
                            : ex}
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
      )}
    </div>
  );
};

TeacherExamView.propTypes = {
  count: PropTypes.bool,
  setCount: PropTypes.func,
  settings: PropTypes.object,
  students: PropTypes.array,
  questions: PropTypes.array,
  answers: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(TeacherExamView);
