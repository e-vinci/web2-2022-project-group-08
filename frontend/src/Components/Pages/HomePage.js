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
import img from "../../img/javaScript.jpg";
import img2 from "../../img/uml.jpg";
import img3 from "../../img/sql.jpg";
import img4 from '../../img/bg-photo.png'

const HomePage = () => {

  clearPage();
  renderPageTitle('');
  renderContent();
  renderHeader();

  renderListCourses();
};



function renderContent(){
  const main = document.querySelector('main');
  const header = document.createElement('section');
  header.id='header';
  main.appendChild(header);  
  const listeOfCourses= document.createElement('div');
  listeOfCourses.className= 'listeOfCourses';


  main.appendChild(listeOfCourses);
};

/*     let urls =[];
    let compt=0;
  fetch('http://localhost:3000/index')
  .then((response) => response.json())
  .then((data) =>  {
    // eslint-disable-next-line no-unused-vars
    data.forEach(element => {
      urls[compt]=element.picture;
      compt+1;
    })}) */

    

function renderHeader(){

  let compteur=0;
  document.getElementById('header').innerHTML=`

  <div class="choix">
  <div class="">
  <lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_icgp2hvb.json"  background="transparent"  speed="1"  style="width: 250px; height: 250px;"  loop  autoplay></lottie-player>
  </div>
</div>

<div class="glide">
<div class="glide__track" data-glide-el="track">
    
<ul class="glide__slides">
<a href="/configurationQuiz?${compteur+1}" class="element"><li class="glide__slide"><img class="imgcardslider" src="${img}" alt=""></li></a>
<a href="/configurationQuiz?${compteur+2}" class="element"><li class="glide__slide"><img class="imgcardslider" src="${img2}" alt=""></li></a>
<a href="/configurationQuiz?${compteur+3}" class="element"><li class="glide__slide"><img class="imgcardslider" src="${img3}" alt=""></li></a>
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


function renderImages(){

  const ul = document.querySelector('.glide__slides');

 /*  const urls =[];
  let compt=0; */
  
fetch('http://localhost:3000/index')
.then((response) => response.json())
.then((data) =>  {
  let kevin='';
  // eslint-disable-next-line no-unused-vars
  data.forEach(element => {
  /*   let value= element.picture;
    urls.push(value) ;
    compt+1; */
  let compteur=0;
  kevin+=` 
  <a href="/configurationQuiz?" class="element"><li class="glide__slide"><img class="imgcardslider" src="${element.picture}" alt=""></li></a>
  `
  ul.innerHTML= kevin;
 })})
 
 

};





function renderListCourses () {
  const listeOfCourses = document.querySelector('.listeOfCourses');

fetch('http://localhost:3000/index')
  .then((response) => response.json())
  .then((data) =>  {
    // eslint-disable-next-line no-unused-vars
     let markup = '';
     let compt=0;
   
    data.forEach(element => {
        markup +=
        ` 

  <div key=${element.course_id} class="container my-3  border border-dark rounded-5 bg-white " >
    <div class="row">
  
        <div class="col-3 my-auto">
        <a> <img class="" src="${element.picture}" alt="" style="width:50%; height:auto"></a>
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

           <div class="col-2 my-auto"> 

           <a href="/configurationQuiz?${element.course_id}"

           <button id="start" type="submit" class="btn btn-primary rounded-pill"> démarrer</button> 
           
           </a>
           
           </div>

                  </div>
                </div>
            </div>
        </div>
    </div>
        
        `
        compt+=1;
        ;
        listeOfCourses.innerHTML = markup;

    });/*  document.getElementById('start').addEventListener('click', goToConfiguration); */
   
  }
)



};


/* function goToConfiguration(){
 const kev = document.querySelector('#idCourse')
    Navigate("/configurationQuiz", kev.value);
};
 */



export default HomePage;