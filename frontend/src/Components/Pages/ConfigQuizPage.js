import { clearPage } from "../../utils/render";
import Navigate from "../Router/Navigate";

// eslint-disable-next-line import/no-unresolved
const Swal = require('sweetalert2');

    let getId = Number(window.location.href.split('?')[1])

    if(getId === null){
        getId = -1;
    }

const ConfigQuiz = () => {  // mettre id entre parenthès
    clearPage();
    console.log(`id du quiz : ${getId}`);
    if( getId === '-1') {
        Swal.fire(
            'Pas encore de quizz pour ce gours :( !',
            '',
            'error'
          )
        Swal.fire({
            title: 'Pas encore de quizz pour ce gours :( !',
            icon: 'info',
            focusConfirm: false,
            confirmButtonText:
            `<i class="fa fa-thumbs-up"></i> Revenir à la page d'accueil`,
            confirmButtonAriaLabel: 'Thumbs up, great!',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Navigate('/');
            }
        })
    }
    renderConfigQuiz();
    const form = document.querySelector('#startForm');
    form.addEventListener('click', (e) => {
        goToQuizz(e, getId)
    })
};


function goToQuizz(e){
    e.preventDefault();
    Navigate('/QuizPage', getId);

}

async function renderConfigQuiz () {
    // const infoQuiz = await fetch(`http://localhost:3000/course?id=${id}`).then((response) => response.json()) ;// normalement quand sur l'accueil on clique sur démarrer je dois recevoir l'id du cours
    const main = document.querySelector('main');
    
    const configQuizHTML = `

    <div class="container-fluid my-3 py-4">

            <div class="container">

                

            <div class="container border rounded-5 border-dark bg-white w-50">
                <div class="row  justify-content-center">
                    <div class="col-auto">
                        <h1 class="text-dark">Appuyez sur Démarer</h1>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-auto">
                        <h1>photo</h1>
                    </div>
                </div>


                <div class="row justify-content-center">
                    <div class="col-auto m-1">

                        <form id="startForm" >
							<input type="hidden" name="id" value="">
							<button  type = 'submit' class="btn btn-primary rounded-pill">
								Démarrer    
							</button>
						</form>
                    </div>
                </div>
            </div>
		</div>
    
    `; 
    main.innerHTML +=  configQuizHTML;
}

export default ConfigQuiz;

/*
${infoQuiz.name} a la place de tilte

${infoQuiz.picture} a la place photo
*/ 