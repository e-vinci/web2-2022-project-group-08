/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import img from '../../img/Logo_bootstrap.png';
import homeLogo from '../../img/home.png';



const SITE_NAME = 'IPLearn';

const Navbar = () => {
  renderNavbar();
};


function renderNavbar() {
  const authenticatedUser = getAuthenticatedUser();

          // <a class="navbar-brand" href="#">${SITE_NAME}</a>

         // style="margin-left: 50%
        // CENTRER LOGO EN UTILISANT BOOTSTRAP (RESPONSIVE)
  const anonymousUserNavbar = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
  <div class="col-3" id="logo">
            <img class="" src="${img}" alt="" style="width:70%; height:auto"></a>
  </div>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent" >
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="#" data-uri="/"> <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16" style="color: white" data-uri="/" >
      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
      <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
    </svg>  HOME</a>
    </li>            
    
    <li id="userAccountItem" class="nav-item">
      <a class="nav-link" href="" data-uri="/register"> <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16" style="color: white" data-uri="register">
      <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
      <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
    </svg> INSCRIVEZ-VOUS / CONNECTEZ-VOUS</a>
    </li>    
         
  </ul>
    </div>
  </div>
</nav>
`;

  const authenticatedUserNavbar = `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
        <div class="col-3" id="logo">
                  <img class="" src="${img}" alt="" style="width:70%; height:auto"></a>
        </div>
          
          <div class="collapse navbar-collapse" id="navbarSupportedContent" >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" data-uri="/"> <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16" style="color: white" data-uri="/" >
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
          </svg> HOME</a>
          </li>            
          
          <li id="userAccountItem" class="nav-item">
            <a class="nav-link" href="" data-uri="/users"> <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" style="color: white" data-uri="/users">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg> YOUR SPACE</a>
          </li>    

          <li id="userAccountItem" class="nav-item">
            <a class="nav-link" href="" data-uri="/teachers"> <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" style="color: white" data-uri="/users">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg> TEACHER ACCOUNT</a>
          </li>  

          <li class="nav-item" >
            <a class="nav-link" href="#" data-uri="/logout" ><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16" style="color: white" data-uri="/logout" >
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg> LOGOUT  </a>
          </li>
         
  
          <li class="nav-item" right =100 >
          <a class="nav-link disabled" href="#">${authenticatedUser?.mail}</a>
          </li>             
        </ul>
          </div>
        </div>
      </nav>
  `;
  

  
  const navbar = document.querySelector('#navbarWrapper');

  navbar.innerHTML = isAuthenticated() ? authenticatedUserNavbar : anonymousUserNavbar;
}

export default Navbar;
