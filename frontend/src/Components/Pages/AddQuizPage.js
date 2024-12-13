/* import { setAuthenticatedUser } from '../../utils/auths'; */
import { getAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';
/* import Navbar from '../Navbar/Navbar'; */

// eslint-disable-next-line import/no-unresolved
const Swal = require('sweetalert2');

const AddQuizPAge = () => {
  const user = getAuthenticatedUser();
  console.log(user);
  console.log(user.isTeacher);
  if(!user.isTeacher) {
    alert("Vous n'avez pas l'autorisation");
    return;
  }
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
  warning.innerHTML = "Attention, vous ne pouvez créer un quizz que dans les cours où il n'en existe pas. Si vous voulez modifier un quizz existant rendez vous sur votre page personnelle.";
  main.append(warning);
  const form = document.createElement('form');
  form.className = 'p-5';
  const courses = document.createElement('select')
  courses.id = 'courses';
  fetch(`${process.env.API_BASE_URL}/courses`)
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
    try{
      if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      Navigate('/modifyQuizPage', addedQuiz);
    }catch(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${addedQuiz}`,
      })
    }
  }


export default AddQuizPAge;
