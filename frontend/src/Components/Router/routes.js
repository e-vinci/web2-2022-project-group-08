/* eslint-disable no-unused-vars */
import HomePage from '../Pages/HomePage';
import Logout from '../Logout/Logout';
import RegisterPage from '../Pages/RegisterPage';
import ConfigQuiz from '../Pages/ConfigQuizPage';
import UserPage from '../Pages/UserPage';
import AddQuizPage from '../Pages/AddQuizPage'
import QuizPage from '../Pages/QuizPage';


const routes = {
  '/': HomePage,
  '/login': RegisterPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/configurationQuiz' : ConfigQuiz,
  '/users' : UserPage ,
  '/addQuiz' : AddQuizPage

};

export default routes;
