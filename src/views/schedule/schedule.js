import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import firebase from "../../config/firebase";
import {
  Calendar,
  Timeline,
  Button,
  Popover,
  Input,
  DatePicker,
  List,
} from "antd";
import { getSchedule, addlesson } from "../../actions";
import "./style.sass";
import ModalSchedule from "./components/modal";

const Schedule = (props) => {
  const [data, setData] = useState({
    day: "",
    date: "",
    list: [],
    teacher: "",
  });
  const [lesson, setLesson] = useState("");
  const [date, setDate] = useState("");
  const [visiblePop, setVisiblePop] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(moment);

  useEffect(() => {
    props.getSchedule();
  }, []);

  const add = () => {
    setData({
      key: moment(date).format("DD-MM-YYYY"),
      day: moment(date).format("D"),
      date: moment(date).format("DD-MM-YYYY HH:ss:mm"),
      list: [...data.list, { lesson }],
      teacher: firebase.auth().currentUser && firebase.auth().currentUser.email,
    });
    setLesson("");
  };

  const save = () => {
    props.addlesson(data);
    setVisiblePop(false);
  };

  const openModal = (day) => {
    setSelectedDay(day);
    setVisibleModal(true);
  };

  const dateCellRender = (value) => {
    return (
      <div>
        {props.schedule.length &&
          props.schedule.map(
            (item) =>
              parseInt(item.day, 10) === value.date() && (
                <Timeline key={item.date} className="timeline">
                  {item.list.map((les) => (
                    <Timeline.Item key={les.lesson} className="timeline_item">
                      {les.lesson}
                    </Timeline.Item>
                  ))}
                </Timeline>
              )
          )}
      </div>
    );
  };

  return (
    <div>
      <ModalSchedule
        visibleModal={visibleModal}
        day={selectedDay}
        setVisibleModal={setVisibleModal}
      />
      <Popover
        content={
          <div className="add-lesson">
            <DatePicker
              className="add-lesson_item"
              allowClear
              showTime
              value={date}
              onChange={(e) => setDate(e)}
            />
            <Input
              className="add-lesson_item"
              autoFocus
              onChange={(e) => setLesson(e.target.value)}
              onKeyDown={(e) => e.keyCode === 13 && add()}
              value={lesson}
            />
            <List
              className="add-lesson_item"
              dataSource={data.list}
              renderItem={(item) => (
                <List.Item>
                  <div>{item.lesson}</div>
                </List.Item>
              )}
            />
            <Button onClick={add} className="add-lesson_item">
              Add
            </Button>
            <Button onClick={save} className="add-lesson_item" type="primary">
              Save
            </Button>
            <Button
              onClick={() => setVisiblePop(false)}
              className="add-lesson_item"
              type="default"
            >
              Cancel
            </Button>
          </div>
        }
        title="Add new lesson"
        placement="bottomLeft"
        trigger="click"
        visible={visiblePop}
      >
        <Button onClick={() => setVisiblePop(true)} type="primary">
          Add lessons
        </Button>
      </Popover>
      <Calendar
        className="schedule"
        dateCellRender={dateCellRender}
        onSelect={openModal}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    schedule: state.schedule,
    loading: state.loading,
  };
};

const mapDispatchToProps = { getSchedule, addlesson };
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
