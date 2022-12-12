/* eslint-disable no-unused-vars */
import HomePage from '../Pages/HomePage';
import Logout from '../Logout/Logout';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import ConfigQuiz from '../Pages/ConfigQuizPage';
import UserPage from '../Pages/UserPage';


const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/logout': Logout,
  '/configurationQuiz' : ConfigQuiz,
  '/users/userAccount' : UserPage 
  

};

export default routes;
