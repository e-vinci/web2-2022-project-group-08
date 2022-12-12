/* import { setAuthenticatedUser } from '../../utils/auths'; */
import { clearPage, renderPageTitle } from '../../utils/render';
/* import Navbar from '../Navbar/Navbar'; */
/* import Navigate from '../Router/Navigate'; */

const AddQuizPAge = () => {
  clearPage();
  renderPageTitle('Ajouter un nouveau Quizz');
  renderQuizForm();
  renderQuizQuestionForm();
};

function renderQuizForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const course = document.createElement('select')
  fetch('http://localhost:3000/index')
    .then((response) => response.json())
    .then((data) =>  {
      data.forEach(element => {
        course.innerHTML += `<option value = ${element.name}> ${element.name}</option>`
      });
      course.innerHTML += '<br>';
    }
  )
  const submit = document.createElement('input');
  submit.value = 'Ajouter';
  submit.type = 'submit';
  submit.className = 'btn btn-info';
  form.appendChild(course);
  form.appendChild(submit)
  main.appendChild(form);
  /* form.addEventListener('submit', onRegister); */

}


function renderQuizQuestionForm() {
    const main = document.querySelector('main');
    const title = document.createElement('h2');
    title.innerHTML = "Ajoutez les questions et les réponses"
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
    answer4.id = 'third_answer';
    answer4.placeholder = "Entrez la troisième réponse possible";
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



export default AddQuizPAge;
