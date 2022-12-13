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

function renderListCourses () {
  const sectionCourse = document.querySelector('.sectionCourse');

fetch('http://localhost:3000/index')
  .then((response) => response.json())
  .then((data) =>  {
    // eslint-disable-next-line no-unused-vars
    data.forEach(element => {
        const markup = ` <p class=""> <h1>${element.picture}</h1></p>
                          <p class=""> <h1>${element.name}</h1></p>
                          <p class=""> <h1>${element.presentation}</h1></p>
        `;
        sectionCourse.innerHTML = markup;
    });
  }
)
.catch((error) => console.error("FETCH ERROR:", error));

};

<div class="container my-3  border border-dark rounded-5 bg-white ">
        <div class="row">
            <div class="col-3 my-auto">
                <img class="logoFooter" src="/Logo_bootstrap.png" alt="" style="width:100%; height:auto"></a>
            </div>
    
            <div class="col-9">
                <div class="container-fluid my-3">
                    <div class="row justify-content-center">
                        <div class="col-auto"> <h1 class="text-dark"> javascript</h1> </div>
                    </div>
    
                    <div class="row">
                        <div class="col-10">
                            <p class="text-dark">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Nobis sequi cum voluptatem minus perferendis porro laboriosam aliquam quia repellendus a, 
                                amet dolorum nam nihil neque mollitia sint itaque aut minima!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Nobis sequi cum voluptatem minus perferendis porro laboriosam aliquam quia repellendus a, 
                                amet dolorum nam nihil neque mollitia sint itaque aut minima!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Nobis sequi cum voluptatem minus perferendis porro laboriosam aliquam quia repellendus a, 
                                amet dolorum nam nihil neque mollitia sint itaque aut minima!
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Nobis sequi cum voluptatem minus perferendis porro laboriosam aliquam quia repellendus a, 
                                amet dolorum nam nihil neque mollitia sint itaque aut minima!
                            </p>
                        
                        </div>
    
                        <div class="col-2 my-auto"> <button class="btn btn-primary rounded-pill"> démarrer</button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>


export default HomePage;