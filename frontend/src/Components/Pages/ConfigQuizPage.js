import { clearPage } from "../../utils/render";


const ConfigQuiz = () => {  // mettre id entre parenthèse
    clearPage();
    renderConfigQuiz();
};

async function renderConfigQuiz () {
    // const infoQuiz = await fetch(`http://localhost:3000/course?id=${id}`).then((response) => response.json()) ;// normalement quand sur l'accueil on clique sur démarrer je dois recevoir l'id du cours
    const main = document.querySelector('main');
    
    const configQuizHTML = `

    <div class="container-fluid my-3 py-4">

            <div class="container">

                <div class="row justify-content-start">
                    <div class="col">

                        <form action="/quizPage" method="GET">
							<input type="hidden" name="id" value="">
							<button type="submit" class="btn">
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                </svg>
							</button>
						</form>
                    </div>
                </div>
            </div>

            <div class="container border rounded-5 border-dark bg-white w-50">
                <div class="row  justify-content-center">
                    <div class="col-auto">
                        <h1 class="text-dark">tilte</h1>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-auto">
                        <h1>photo</h1>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-auto">

                    <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_4yofoa5q.json"  background="transparent"  speed="1"  style="width: 50px; height: 50px;"  loop  autoplay></lottie-player>
                    </div>

                    <div class="col-auto">
                        <h1 class="text-dark">Timer : </h1>
                    </div>

                    <div class="col-auto my-auto">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked="">
                        </div>
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-auto m-1">

                        <form action="" method="GET">
							<input type="hidden" name="id" value="">
							<button type="submit" class="btn btn-primary rounded-pill">
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