/* import { setAuthenticatedUser } from '../../utils/auths'; */
import { clearPage, renderPageTitle } from '../../utils/render';
/* import Navbar from '../Navbar/Navbar'; */
import Navigate from '../Router/Navigate'; 

let currentQuiz = {};
const ModifyQuizPage = (quiz) => {
  currentQuiz = quiz;
  clearPage();
  renderPageTitle('Quizz du cours :');
  renderDeleteButton();
  renderQuizForm();
  renderQuizQuestionForm();
  renderExistingQuestions();
};


function renderDeleteButton(){
  const main = document.querySelector('main');
  const deleteForm = document.createElement('form');
  const deleteButton = document.createElement('input');
  deleteButton.type = 'submit';
  deleteButton.value = 'Supprimer le Quizz'
  deleteButton.className = 'btn btn-info';
  deleteForm.appendChild(deleteButton);
  main.appendChild(deleteForm);
  deleteForm.addEventListener('submit', deleteQuizz);
}

async function deleteQuizz(e) {
  e.preventDefault();
  const options = {
    method: 'DELETE',
    body: JSON.stringify({
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log("quizz", currentQuiz);
  const response = await fetch(`${process.env.API_BASE_URL}/quiz/${currentQuiz.quizz_id}`, options);
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  Navigate('/addQuiz');
}



async function renderQuizForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  const title = document.createElement('h2');
  title.innerHTML = 'Modifier le cours';
  main.appendChild(title);
  form.className = 'p-5';
  const courses = document.createElement('select')
  fetch('http://localhost:3000/courses')
    .then((response) => response.json())
    .then((data) =>  {
      courses.id = 'courses';
      data.forEach(element => {

        if(element.course_id === currentQuiz.course) courses.innerHTML += `<option selected value = ${element.name}> ${element.name}</option>` /* modifier */
        else courses.innerHTML += `<option value = ${element.name}> ${element.name}</option>`
      });
    }
  )

  const submit = document.createElement('input');
  submit.value = 'Modifier';
  submit.type = 'submit';
  submit.className = 'btn btn-info';
  form.appendChild(courses);
  form.appendChild(submit)
  main.appendChild(form);
  /* form.addEventListener('submit', addQuizz); */

}



function renderQuizQuestionForm() {
    const main = document.querySelector('main');
    const title = document.createElement('h2');
    title.innerHTML = "Ajouter une question"
    main.appendChild(title);
    const form = document.createElement('form');
    form.className = 'p-5';

    const questionLabel = document.createElement('label');
    questionLabel.innerHTML = "Question";
    const question = document.createElement('input');
    question.type = 'text';
    question.id = 'question';
    question.placeholder = "Entrez l'intitulé de la question";
    question.required = true;
    question.className = 'form-control mb-3';

    const answer1Label = document.createElement('label');
    answer1Label.innerHTML = "Réponse 1";
    const answer1 = document.createElement('input');
    answer1.type = 'text';
    answer1.id = 'first_answer';
    answer1.placeholder = "Entrez la première réponse possible";
    answer1.required = true;
    answer1.className = 'form-control mb-3';

    const answer2Label = document.createElement('label');
    answer2Label.innerHTML = "Réponse 2";
    const answer2 = document.createElement('input');
    answer2.type = 'text';
    answer2.id = 'second_answer';
    answer2.placeholder = "Entrez la deuxième réponse possible";
    answer2.required = true; 
    answer2.className = 'form-control mb-3';

    const answer3Label = document.createElement('label');
    answer3Label.innerHTML = "Réponse 3";
    const answer3 = document.createElement('input');
    answer3.type = 'text';
    answer3.id = 'third_answer';
    answer3.placeholder = "Entrez la troisième réponse possible";
    answer3.required = true;
    answer3.className = 'form-control mb-3';

    const answer4Label = document.createElement('label');
    answer4Label.innerHTML = "Réponse 4";
    const answer4 = document.createElement('input');
    answer4.type = 'text';
    answer4.id = 'fourth_answer';
    answer4.placeholder = "Entrez la quatrième réponse possible";
    answer4.required = true; 
    answer4.className = 'form-control mb-3';

    const goodAnswerLabel = document.createElement('label');
    goodAnswerLabel.innerHTML = "Bonne réponse : ";
    const goodAnswer = document.createElement('select');
    goodAnswer.id = 'goodAnswer'
    const option1 = document.createElement('option');
    option1.innerHTML = '1';
    option1.value = '1';
    const option2 = document.createElement('option');
    option2.innerHTML = '2';
    option2.value = '2';
    const option3 = document.createElement('option');
    option3.innerHTML = '3';
    option3.value = '3';
    const option4 = document.createElement('option');
    option4.innerHTML = '4';
    option4.value = '4';

    const feedbackLabel = document.createElement('label');
    feedbackLabel.innerHTML = "Feedback";
    const feedback = document.createElement('input');
    feedback.id = 'feedback';
    feedback.className = 'form-control mb-3';
    feedback.required = true;
    feedback.placeholder = "Entrez le feedback de la bonne réponse...";


    goodAnswer.appendChild(option1);
    goodAnswer.appendChild(option2);
    goodAnswer.appendChild(option3);
    goodAnswer.appendChild(option4);


    const submit = document.createElement('input');
    submit.value = 'Ajouter';
    submit.type = 'submit';
    submit.className = 'btn btn-info';

    form.appendChild(questionLabel);
    form.appendChild(question)
    form.appendChild(answer1Label);
    form.appendChild(answer1);
    form.appendChild(answer2Label);
    form.appendChild(answer2);
    form.appendChild(answer3Label);
    form.appendChild(answer3);
    form.appendChild(answer4Label);
    form.appendChild(answer4);
    form.appendChild(goodAnswerLabel);
    form.appendChild(goodAnswer);
    form.appendChild(feedbackLabel);
    form.appendChild(feedback);
    form.appendChild(submit);
    main.appendChild(form);
    form.addEventListener('submit', addQuestion);
  
  }

  async function addQuestion(e) {
    e.preventDefault();
  
    const question = document.querySelector('#question').value;
    const quizID = currentQuiz.quizz_id;
    const options = {
      method: 'POST',
      body: JSON.stringify({
        question,
        quizID
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const response = await fetch(`${process.env.API_BASE_URL}/questions`, options);
    const addedQuestion = await response.json();
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const answer1 = document.querySelector('#first_answer').value;
    const answer2 = document.querySelector('#second_answer').value;
    const answer3 = document.querySelector('#third_answer').value;
    const answer4 = document.querySelector('#fourth_answer').value;
    const goodAnswerNumber = document.querySelector('#goodAnswer').value;
    const feedback = document.querySelector('#feedback').value;
    const questionID = addedQuestion.lastInsertRowid;
    const options2 = {
      method: 'POST',
      body: JSON.stringify({
        answer1,
        answer2,
        answer3,
        answer4,
        questionID,
        goodAnswerNumber,
        feedback
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response2 = await fetch(`${process.env.API_BASE_URL}/answers`, options2);
    if (!response2.ok) throw new Error(`fetch error : ${response2.status} : ${response2.statusText}`);
    Navigate('/ModifyQuizPage');
    ModifyQuizPage(currentQuiz);
  }



function renderExistingQuestions(){
    const main = document.querySelector('main');
    const title = document.createElement('h2');
    title.innerHTML = "Modifier les questions existantes"
    main.appendChild(title);
    fetch(`http://localhost:3000/questions?quiz=${currentQuiz.quizz_id}`)
    .then((response) => response.json())   
    .then((data) =>  {
      let j = 1;
      let feedbackContent = "";
      data.forEach(element => {
        const form = document.createElement('form');
        const questionTitle = document.createElement('h2');
        questionTitle.innerHTML = `Question n° ${j}`
        main.appendChild(questionTitle);
        main.appendChild(form);
        form.className = 'p-5';
        const questionLabel = document.createElement('label');
        questionLabel.innerHTML = "Question"
        const question = document.createElement('input');
        question.type = 'text';
        question.value = element.content;
        question.required = true;
        question.className = 'form-control mb-3';
        question.placeholder = "Entrez la question..."
        j+=1;
        
        fetch(`http://localhost:3000/answers?question=${element.question_id}`)
        .then((response2) => response2.json())    
        .then((data2) =>  {
        form.appendChild(questionLabel);
        form.appendChild(question);
        let i = 1;
        data2.forEach(element2 => {
            const answerLabel = document.createElement('label');
            answerLabel.innerHTML = `Réponse ${i}`
            const answer = document.createElement('input');
            answer.type = 'text';
            answer.value = element2.content;
            answer.required = true;
            answer.className = 'form-control mb-3';
            answer.placeholder = `Entrez la réponse ${i}...`
            form.appendChild(answerLabel);
            form.appendChild(answer);
            i +=1;
            if(element2.correct) feedbackContent += element2.good_answer_feedback;
  

        
      });
      const goodAnswerLabel = document.createElement('label');
      goodAnswerLabel.innerHTML = "Bonne réponse : ";
      const goodAnswer = document.createElement('select');
      goodAnswer.id = 'goodAnswer'
      const option1 = document.createElement('option');
      option1.innerHTML = '1';
      option1.value = '1';
      const option2 = document.createElement('option');
      option2.innerHTML = '2';
      option2.value = '2';
      const option3 = document.createElement('option');
      option3.innerHTML = '3';
      option3.value = '3';
      const option4 = document.createElement('option');
      option4.innerHTML = '4';
      option4.value = '4';
      
      goodAnswer.appendChild(option1);
      goodAnswer.appendChild(option2);
      goodAnswer.appendChild(option3);
      goodAnswer.appendChild(option4);
      form.appendChild(goodAnswerLabel);
      form.appendChild(goodAnswer);

      const feedbackLabel = document.createElement('label');
      feedbackLabel.innerHTML = "Feedback";
      const feedback = document.createElement('input')
      feedback.className = 'form-control mb-3';
      feedback.value = feedbackContent;
      feedback.required = true;
      feedback.placeholder = "Entrez le feedback de la bonne réponse...";
      form.appendChild(feedbackLabel);
      form.appendChild(feedback);

      const submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'Modifier';
        form.appendChild(submit);
    }
  )
      });
    }
  )
  .catch((error) => console.error("FETCH ERROR:", error));

}



export default ModifyQuizPage;
