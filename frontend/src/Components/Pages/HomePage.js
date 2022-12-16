/* eslint-disable no-console */
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
import img1 from "../../img/javaScript.jpg";
import img2 from "../../img/uml.jpg";
import img3 from "../../img/sql.jpg";
import img4 from '../../img/bg-photo.png'
// import img5 from '../../img/img_section.png'

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
  main.appendChild(header);  
  const listeOfCourses= document.createElement('div');
  listeOfCourses.className= 'listeOfCourses';
  main.appendChild(listeOfCourses);
};

// <img class="main_img_homepage" src="${img5}" alt=""> 

function renderHeader(){
  
  document.getElementById('header').innerHTML=`

  <div class="choix"><h1>  </h1></div>
  
  <div class="glide">
  <div class="glide__track" data-glide-el="track">
    <ul class="glide__slides">
    <a href="/configurationQuiz?1" class="element"><li class="glide__slide"><img class="imgcardslider" src="${img1}" alt=""></li></a>
    <a href="/configurationQuiz?2" class="element"><li class="glide__slide"><img class="imgcardslider" src="${img2}" alt=""></li></a>  
    <a href="/configurationQuiz?3" class="element"><li class="glide__slide"><img class="imgcardslider" src="${img3}" alt=""></li></a>
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

function renderListCourses () {
  const listeOfCourses = document.querySelector('.listeOfCourses');

fetch('http://localhost:3000/index')
  .then((response) => response.json())
  .then((data) =>  {
    // eslint-disable-next-line no-unused-vars
     let markup = '';
     let images = [];
     images.push(img1,img2,img3);
     let compt=0;
    data.forEach(element => {
        markup +=
        ` 
  <div class="container my-3  border border-dark rounded-5 bg-white ">
    <div class="row">
  
        <div class="col-3 my-auto">
        <a> <img class="" src="${images[compt]}" alt="" style="width:50%; height:auto"></a>
        </div>
  
            <div class="col-9">
              <div class="container-fluid my-3">
                <div class="row justify-content-center">
                    <div class="col-auto"> <h3 class="text-dark">${element.name}</h3> </div>
                </div>

        
            <div class="row">
            <div class="col-10">
                <p class="text-dark">
              ${element.presentation}
                </p>
            </div>

       
           <div class="col-2 my-auto"> <a href="/configurationQuiz?${element.course_id}"> <button class="btn btn-primary rounded-pill"> démarrer</button> </a> </div>

                  </div>
                </div>
            </div>
        </div>
    </div>
        
        `
        compt+=1;
        ;
        listeOfCourses.innerHTML = markup;
    });
  }
)



};




export default HomePage;