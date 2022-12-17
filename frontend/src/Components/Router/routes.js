/* eslint-disable no-unused-vars */

import Logout from '../Logout/Logout';
import RegisterPage from '../Pages/RegisterPage';
import HomePage from '../Pages/HomePage';
import QuizPage from '../Pages/quizPage';
import userPage from '../Pages/userPage';
import ConfigQuizPage from '../Pages/ConfigQuizPage';
import AddQuizPage from '../Pages/AddQuizPage';
import AdminPage from '../Pages/AdminPage';
import ModifyQuizPage from '../Pages/ModifyQuizPage';


const routes = {
  '/login': RegisterPage,
  '/register': RegisterPage,
  '/': HomePage,
  '/quizPage': QuizPage,
  '/logout': Logout,
  '/configurationQuiz' : ConfigQuizPage,
  '/users' : userPage,
  '/addQuiz' : AddQuizPage,
  '/admin' : AdminPage,
  '/modifyQuizPage' : ModifyQuizPage

};

export default routes;
