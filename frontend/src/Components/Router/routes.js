/* eslint-disable no-unused-vars */
import HomePage from '../Pages/HomePage';
import Logout from '../Logout/Logout';
import RegisterPage from '../Pages/RegisterPage';
import QuizPage from '../Pages/QuizPage';
import userPage from '../Pages/userPage';
import ConfigQuizPage from '../Pages/ConfigQuizPage';
import AddQuizPage from '../Pages/AddQuizPage';
import AdminPage from '../Pages/AdminPage';
import ModifyQuizPage from '../Pages/ModifyQuizPage';
import TeacherPage from '../Pages/TeacherPage';


const routes = {
  '/': HomePage,
  '/login': RegisterPage,
  '/register': RegisterPage,
  '/quizPage': QuizPage,
  '/logout': Logout,
  '/configurationQuiz' : ConfigQuizPage,
  '/users' : userPage,
  '/addQuiz' : AddQuizPage,
  '/admins' : AdminPage,
  '/modifyQuizPage' : ModifyQuizPage,
  '/teachers' : TeacherPage
};

export default routes;
