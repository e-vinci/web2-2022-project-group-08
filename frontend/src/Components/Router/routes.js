/* eslint-disable no-unused-vars */
import HomePage from '../Pages/HomePage';
import Logout from '../Logout/Logout';
import RegisterPage from '../Pages/RegisterPage';
import ConfigQuiz from '../Pages/ConfigQuizPage';
import userPage from '../Pages/UserPage';
import AddQuizPage from '../Pages/AddQuizPage'


const routes = {
  '/': HomePage,
  '/login': RegisterPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/configurationQuiz' : ConfigQuiz,
  '/userAccount' : userPage ,
  '/addQuiz' : AddQuizPage

};

export default routes;
