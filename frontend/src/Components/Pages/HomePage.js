/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
// import { getACourse, getAll } from "../../../../api/models/Courses";
import Glide from '@glidejs/glide';
import { clearPage, renderPageTitle } from "../../utils/render";
import Navbar from "../Navbar/Navbar";
import Navigate from "../Router/Navigate";
import img from "../../img/uml.jpg"
import img2 from "../../img/javaScript.jpg"
import img3 from "../../img/sql.jpg"

const HomePage = () => {
  clearPage();
  renderPageTitle('');
  renderContent();
  renderHeader();
  renderListCourses();

};



function renderContent(){
  const main = document.querySelector('main');
  const header = document.createElement('p');
  header.id='header';
  const listeOfCourses= document.createElement('div');
  listeOfCourses.id='listeOfCourses';
  
  

  header.appendChild(listeOfCourses);
  main.appendChild(header);
  
};



function renderHeader(){
  document.getElementById('header').innerHTML=`

  <div class="choix">Choisissez un cours</div>

  <div class="glide">
  <div class="glide__track" data-glide-el="track">
    <ul class="glide__slides">
    <a href="" class="element"><li class="glide__slide"><img class="imgcardslider" src="${img}" alt=""></li></a>
    <a href="" class="element"><li class="glide__slide"><img class="imgcardslider" src="${img2}" alt=""></li></a>  
    <a href="" class="element"><li class="glide__slide"><img class="imgcardslider" src="${img3}" alt=""></li></a>
    </ul>
  </div>

    <div class="glide__arrows" data-glide-el="controls">
    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
    </div>

</div>

  `

  new Glide('.glide',{
    type: 'carousel',
    startAt: 0,
    perView: 3
  }).mount()

};

function renderListCourses(){
  const section = document.querySelector('section');
fetch('http://localhost:3000/index')
  .then((response) => response.json())
  .then((data) =>  {
    // eslint-disable-next-line no-unused-vars
    data.forEach(element => {
        const markup = ` <li> 
                        <img src=${element.picture} </a>
                        <a class="align-middle">${element.name}</a>
                        <a class="align-middle">${element.presentation}</a>
                        <a class="align-middle"><button class="btn btn-info">Demarrer</button></a>
     </li>`;
        section.innerHTML = markup;
    });
  }
)
};




export default HomePage;