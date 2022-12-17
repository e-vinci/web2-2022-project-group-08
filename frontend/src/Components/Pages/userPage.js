/* eslint-disable no-unused-vars */
import { Button } from 'bootstrap';
import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';




const UserPage = () => {  // mettre id entre parenthèse
    clearPage(); 
    renderContent();
    renderUserQuestions();
    renderUserNotesForm();
    renderUserListNotes();
    
    
};

 function renderContent(){
  const main = document.querySelector('main'); 
  const title = document.createElement('h1');
  title.innerText = 'My Personal Space 📝'
  main.appendChild(title);

  const listeOfQuestions = document.createElement('div');
  listeOfQuestions.className = 'listeOfQuestions'
  main.appendChild(listeOfQuestions);

  // NOTE FORM
  const addNotes = document.createElement('div');
  addNotes.className = 'addNotes'
  main.appendChild(addNotes);

  // LIST OF USER NOTES
  const userNotes = document.createElement('div');
  userNotes.className = 'userNotes'
  main.appendChild(userNotes);
  

}

function renderUserQuestions () {
    // const infoQuiz = await fetch(`http://localhost:3000/course?id=${id}`).then((response) => response.json()) ;// normalement quand sur l'accueil on clique sur démarrer je dois recevoir l'id du cours
    const listeOfQuestions = document.querySelector('.listeOfQuestions')
fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) =>  {
        let liste = '';
        // eslint-disable-next-line no-unused-vars
        data.forEach(element => {
      liste += ` <div class="questionsSections"> <ul>
                    <li>${element.content}</li>
                </ul> </div>`;
            listeOfQuestions.innerHTML = liste;
        });               
      } 
    )            
    .catch((error) => console.error("FETCH ERROR:", error));
        // main.innerHTML +=  userPage;
  };


function renderUserNotesForm () {
    const addNotes = document.querySelector('.addNotes');

    const form = `<form id="addNotesForm">
    <div>
      <label>Add A Note about What I Want</label>
      <textarea id="noteContent" cols="50" rows="5"></textarea>
    </div>
    <div>
      <button type="submit" >Save my note</button>
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
  const noteList = document.querySelector('.userNotes');
  fetch('http://localhost:3000/notes')
      .then((response) => response.json())
      .then((data) =>  {
        let liste = '';
        data.forEach(element => {
      liste += ` <div class="questionsSections"> <ul>
                    <li>${element.content}</li>
                    Crée le 
                    ${element.date_creation}
                    </ul>
                    </div>
                    `;
            noteList.innerHTML = liste;
        });    
      }   
    )            
    .catch((error) => console.error("FETCH ERROR:", error));
  };

  async function deleteNote(){
      const idNote = document.querySelector('#idNote').value;
      console.log(idNote);
      const options = {
        method: 'DELETE',
        body: JSON.stringify({
          idNote
        }),
        headers: {
          'Content-Type': 'application/json',
        },                                                                
      };

      await fetch(`${process.env.API_BASE_URL}/notes`, options);
      Navigate('/users?id=')
    }



export default UserPage;

