// import { setAuthenticatedUser } from '../../utils/auths';
// import { clearPage, renderPageTitle } from '../../utils/render';
// import Navbar from '../Navbar/Navbar';
// import Navigate from '../Router/Navigate';
import { readAllQuizz } from '../../models/movies';
import { isAuthenticated } from '../../utils/auths';



const ViewQuestionPage = async () => {
  const userAuthenticated = isAuthenticated();
  const main = document.querySelector('main');
  main.innerHTML = '<div id="movieWrapper"></div>';

  const questionWrapper = document.querySelector('#movieWrapper');

  const quizz = await readAllQuizz();

  const moviesAsHtmlTable = userAuthenticated ? renderQuizzForm(quizz) : undefined ;

  questionWrapper.innerHTML = moviesAsHtmlTable;
};


function readAnswersQuestions(answers, idQuestion){
  let htmlAnswers = `<div>`;
  
  answers.forEach(answerTable =>{
    answerTable.forEach(answer => {
      if(answer.question === idQuestion){
        htmlAnswers += ` <tr>
          <th scope="col">${answer.content}</th>
        </tr> 
        <div>` ;
      }
    });
    
  })
  console.log(htmlAnswers);
  return htmlAnswers;

}

function renderQuizzForm(quizz) {
  if (quizz === undefined) {
    return '<p class="p-5">No movies yet : (</p>';
  }
  let htmlMovieTable = `<div class="table-responsive p-5">`;
 
  quizz.questions.forEach(element => {
      htmlMovieTable +=` 
  <table class="table">
<thead>
  <tr>
    <th scope="col">${element.content}</th>
  </tr> 
  <tr>` 

  htmlMovieTable += readAnswersQuestions(quizz.answers, element.question_id);
  
  htmlMovieTable += `</tr>
    </thead>
    <tbody>`;
  });

 return htmlMovieTable;
  };

  const Quizzs = () =>{
    ViewQuestionPage();
  }
export default Quizzs;

  