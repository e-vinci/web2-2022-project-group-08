/* eslint-disable no-unused-vars */
import HomePage from '../Pages/HomePage';
import Logout from '../Logout/Logout';
import RegisterPage from '../Pages/RegisterPage';
import Quizzs from '../Pages/Quizzs';
import userPage from '../Pages/userPage';
import ConfigQuizPage from '../Pages/ConfigQuizPage';
import AddQuizPage from '../Pages/AddQuizPage';

const routes = {
  '/': HomePage,
  '/login': RegisterPage,
  '/register': RegisterPage,
  '/Quizzs': Quizzs,
  '/logout': Logout,
  '/configurationQuiz' : ConfigQuizPage,
  '/users' : userPage,
  '/addQuiz' : AddQuizPage

};

export default routes;
