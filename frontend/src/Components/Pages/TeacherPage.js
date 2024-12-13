/* eslint-disable no-unused-vars */
import { Button } from 'bootstrap';
import { getAuthenticatedUser, setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';




const TeacherPage = () => {  // mettre id entre parenthèse
    clearPage();
    const user = getAuthenticatedUser();
    if(!user.isTeacher) {
      alert("Vous n'avez pas l'autorisation");
      return;
    }
    renderStructureOfPage();
    renderTeacherCourses();


};

function renderStructureOfPage(){
  const main = document.querySelector('main');
  const contenu = document.createElement('section');
  contenu.innerHTML = `
  <div class="container">
    <div class="main-body">
    
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                  <div class="col-auto">

                  <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_zfszhesy.json"  background="transparent"  speed="1"  style="width: 250px; height: 250px;"  loop  autoplay></lottie-player>
                  </div>

                    <div class="mt-3">
                      <h4>METTRE LE NOM DU USER</h4>
                      <p class="text-secondary mb-1">METTRE L EMAIL</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mt-3">
                
              </div>
            </div>
            <div class="col-md-8">
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                  <div class="col-sm-4 text-secondary"> 
                    </div>
                    <div class="col-sm-4">
                      <h5 class="mb-0">Mes cours</h5>
                    </div>
                    <hr>
                    <div class="col-sm-9 text-secondary">
                    <h6 class="lesCours">  </h6>
                    
                    </div>
                  </div>
                  <hr>
                  
              
                </div>
              </div>

              <div class="card mt-3">
                
              </div>
            </div>


                </div>
              </div>
            </div>
          </div>
        </div>
    </div>

`
main.appendChild(contenu);
}

function renderTeacherCourses () {
const lesCours = document.querySelector('.lesCours')
fetch('http://localhost:3000/teachers')
      .then((response) => response.json())
      .then((data) =>  {
        let liste = '';
        // eslint-disable-next-line no-unused-vars
        data.forEach(element => {
      liste += ` <div class="coursSections"> <ul>
                    <li>${element.name}</li>
                </ul> </div>`;
            lesCours.innerHTML = liste;
        });               
      } 
    )            
    .catch((error) => console.error("FETCH ERROR:", error));
        // main.innerHTML +=  userPage;
  };


export default TeacherPage;

