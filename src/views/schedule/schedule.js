import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import firebase from "../../config/firebase";
import { Calendar, Timeline } from "antd";
import { getSchedule, addEvent } from "../../actions";
import ModalSchedule from "./components/modal";
import PopLesson from "./components/popLesson";
import PopExam from "./components/popExam";
import "./style.sass";

const Schedule = (props) => {
  const [data, setData] = useState({
    day: "",
    date: "",
    list: [],
    teacher: "",
  });
  const [dataExam, setDataExam] = useState({
    day: "",
    date: "",
    subject: "",
    teacher: "",
  });
  const [lesson, setLesson] = useState({
    name: "",
    time: "",
  });
  const [date, setDate] = useState("");
  const [visiblePop, setVisiblePop] = useState(false);
  const [visiblePopExam, setVisiblePopExam] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(moment);

  const subjects = [
    { key: 1, name: "Java" },
    { key: 2, name: "Android" },
    { key: 3, name: "Javascript" },
    { key: 4, name: "Law" },
    { key: 5, name: "Mathematics" },
  ];

  useEffect(() => {
    props.getSchedule();
  }, []);

  const addLesson = () => {
    setData({
      key: moment(date).format("DD-MM-YYYY"),
      day: moment(date).format("D"),
      type: "lesson",
      date: moment(date).format("DD-MM-YYYY HH:ss:mm"),
      list: [
        ...data.list,
        { ...lesson, time: moment(lesson.time).format("HH:mm:ss") },
      ],
      teacher: firebase.auth().currentUser && firebase.auth().currentUser.email,
    });
    setLesson({ name: "", time: "" });
  };

  const saveLesson = () => {
    props.addEvent(data);
    setDate("");
    setVisiblePop(false);
  };

  const saveExam = () => {
    props.addEvent({
      ...dataExam,
      teacher: firebase.auth().currentUser && firebase.auth().currentUser.email,
      key: moment(date).format("DD-MM-YYYY"),
      day: moment(date).format("D"),
      type: "exam",
      date: moment(date).format("DD-MM-YYYY HH:ss:mm"),
    });
    setVisiblePopExam(false);
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
              parseInt(item.day, 10) === value.date() &&
              (item.type === "lesson" ? (
                <Timeline key={item.day} className="timeline">
                  {item.list.map((les) => (
                    <Timeline.Item key={les.name} className="timeline_item">
                      {les.name}
                    </Timeline.Item>
                  ))}
                </Timeline>
              ) : (
                <div className="exam-day" key={item.key}>
                  <h3>{item.subject}</h3>
                  <span>
                    {moment(item.date, "DD-MM-YYYY HH:mm:ss").format(
                      "HH:mm:ss"
                    )}
                  </span>
                </div>
              ))
          )}
      </div>
    );
  };

  return (
    <div className="schedule">
      <ModalSchedule
        visibleModal={visibleModal}
        day={selectedDay}
        setVisibleModal={setVisibleModal}
      />
      <div className="schedule_actions">
        <PopLesson
          sendEvent={props.addEvent}
          addLesson={addLesson}
          visiblePop={visiblePop}
          setVisiblePop={setVisiblePop}
          date={date}
          setDate={setDate}
          lesson={lesson}
          setLesson={setLesson}
          data={data}
          saveLesson={saveLesson}
        />
        <PopExam
          visiblePopExam={visiblePopExam}
          setVisiblePopExam={setVisiblePopExam}
          saveLesson={saveLesson}
          addEvent={saveExam}
          subjects={subjects}
          date={date}
          setDate={setDate}
          saveExam={saveExam}
          data={dataExam}
          setDataExam={setDataExam}
        />
      </div>
      <Calendar
        className="schedule_calendar"
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

const mapDispatchToProps = { getSchedule, addEvent };
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
