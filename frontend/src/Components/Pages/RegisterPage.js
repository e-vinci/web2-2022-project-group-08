import { getRememberMe, setAuthenticatedUser, setRememberMe } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  clearPage();
  renderPageTitle('Register');
  renderRegisterForm();
};

function renderRegisterForm() {
  /*  student form  */
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'username';
  username.placeholder = 'email vinci';
  username.required = true;
  username.className = 'form-control mb-3';
  const password = document.createElement('input');
  password.type = 'mot de passe ';
  password.id = 'password';
  password.required = true;
  password.placeholder = 'password';
  password.className = 'form-control mb-3';
  const confirmationPassword = document.createElement('input');
  confirmationPassword.type = 'mot de passe ';
  confirmationPassword.id = 'confPassword';
  confirmationPassword.required = true;
  confirmationPassword.placeholder = 'confirmez votre mot de passe ';
  confirmationPassword.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Register';
  submit.type = 'submit';
  submit.className = 'btn btn-info';
  const formCheckWrapper = document.createElement('div');
  formCheckWrapper.className = 'mb-3 form-check';
  const rememberme = document.createElement('input');
  rememberme.type = 'checkbox';
  rememberme.className = 'form-check-input';
  rememberme.id = 'rememberme';
  const remembered = getRememberMe();
  rememberme.checked = remembered;
  rememberme.addEventListener('click', onCheckboxClicked);
  const checkLabel = document.createElement('label');
  checkLabel.htmlFor = 'rememberme';
  checkLabel.className = 'form-check-label';
  checkLabel.textContent = 'Remember me';

  formCheckWrapper.appendChild(rememberme);
  formCheckWrapper.appendChild(checkLabel);

  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(confirmationPassword);
  form.appendChild(formCheckWrapper);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', onRegister);

  /*  teacher form  */
  const title = document.createElement('h2')
  main.appendChild(title);
  title.innerHTML = "Formulaire d'enregistrement d'un professeur"
  const teacherForm = document.createElement('form');
  teacherForm.className = 'p-5';
  const teacherUsername = document.createElement('input');
  teacherUsername.type = 'text';
  teacherUsername.id = 'teacherUsername';
  teacherUsername.placeholder = 'email vinci';
  teacherUsername.required = true;
  teacherUsername.className = 'form-control mb-3';
  const teacherSubmit = document.createElement('input');
  teacherSubmit.value = 'Enregistrer un nouveau professeur';
  teacherSubmit.type = 'submit';
  teacherSubmit.className = 'btn btn-info';

  teacherForm.appendChild(teacherUsername);
  teacherForm.appendChild(teacherSubmit);
  main.appendChild(teacherForm);
  teacherForm.addEventListener('submit', onRegisterForTeacher);
}

function onCheckboxClicked(e) {
  setRememberMe(e.target.checked);
}

async function onRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const confirmationPassword = document.querySelector('#confPassword').value;
  

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      confirmationPassword,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/users/register`, options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Newly registered & authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}



async function onRegisterForTeacher(e) {
  e.preventDefault();

  const teacherUsername = document.querySelector('#teacherUsername').value;
  

  const options = {
    method: 'POST',
    body: JSON.stringify({
      teacherUsername,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/users/registerTeacher`, options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Newly registered & authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}

export default RegisterPage;
