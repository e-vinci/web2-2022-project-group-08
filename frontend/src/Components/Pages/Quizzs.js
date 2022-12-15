// import { setAuthenticatedUser } from '../../utils/auths';
// import { clearPage, renderPageTitle } from '../../utils/render';
// import Navbar from '../Navbar/Navbar';
// import Navigate from '../Router/Navigate';
import { readAllQuizz , readRightAnswer } from '../../models/movies';
import { isAuthenticated } from '../../utils/auths';



const ViewQuestionPage = async () => {
  const userAuthenticated = isAuthenticated();

  const main = document.createElement('main');
  
  main.innerHTML = '<div id="movieWrapper"></div>';

  const questionWrapper = document.querySelector('#movieWrapper');

  const quizz = await readAllQuizz();

  const moviesAsHtmlTable = userAuthenticated ? renderQuizzForm(quizz) : undefined ;

  questionWrapper.innerHTML = moviesAsHtmlTable;
  main.appendChild(questionWrapper);
};

function renderQuizzForm(quizz) {
  if (quizz === undefined) {
    return '<p class="p-5">No quizz yet : (</p>';
  }
  const  htmlQuestions = document.querySelector('main');

  quizz.questions.forEach(element => {
    const div = document.createElement('div');
    htmlQuestions.appendChild(div);
    div.className='center';
    div.innerHTML= `<tr> <th> ${element.content} </th> </tr>`;
    htmlQuestions.appendChild(readAnswersQuestions(element.question_id, quizz.answers));  
  });
 return htmlQuestions;
  };


  function readAnswersQuestions(idQuestion, answers){
    const  htmlAnswers = document.createElement('table');
    const goodAnswer = readRightAnswer(idQuestion);
   
    answers.forEach(answerTable =>{
     
      answerTable.forEach(answer => {
        if(answer.question === idQuestion){
          htmlAnswers.appendChild(checkRightAnswer(answer, goodAnswer));
        }
      });
      
    });
   
    return htmlAnswers;
  }


function checkRightAnswer(rep, goodAnswer){
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  // const main = document.querySelector('main');
  td.id=rep.answers_id;
  td.innerText = rep.content;  
  tr.appendChild(td);
  td.class = 'message';
 
  // main.appendChild(divRep);
  td.addEventListener('onclick',()=>{
   if(rep.answers_id === goodAnswer.answers_id ){
     td.className = 'btn btn-success';
   }else{
     td.class = 'btn btn-danger';
     const message = document.querySelector('.message');
     message.textContent = goodAnswer.good_answer_feedback
    //  alert(goodAnswer.good_answer_feedback);
   }
  });
 
  return tr;
}
  const Quizzs = () =>{
    ViewQuestionPage();
  }
export default Quizzs;

  