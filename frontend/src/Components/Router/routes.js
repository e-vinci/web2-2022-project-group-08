/* eslint-disable no-unused-vars */
import HomePage from '../Pages/HomePage';
import Logout from '../Logout/Logout';
import RegisterPage from '../Pages/RegisterPage';
import ConfigQuiz from '../Pages/ConfigQuizPage';
<<<<<<< HEAD
import UserPage from '../Pages/UserPage';
=======
import userPage from '../Pages/userPage';
import AddQuizPage from '../Pages/AddQuizPage'
>>>>>>> 25e79eaf35acc70769c28dfeb3872767d3cc9669


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
