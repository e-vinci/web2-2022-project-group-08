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
  title.innerText = 'Your account'
  main.appendChild(title);

}

function renderUserPage () {
    // const infoQuiz = await fetch(`http://localhost:3000/course?id=${id}`).then((response) => response.json()) ;// normalement quand sur l'accueil on clique sur démarrer je dois recevoir l'id du cours
console.log('render user page')
const main = document.querySelector('main');
fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) =>  {
        // eslint-disable-next-line no-unused-vars
        data.forEach(element => {
            const markup = `<h1>${element.content}</h1>`;
            console.log(element.content);
            main.innerHTML = markup;
        });           
      }                          
    )            
    .catch((error) => console.error("FETCH ERROR:", error));
        // main.innerHTML +=  userPage;
  };


export default UserPage;

