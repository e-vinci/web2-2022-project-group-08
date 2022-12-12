/* eslint-disable no-unused-vars */
import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';


const userPage = () => {  // mettre id entre parenthèse
    clearPage();
    renderUserPage();
};

async function renderUserPage () {
    // const infoQuiz = await fetch(`http://localhost:3000/course?id=${id}`).then((response) => response.json()) ;// normalement quand sur l'accueil on clique sur démarrer je dois recevoir l'id du cours
   // const main = document.querySelector('main');
    
   // const userPage = 

  const main = document.querySelector('main');

    fetch('http://localhost:3000/users/userAccount')
      .then((response) => response.json())
      .then((data) =>  {
        // eslint-disable-next-line no-unused-vars
        data.forEach(element => {
            const markup = `<h1>${element.student}</h1>`;
            main.innerHTML = markup;
        });
      }
    )
    .catch((error) => console.error("FETCH ERROR:", error));
    
        main.innerHTML +=  userPage;

    };


export default userPage;

