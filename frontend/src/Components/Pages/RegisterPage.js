/* eslint-disable no-unused-vars */
import { getRememberMe, setAuthenticatedUser, setRememberMe } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const RegisterPage = () => {
  clearPage();
  renderPageTitle();
  renderRegisterForm();
  renderLoginForm();
};

function renderRegisterForm() {
  /*  student form  */
  const main = document.querySelector('main');
  const container = document.createElement('container');
  const maDiv = document.createElement('div');
  maDiv.className='row justify-content-around';
  maDiv.id = 'maDiv'
  const maDiv2 = document.createElement('div');
  maDiv2.className= 'col-5';
  const form = document.createElement('form');
  form.className='registerForm'
  const rememberme = document.createElement('input');
  const remembered = getRememberMe();
  rememberme.checked = remembered;
  rememberme.addEventListener('click', onCheckboxClicked);
  maDiv2.appendChild(form);
  maDiv.appendChild(maDiv2);
  container.appendChild(maDiv);
  main.appendChild(container);

  form.innerHTML=
  ` 
  <div class="container-fluid py-3 h-100">
    <div class="row d-flex  align-items-center h-100">
      <div class="col-12 ">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body px-5 py-2 text-center">

            <div class="mb-md-5 mt-md-4 pb-1">

              <h2 class="fw-bold mb-2 text-uppercase">Inscrivez-vous</h2>
              <p class="text-white-50 mb-5">Entrez votre email et votre mot de passe!</p>

              <div class="form-outline form-white mb-2">
                <input type="email" id="registerUsername" class="form-control form-control-lg" placeholder = "email vinci" required = true/>
                <label class="form-label" for="registerUsername"></label>
              </div>

              <div class="form-outline form-white mb-2">
                <input type="password" id="registerPassword" class="form-control form-control-lg" placeholder = "mot de passe" required = true/>
                <label class="form-label" for="registerPassword"></label>
              </div>

            <div class="form-outline form-white mb-2">
              <input type="password" id="registerConfPassword" class="form-control form-control-lg" placeholder = "confimez votre mot de passe" required = true/>
              <label class="form-label" for="registerConfPassword"></label>
            </div>

             
           
              <div class="mb-3 form-check">
                 <input type="checkbox" id="rememberme" class="form-check-input" checked="${getRememberMe()}"/>
              <label class="form-check-label" for="rememberme">Remember me</label>
              </div>

              <button class="btn btn-outline-light btn-lg px-5" type="submit" value="Register">S'inscrire</button>

            </div>

          </div>
        </div>
      </div>
      </div>
  </div>
` 




  form.addEventListener('submit', onRegister);

}

// eslint-disable-next-line no-unused-vars
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


function renderLoginForm() {
  const maDiv = document.getElementById('maDiv');
  const maDiv2 = document.createElement('div');
  maDiv2.className= 'col-5';
  const loginForm = document.createElement('form');
  loginForm.className='loginform';
  maDiv2.appendChild(loginForm);
  maDiv.appendChild(maDiv2);
  loginForm.addEventListener('submit', onLogin);

  loginForm.innerHTML=
  ` 
  <div class="container-fluid py-3 h-100">
    <div class="row d-flex align-items-center h-100">
      <div class="col-12">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body px-5 py-3 text-center">

            <div class="mb-md-5 mt-md-4 pb-1 ">

              <h2 class="fw-bold mb-2 text-uppercase">Connectez-vous</h2>
              <p class="text-white-50 mb-5">Entrez votre email et votre mot de passe!</p>

              <div class="form-outline form-white mb-4">
                <input type="email" id="loginUsername" class="form-control form-control-lg" placeholder = "email" required = true/>
                <label class="form-label" for="loginUsername"></label>
              </div>

              <div class="form-outline form-white mb-4">
                <input type="password" id="loginPassword" class="form-control form-control-lg" placeholder = "mot de passe" required = true/>
                <label class="form-label" for="loginPassword"></label>
              </div>


              <button class="btn btn-outline-light btn-lg px-5 " type="submit" value="Se connecter">Login</button>



            </div>

          </div>
        </div>
      </div>
    </div>
    </div>
 ` 
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
