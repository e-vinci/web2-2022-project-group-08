/* import { setAuthenticatedUser } from '../../utils/auths'; */
import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';
/* import Navbar from '../Navbar/Navbar'; */
import QuizPage from './QuizPage';

const AddQuizPAge = () => {
  clearPage();
  renderPageTitle('Ajouter un nouveau Quizz');
  renderQuizForm();
};

function renderQuizForm() {
  const main = document.querySelector('main');
  const title = document.createElement('h3');
  title.innerHTML = "Sélectionnez pour quel cours vous voulez créer un quizz"
  main.appendChild(title);
  const warning = document.createElement('p');
  warning.innerHTML = "Attention, vous ne pouvez créer un quizz que dans les cours où il n'en existe pas. Si vous voulez modifier un quizz existant rendez vous sur cette page.";
  main.append(warning);
  const form = document.createElement('form');
  form.className = 'p-5';
  const courses = document.createElement('select')
  courses.id = 'courses';
  fetch('http://localhost:3000/courses')
    .then((response) => response.json())
    .then((data) =>  {
      data.forEach(element => {
        courses.innerHTML += `<option value = ${element.name}> ${element.name}</option>`
      });
    }
  )
  const submit = document.createElement('input');
  submit.value = 'Ajouter';
  submit.type = 'submit';
  submit.className = 'btn btn-info';
  form.appendChild(courses);
  form.appendChild(submit)
  main.appendChild(form);
  form.addEventListener('submit', addQuizz); 

}


async function addQuizz(e) {
    e.preventDefault();
    const courses = document.querySelector('#courses');
    const selectedCourse = courses.value;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        selectedCourse
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const response = await fetch(`${process.env.API_BASE_URL}/quiz`, options);
    const addedQuiz = await response.json();
  
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    Navigate('/QuizPage');
    QuizPage(addedQuiz);
  }


export default AddQuizPAge;
