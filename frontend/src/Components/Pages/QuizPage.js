/* import { setAuthenticatedUser } from '../../utils/auths'; */
import { clearPage, renderPageTitle } from '../../utils/render';
/* import Navbar from '../Navbar/Navbar'; */
/* import Navigate from '../Router/Navigate'; */

const QuizPage = () => {
  clearPage();
  renderPageTitle('Quizz');
  renderQuizForm();
  renderQuizQuestionForm();
  renderExistingQuestion();
};

function renderQuizForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  const title = document.createElement('h2');
  title.innerHTML = 'Modifier le cours';
  main.appendChild(title);
  form.className = 'p-5';
  const courses = document.createElement('select')
  courses.id = 'courses';
  fetch('http://localhost:3000/index')
    .then((response) => response.json())
    .then((data) =>  {
      data.forEach(element => {
        courses.innerHTML += `<option value = ${element.name}> ${element.name}</option>`
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
  form.addEventListener('submit', addQuizz); 

}


async function addQuizz(e) {
    e.preventDefault();
  
    const courses = document.querySelector('#course');
    const selectedIndex = courses.selectedIndex();
    const selectedCourse = courses.options[selectedIndex];
    const options = {
      method: 'POST',
      body: JSON.stringify({
        selectedCourse
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const response = await fetch(`${process.env.API_BASE_URL}/quiz/add`, options);
  
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  
    const authenticatedUser = await response.json();
  
    // eslint-disable-next-line no-console
    console.log('Newly registered & authenticated user : ', authenticatedUser);
    /*
    setAuthenticatedUser(authenticatedUser);
  
    Navbar();
  
    Navigate('/');
    */
  }


function renderQuizQuestionForm() {
    const main = document.querySelector('main');
    const title = document.createElement('h2');
    title.innerHTML = "Ajoutez une question"
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
    answer1.required = true;
    answer1.className = 'form-control mb-3';


    const answer2 = document.createElement('input');
    answer2.type = 'text';
    answer2.id = 'second_answer';
    answer2.placeholder = "Entrez la deuxième réponse possible";
    answer2.required = true;
    answer2.className = 'form-control mb-3';

    const answer3 = document.createElement('input');
    answer3.type = 'text';
    answer3.id = 'third_answer';
    answer3.placeholder = "Entrez la troisième réponse possible";
    answer3.required = true;
    answer3.className = 'form-control mb-3';

    const answer4 = document.createElement('input');
    answer4.type = 'text';
    answer4.id = 'fourth_answer';
    answer4.placeholder = "Entrez la quatrième réponse possible";
    answer4.required = true;
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
    /* form.addEventListener('submit', onRegister); */
  
  }

function renderExistingQuestion(){
    const main = document.querySelector('main');
    const title = document.createElement('h2');
    title.innerHTML = "Modifier les questions existantes"
    main.appendChild(title);
    fetch('http://localhost:3000/quiz/questions')
    .then((response) => response.json())    
    .then((data) =>  {
      data.forEach(element => {
        const form = document.createElement('form');
        const titleq = document.createElement('h2');
        titleq.innerHTML = 'Question n°'
        main.appendChild(titleq);
        main.appendChild(form);
        form.className = 'p-5';
        const question = document.createElement('input');
        question.type = 'text';
        question.value = element.content;
        question.className = 'form-control mb-3';

        fetch('http://localhost:3000/quiz/answers')
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



export default QuizPage;
