import { clearPage } from '../../utils/render';

const QuizPage = () => {
    clearPage();
    const main = document.querySelector('main');
    const title = document.createElement('h2');
    title.innerHTML = "Répondez aux questions";
    main.appendChild(title);
    renderQuestions();
  };
  
function renderQuestions(){
    const main = document.querySelector('main');

    fetch('http://localhost:3000/questions?quiz=25') /* Ici ce sera à voir avec Ramtin plus tard, quand il va appuyer sur Démarer sur sa page ça va navigate vers ta page avec en paramètre l'ID du quiz que tu pourras récupérer */
    .then((response) => response.json())
    .then((data) =>  {
      let questionNumber = 1;
      data.forEach(question => {
        console.log(question);
        const questionWrapper = document.createElement('div');
        questionWrapper.innerHTML += `<p> Question n°${questionNumber} : ${question.content} </p>`
        fetch(`http://localhost:3000/answers?question=${question.question_id}`) 
        .then((response) => response.json())
        .then((data2) =>  {
         
            let answerNumber = 1;
            data2.forEach(answer => {
              const answerWrapper = document.createElement('p');
              answerWrapper.id = 1
              answerWrapper.innerHTML += `Réponse n° ${answerNumber}: ${answer.content} `;
              if(answer.correct)  answerWrapper.rep = 'true';
              answerNumber +=1;
              questionWrapper.appendChild(answerWrapper);   

              answerWrapper.addEventListener('click', ()=>{
                if(answer.correct) answerWrapper.className = "text-success";
                // eslint-disable-next-line no-useless-return
                return;              
                });      
            });


      questionNumber+=1;
      main.appendChild(questionWrapper);
      questionWrapper.innerHTML += '-----------------------------------------------------------------'
           
    
    }
  )  
    
      });
    } 
  )
  .catch((error) => console.error("FETCH ERROR:", error));
  
}


export default QuizPage;