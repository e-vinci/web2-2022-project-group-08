/* eslint-disable no-unused-vars */
import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';




const UserPage = () => {  // mettre id entre parenthèse
    clearPage(); 
    renderContent();
    renderUserPage();
    
};

 function renderContent(){
  const main = document.querySelector('main'); 
  const title = document.createElement('h1');
  title.innerText = 'Your Space 📝'
  // title.class = 'userPageTitle'
  main.appendChild(title);
  const test = document.createElement('div');
  test.className = 'listeOfQuestions'
  main.appendChild(test);
  // main.appendChild(listeOfQuestions);

}

function renderUserPage () {
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


export default UserPage;

