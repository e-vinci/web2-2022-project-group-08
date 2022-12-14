import { getRememberMe, setAuthenticatedUser, setRememberMe } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  clearPage();
  renderPageTitle();
  renderRegisterForm();
  renderLoginForm();
  renderTeacherForm();
};

function renderRegisterForm() {
  /*  student form  */
  const main = document.querySelector('main');
  const form = document.createElement('form');
  const registerTitle = document.createElement('h2');
  registerTitle.innerHTML = "S'enregistrer";
  main.appendChild(registerTitle);
  form.className = 'p-5';
  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'registerUsername';
  username.placeholder = 'email vinci';
  username.required = true;
  username.className = 'form-control mb-3';
  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'registerPassword';
  password.required = true;
  password.placeholder = 'password';
  password.className = 'form-control mb-3';
  const confirmationPassword = document.createElement('input');
  confirmationPassword.type = 'password';
  confirmationPassword.id = 'registerConfPassword';
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

}

function onCheckboxClicked(e) {
  setRememberMe(e.target.checked);
}

async function onRegister(e) {
  e.preventDefault();

  const mail = document.querySelector('#registerUsername').value;
  const registerPassword = document.querySelector('#registerPassword').value;
  const registerConfPassword = document.querySelector('#registerConfPassword').value;
  

  const options = {
    method: 'POST',
    body: JSON.stringify({
      mail,
      registerPassword,
      registerConfPassword,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/users/register`, options);
  const authenticatedUser = await response.json();

  try{
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
    // eslint-disable-next-line no-console
    console.log('Newly registered & authenticated user : ', authenticatedUser);

    setAuthenticatedUser(authenticatedUser);
    Navbar();
    Navigate('/');
  }catch(error){
    alert(authenticatedUser);
  }
  
}

function renderTeacherForm(){
    /*  teacher form  */
    const main = document.querySelector('main');
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

  Navbar();

  Navigate('/');
}


function renderLoginForm() {
  const main = document.querySelector('main');
  const title = document.createElement('h2')
  main.appendChild(title);
  title.innerHTML = "Se connecter"
  const loginForm = document.createElement('form');
  loginForm.className = 'p-5';
  const username = document.createElement('input');
  username.type = 'text';
  username.id = 'loginUsername';
  username.placeholder = 'username';
  username.required = true;
  username.className = 'form-control mb-3';
  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'loginPassword';
  password.required = true;
  password.placeholder = 'password';
  password.className = 'form-control mb-3';
  const submit = document.createElement('input');
  submit.value = 'Login';
  submit.type = 'submit';
  submit.className = 'btn btn-info';
  loginForm.appendChild(username);
  loginForm.appendChild(password);
  loginForm.appendChild(submit);
  main.appendChild(loginForm);
  loginForm.addEventListener('submit', onLogin);
}

async function onLogin(e) {
  e.preventDefault();

  const mail = document.querySelector('#loginUsername').value;
  const password = document.querySelector('#loginPassword').value;
  
  const options = {
    method: 'POST',
    body: JSON.stringify({
      mail,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/users/login`, options);
  const authenticatedUser = await response.json();
  try{
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      // eslint-disable-next-line no-console
      console.log('Newly registered & authenticated user : ', authenticatedUser);
      console.log('Authenticated user : ', authenticatedUser);

      setAuthenticatedUser(authenticatedUser);

      Navbar();
      

      Navigate('/');
  }catch (error){
    alert(authenticatedUser);
  }
}

export default RegisterPage;
