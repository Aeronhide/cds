import firebase from "./config/firebase";

const db = firebase.firestore();
const themes = db.collection("themes");
const questions = db.collection("questions");
const answers = db.collection("answers");
const exams = db.collection("exams");
const exam = db.collection("exam");

export default {
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
  },
};
