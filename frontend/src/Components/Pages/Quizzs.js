// import { setAuthenticatedUser } from '../../utils/auths';
// import { clearPage, renderPageTitle } from '../../utils/render';
// import Navbar from '../Navbar/Navbar';
// import Navigate from '../Router/Navigate';
import { readAllQuizz  } from '../../models/movies';
import { isAuthenticated } from '../../utils/auths'; 
/* import { clearPage } from '../../utils/render'; */


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
 
  const  htmlQuestions = document.querySelector('main');

  quizz.forEach(element => {
   // const goodAnswer = readRightAnswer(element.question_id );
    const div = document.createElement('div');
    console.log('herer');
    console.log(element);
    htmlQuestions.appendChild(div);
    div.className='center';
    div.innerHTML= `<tr> <th> ${element.content} </th> </tr>`;
    htmlQuestions.appendChild();  
  });
 return htmlQuestions;
  };






 
  
  const Quizzs = () =>{
    ViewQuestionPage();
  }
export default Quizzs;





































/* const Quizzs = async () => {
  clearPage();
  const main = document.querySelector('main');
  const title = document.createElement('h2');
  title.innerHTML = 'Répondez aux questions'
  main.appendChild(title);
  renderQuizzForm();
 
};

async function renderQuizzForm(){
  const questions = await readAllQuizz();
  const main = document.querySelector('main');

  questions.forEach(question => { 
      const questionContainer = document.createElement('div');
      questionContainer.innerHTML += question.content;
        question.reponses.forEach(reponse => {
        questionContainer.innerHTML += reponse.content;
        });
        main.appendChild(questionContainer);
  });
  



} */

/* async function renderQuizzForm() {
 
  };

  const questions = await readAllQuizz();
  console.log(questions)
  const main = document.querySelector('main');

  let timeoutID;

  const delayInMiliSeconds = 15 * 1000;

  const  questionContainer = document.createElement('div');
  questionContainer.id = 'questionContainer';
  let goodAnswer ;

  const button = document.createElement('button');
  

  questions.forEach(question => {
    
    goodAnswer = readRightAnswer(question.question_id);
    questionContainer.innerHTML= question.content;

      question.reponses.forEach(reponse =>{
        const div = document.createElement('div');
        div.id = reponse.answers_id ;

        questionContainer.appendChild(div);
        button.innerHTML = reponse.content
        div.appendChild(button);
        main.appendChild(div);
        main.appendChild(questionContainer);
        console.log(div);
        
            
    }); 
    const divRep = document.querySelector('div');
    
  
   setTimeout(() => {
        button.addEventListener('click', () => {
          if (goodAnswer.answers_id === divRep.id) {
             button.click = "changeColor('green')";
             clearTimeout(timeoutID);
          }
      });
    }, delayInMiliSeconds); 
  });
  main.appendChild(questionContainer);
 return  questionContainer; */
 

  