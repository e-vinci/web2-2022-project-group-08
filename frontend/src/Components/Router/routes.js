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


const routes = {
  '/': HomePage,
  '/login': RegisterPage,
  '/register': RegisterPage,
  '/quizPage': QuizPage,
  '/logout': Logout,
  '/configurationQuiz' : ConfigQuizPage,
  '/users' : userPage,
  '/addQuiz' : AddQuizPage,
<<<<<<< HEAD
  '/admins' : AdminPage
=======
  '/admins' : AdminPage,
  '/modifyQuizPage' : ModifyQuizPage
>>>>>>> 279b60a559fd448409c60037769ff1e6d16dee5d

};

export default routes;
