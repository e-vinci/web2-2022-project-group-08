/* eslint-disable no-unused-vars */
import { Button } from 'bootstrap';
import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';




const UserPage = () => {  // mettre id entre parenthèse
    clearPage(); 
    renderStructureOfPage();

    renderUserQuestions();
    renderUserNotesForm();
    renderUserListNotes();
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
                      <h5 class="mb-0">Questions enregistrées</h5>
                    </div>
                    <hr>
                    <div class="col-sm-9 text-secondary">
                    <h6 class="lesQuestions">  </h6>
                    
                    </div>
                  </div>
                  <hr>
                  
              
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
                      <h5 class="mb-0">Mes notes</h5>
                    </div>
                    <hr>
                    <div class="col-sm-9 text-secondary">
                    <h6 class="lesNotes"></h6>
                
                    </div>
                  </div>
                  <hr>
                  
              
                </div>
              </div>


              <div class="row gutters-sm">
                <div class="col-md-12 mb-5">
                  <div class="card h-100">
                    <div class="card-body">
                      <h5 class="d-flex align-items-center mb-3"> Ajouter une note</h5>
                     
          
                      <div class="ajouterNotes">
                        </div>
                      </div>
                    </div>
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
 function renderContent(){
/*   const main = document.querySelector('main'); 
  const listeOfQuestions = document.createElement('div');
  listeOfQuestions.className = 'listeOfQuestions'
  main.appendChild(listeOfQuestions); */

 /*  // NOTE FORM
  const addNotes = document.createElement('div');
  addNotes.className = 'addNotes'
  main.appendChild(addNotes);

  // LIST OF USER NOTES
  const userNotes = document.createElement('div');
  userNotes.className = 'userNotes'
  main.appendChild(userNotes); */
  

}

function renderUserQuestions () {
    // const infoQuiz = await fetch(`http://localhost:3000/course?id=${id}`).then((response) => response.json()) ;// normalement quand sur l'accueil on clique sur démarrer je dois recevoir l'id du cours
    const lesQuestions = document.querySelector('.lesQuestions')
fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) =>  {
        let liste = '';
        // eslint-disable-next-line no-unused-vars
        data.forEach(element => {
      liste += ` <div class="questionsSections"> <ul>
                    <li>${element.content}</li>
                </ul> </div>`;
            lesQuestions.innerHTML = liste;
        });               
      } 
    )            
    .catch((error) => console.error("FETCH ERROR:", error));
        // main.innerHTML +=  userPage;
  };


function renderUserNotesForm () {
    const addNotes = document.querySelector('.ajouterNotes');

    const form = `<form id="addNotesForm">
    <div>
      <label></label>
      <textarea id="noteContent" cols="80" rows="13"></textarea>
    </div>
    <div>
      <button class="mt-2 btn btn-primary rounded-pill" type="submit" >Save my note</button>
    </div>
 </form>`

 addNotes.innerHTML = form;
 document.querySelector('#addNotesForm').addEventListener('submit', addNote);

}

async function addNote(e){
  e.preventDefault();

  const note = document.querySelector('#noteContent').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      note
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // eslint-disable-next-line no-unused-vars
  await fetch(`${process.env.API_BASE_URL}/notes`, options);
  Navigate('/users?id=')
}


function renderUserListNotes() {

  const noteList = document.querySelector('.lesNotes');
  fetch('http://localhost:3000/notes')
      .then((response) => response.json())
      .then((data) =>  {

        let liste = '';
        data.forEach(element => {
          // console.log("data",element.id_personal_note)

      liste += ` <div key={element.id_personal_note} class="container">
      <div class="row align-items-start">
      
        <div class="col">
        <h5> ${element.content} </h5>
        <p class="h6"> Ajouté le ${element.date_creation} </p>
        </div>
            <div class="col-6">
            <div >
            <input type="hidden" id="idNote" value="${element.id_personal_note}">
            <button id="deleteForm" type="submit" class="btn btn-primary rounded-pill"> DELETE MY NOTE 😕 </button>
            </div>
            </div>
        </div>
       </div>
      <div>
        `;
          
            noteList.innerHTML = liste;
        }); 

        document.getElementById('deleteForm').addEventListener('click', deleteNote)
     
      //  mySubmitBtn.onclick = deleteNote()


      }   
      
    )            
    .catch((error) => console.error("FETCH ERROR:", error));
  };

  async function deleteNote(){
    
    const idNote = document.querySelector('#idNote').value;
    const options = {
      method: 'DELETE',
      body: JSON.stringify({
        idNote
      }),
      headers: {
        'Content-Type': 'application/json',
      },                                                                
    };

    await fetch(`${process.env.API_BASE_URL}/notes/${idNote}`, options);
    Navigate('/users?id=')
  }



export default UserPage;

