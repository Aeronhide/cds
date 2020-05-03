import firebase from "./config/firebase";

const db = firebase.firestore();
const themes = db.collection("themes");
const questions = db.collection("questions");
const answers = db.collection("answers");
const exams = db.collection("exams");
const exam = db.collection("exam");
const not = db.collection("notifications");
const schedule = db.collection("schedule");

export default {
  login: {
    signIn: (data) =>
      firebase
        .auth()
        .signInWithEmailAndPassword(`${data.username}`, `${data.password}`),
    signOut: () => firebase.auth().signOut(),
  },
  themes: {
    getThemes: () => themes.get(),
    addTheme: (theme) => themes.doc(`${theme.key}`).set(theme),
    updateTheme: (theme) =>
      themes.doc(`${theme.key}`).update({
        name: theme.name,
      }),
    deleteTheme: (theme) => themes.doc(`${theme}`).delete(),
  },
  questions: {
    getTheme: (key) => themes.doc(`${key}`).get(),
    getQuestions: () => questions.get(),
    addQuestion: (question) => questions.doc(`${question.key}`).set(question),
    updateQuestion: (question) =>
      questions.doc(`${question.key}`).update({
        name: question.name,
      }),
    deleteQuestion: (key) => questions.doc(`${key}`).delete(),
  },
  answers: {
    getAnswers: () => answers.get(),
    addAnswer: (answer) => answers.doc(`${answer.key}`).set(answer),
    updateAnswer: (answer) =>
      answers.doc(`${answer.key}`).update({
        name: answer.name,
        isTrue: answer.isTrue,
      }),
    deleteAnswer: (answer) => answers.doc(`${answer}`).delete(),
  },
  exams: {
    createExam: (data) => exams.doc(`${data.key}`).set(data),
    loadExams: () => exams.get(),
    deleteExam: (exam) => exams.doc(`${exam.key}`).delete(),
  },
  exam: {
    selectExam: (data) => exam.doc("1").set(data),
    getExam: () => exam.get(),
    startExam: (time) =>
      exam.doc("1").update({ started: true, startedTime: time }),
  },
  notifications: {
    getNotifications: () => not.get(),
    addNotification: (n) => not.doc(`${n.key}`).set(n),
    expired: (n) => not.doc(`${n.key}`).delete(),
  },
  schedule: {
    getSchedule: () => schedule.get(),
    addLesson: (lesson) => schedule.doc(`${lesson.key}`).set(lesson),
  },
};
