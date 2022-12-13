/* import { setAuthenticatedUser } from '../../utils/auths'; */
import { clearPage, renderPageTitle } from '../../utils/render';
/* import Navbar from '../Navbar/Navbar'; */
import Navigate from '../Router/Navigate'; 

let currentQuiz = {};
const ModifyQuizPage = (quiz) => {
  currentQuiz = quiz;
  clearPage();
  renderPageTitle('Quizz du cours :');
  renderQuizForm();
  renderQuizQuestionForm();
  renderExistingQuestions();
};

async function renderQuizForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  const title = document.createElement('h2');
  title.innerHTML = 'Modifier le cours';
  main.appendChild(title);
  form.className = 'p-5';
  const courses = document.createElement('select')
  fetch('http://localhost:3000/courses')
    .then((response) => response.json())
    .then((data) =>  {
      courses.id = 'courses';
      data.forEach(element => {

        if(element.course_id === currentQuiz.course) courses.innerHTML += `<option selected value = ${element.name}> ${element.name}</option>` /* modifier */
        else courses.innerHTML += `<option value = ${element.name}> ${element.name}</option>`
      });
    }
  )

  const submit = document.createElement('input');
  submit.value = 'Modifier';
  submit.type = 'submit';
  submit.className = 'btn btn-info';
  form.appendChild(courses);
  form.appendChild(submit)
  main.appendChild(form);
  /* form.addEventListener('submit', addQuizz); */

}



function renderQuizQuestionForm() {
    const main = document.querySelector('main');
    const title = document.createElement('h2');
    title.innerHTML = "Ajouter une question"
    main.appendChild(title);
    const form = document.createElement('form');
    form.className = 'p-5';
    const question = document.createElement('input');
    question.type = 'text';
    question.id = 'question';
    question.placeholder = "Entrez l'intitulé de la question";
    question.required = true;
    question.className = 'form-control mb-3';

    const answer1 = document.createElement('input');
    answer1.type = 'text';
    answer1.id = 'first_answer';
    answer1.placeholder = "Entrez la première réponse possible";
     /* answer1.required = true; */
    answer1.className = 'form-control mb-3';


    const answer2 = document.createElement('input');
    answer2.type = 'text';
    answer2.id = 'second_answer';
    answer2.placeholder = "Entrez la deuxième réponse possible";
     /* answer2.required = true; */
    answer2.className = 'form-control mb-3';

    const answer3 = document.createElement('input');
    answer3.type = 'text';
    answer3.id = 'third_answer';
    answer3.placeholder = "Entrez la troisième réponse possible";
   /* answer3.required = true; */
    answer3.className = 'form-control mb-3';

    const answer4 = document.createElement('input');
    answer4.type = 'text';
    answer4.id = 'fourth_answer';
    answer4.placeholder = "Entrez la quatrième réponse possible";
    /* answer4.required = true; */
    answer4.className = 'form-control mb-3';

    const submit = document.createElement('input');
    submit.value = 'Ajouter';
    submit.type = 'submit';
    submit.className = 'btn btn-info';
    form.appendChild(question)
    form.appendChild(answer1);
    form.appendChild(answer2);
    form.appendChild(answer3);
    form.appendChild(answer4);
    form.appendChild(submit)
    main.appendChild(form);
    form.addEventListener('submit', addQuestion); 
  
  }

  async function addQuestion(e) {
    e.preventDefault();
  
    const question = document.querySelector('#question').value;
    const quizID = currentQuiz.quizz_id;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        question,
        quizID
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const response = await fetch(`${process.env.API_BASE_URL}/questions`, options);
    const addedQuestion = await response.json();
    console.log(addedQuestion);
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    Navigate('/ModifyQuizPage');
    ModifyQuizPage(currentQuiz);
  }




function renderExistingQuestions(){
    const main = document.querySelector('main');
    const title = document.createElement('h2');
    title.innerHTML = "Modifier les questions existantes"
    main.appendChild(title);
    fetch(`http://localhost:3000/questions?quiz=${currentQuiz.quizz_id}`) /* remplacer par quiz.quizz_id */
    .then((response) => response.json())    
    .then((data) =>  {
      data.forEach(element => {
        const form = document.createElement('form');
        const questionTitle = document.createElement('h2');
        questionTitle.innerHTML = 'Question n°'
        main.appendChild(questionTitle);
        main.appendChild(form);
        form.className = 'p-5';
        const question = document.createElement('input');
        question.type = 'text';
        question.value = element.content;
        question.className = 'form-control mb-3';

        fetch(`http://localhost:3000/answers?question=${element.question_id}`)
        .then((response2) => response2.json())    
        .then((data2) =>  {
        form.appendChild(question);
        data2.forEach(element2 => {
            const answer = document.createElement('input');
            answer.type = 'text';
            answer.value = element2.content;
            answer.className = 'form-control mb-3';
            form.appendChild(answer);

        
      });
      const submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'Modifier';
        form.appendChild(submit);
    }
  )
      });
    }
  )
  .catch((error) => console.error("FETCH ERROR:", error));

}



export default ModifyQuizPage;
