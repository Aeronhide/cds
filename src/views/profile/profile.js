import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import firebase from "../../config/firebase";
import { getUsers, loadExams, updateUser } from "../../actions";
import {
  Row,
  Col,
  Input,
  Button,
  Typography,
  Collapse,
  List,
  Skeleton,
} from "antd";
import "./style.sass";

const Profile = (props) => {
  const { Title } = Typography;
  const { Panel } = Collapse;
  const [data, setData] = useState({
    name: "",
    surname: "",
    address: "",
    phone: "",
  });
  const [disabled, setDisabled] = useState(false);

  const insertData = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
      userType: localStorage.getItem("user"),
      email: firebase.auth().currentUser && firebase.auth().currentUser.email,
    });
  };

  const updateUser = () => {
    props.updateUser(data);
  };

  useEffect(() => {
    props.getUsers();
    props.loadExams();
  }, []);

  const user =
    props.users &&
    props.users.find(
      (u) =>
        u.email ===
        (firebase.auth().currentUser && firebase.auth().currentUser.email)
    );

  const editUser = () => {
    setDisabled(false);
    setData(user);
  };

  useEffect(() => {
    if (user === -1) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  return (
    <div className="profile">
      <Row>
        <Col md={8}>
          {props.users && props.users.length ? (
            <div>
              <Title level={4}>Personal info</Title>
              <Row className="section" gutter={8}>
                <Col md={12}>
                  <Input
                    disabled={disabled}
                    value={!disabled ? data.name : user.name}
                    onChange={insertData}
                    name="name"
                    placeholder="Name"
                  />
                </Col>
                <Col md={12}>
                  <Input
                    disabled={disabled}
                    value={!disabled ? data.surname : user.surname}
                    onChange={insertData}
                    name="surname"
                    placeholder="Surname"
                  />
                </Col>
              </Row>
              <Row className="section" gutter={8}>
                <Col md={12}>
                  <Input
                    disabled={disabled}
                    value={!disabled ? data.address : user.address}
                    onChange={insertData}
                    name="address"
                    placeholder="Address"
                  />
                </Col>
                <Col md={12}>
                  <Input
                    disabled={disabled}
                    value={!disabled ? data.phone : user.phone}
                    onChange={insertData}
                    name="phone"
                    placeholder="Phone"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={24}>
                  {user === -1 ? (
                    <Button onClick={updateUser}>Save</Button>
                  ) : (
                    <div>
                      {disabled ? (
                        <Button onClick={editUser}>Edit</Button>
                      ) : (
                        <Button loading={props.loading} onClick={updateUser}>
                          Update
                        </Button>
                      )}
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          ) : (
            <Skeleton active />
          )}
        </Col>
        {localStorage.getItem("user") === "student" && (
          <Col md={8}>
            <div className="right-side">
              <Title level={4}>Coming exam questions</Title>
              <Collapse>
                {props.exams &&
                  props.exams.map((ex) => (
                    <Panel
                      className="collapse-item"
                      header={
                        ex.settings && (
                          <div className="collapse-item_title">
                            <h4 className="collapse-item_title_inner">
                              {ex.settings.subject}
                            </h4>
                            <h4 className="collapse-item_title_inner">
                              {ex.settings.date}
                            </h4>
                          </div>
                        )
                      }
                      key="1"
                    >
                      <div>
                        <div className="collapse-item_title">
                          <h4 className="collapse-item_title_set">
                            Cabinet: {ex.settings.cabinet}
                          </h4>
                          <h4 className="collapse-item_title_set">
                            Duration: {ex.settings.duration}
                          </h4>
                          <h4 className="collapse-item_title_set">
                            Examiners: {ex.settings.examiners.join(", ")}
                          </h4>
                        </div>
                        <div className="collapse-item_list">
                          <List
                            size="small"
                            itemLayout="horizontal"
                            dataSource={ex.questions}
                            renderItem={(item) => (
                              <List.Item>
                                <List.Item.Meta description={item.name} />
                              </List.Item>
                            )}
                          />
                        </div>
                      </div>
                    </Panel>
                  ))}
              </Collapse>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    exams: state.exams.examsList,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  loadExams,
  getUsers,
  updateUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
