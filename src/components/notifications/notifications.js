import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import firebase from "../../config/firebase";
import {
  Drawer,
  List,
  Button,
  Card,
  Popover,
  Input,
  DatePicker,
  Skeleton,
  Tag,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addNotification, expired, getNotifications } from "../../actions";
import "./style.sass";

const Notifications = (props) => {
  const currentUser =
    firebase.auth().currentUser && firebase.auth().currentUser.email;
  const [info, setInfo] = useState({
    message: "",
    date: "",
    key: new Date().getTime(),
  });

  useEffect(() => {
    props.getNotifications();
  }, []);

  useEffect(() => {
    props.notifications &&
      props.notifications.map(
        (item) =>
          moment(item.date).diff(moment().format("DD-MM-YYYY HH:mm:ss")) < 0 &&
          props.expired(item)
      );
  }, []);

  const setMessage = (e) => {
    setInfo({ ...info, message: e.target.value });
  };

  const setDate = (val) => {
    setInfo({
      ...info,
      date: val,
      user: firebase.auth().currentUser && firebase.auth().currentUser.email,
    });
  };

  const addNotification = () => {
    props.addNotification({
      ...info,
      date: moment(info.date).format("DD-MM-YYYY HH:mm:ss"),
    });
    setInfo({
      message: "",
      date: "",
      key: new Date().getTime(),
    });
  };

  return (
    <div className="notifications">
      <Drawer
        width={350}
        title={
          <div className="notifications_title">
            <h3 className="notifications_title_text">Notifications</h3>
            <Popover
              content={
                <div className="notification-add">
                  <Input
                    className="notification-add_item"
                    autoFocus
                    onChange={setMessage}
                    value={info.message}
                  />
                  <DatePicker
                    className="notification-add_item"
                    allowClear
                    showTime
                    value={info.date}
                    onChange={setDate}
                  />
                  <Button onClick={addNotification}>Add</Button>
                </div>
              }
              title="Add new"
              placement="bottomLeft"
              trigger="click"
            >
              <Button shape="circle" icon={<PlusOutlined />} />
            </Popover>
          </div>
        }
        placement="right"
        closable={false}
        onClose={() => props.setVisibleDrawer(false)}
        visible={props.visibleDrawer}
      >
        {props.notifications ? (
          <List
            grid={{ gutter: 4, column: 1 }}
            dataSource={props.notifications}
            renderItem={(item) => (
              <List.Item key={item.key}>
                <Card
                  size="small"
                  title={item.date}
                  extra={
                    item.user === currentUser && <Tag color="#55acee">me</Tag>
                  }
                >
                  {item.message}
                </Card>
              </List.Item>
            )}
          />
        ) : (
          Array.from({ length: 5 }).map((item, index) => (
            <Card key={index}>
              <Skeleton />
            </Card>
          ))
        )}
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
    loading: state.loading,
  };
};

const mapDispatchToProps = { getNotifications, addNotification, expired };
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
