/* eslint-disable no-unused-vars */
import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';


const main = document.querySelector('main'); 
const listeOfQuestions = document.querySelector('.listeOfCourses');

const UserPage = () => {  // mettre id entre parenthèse
    clearPage(); 
    renderContent();
    renderUserPage();
    
};

 function renderContent(){
  const title = document.createElement('h1');
  title.innerText = 'Your Space 📝'
  // title.class = 'userPageTitle'
  main.appendChild(title);
  main.appendChild(listeOfQuestions);

}

function renderUserPage () {
    // const infoQuiz = await fetch(`http://localhost:3000/course?id=${id}`).then((response) => response.json()) ;// normalement quand sur l'accueil on clique sur démarrer je dois recevoir l'id du cours
      let space = `test`;
fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) =>  {

        // eslint-disable-next-line no-unused-vars
        data.forEach(element => {
      space += `<ul>
                    <li>${element.content}</li>
                </ul>`
       //   space += `${element.content}`;
            listeOfQuestions.innerText = space;
        });               
        
      } 
    )            
    .catch((error) => console.error("FETCH ERROR:", error));
        // main.innerHTML +=  userPage;
  };


export default UserPage;

