/* eslint-disable import/no-relative-packages */
// import { courses } from "../../../../api/routes/index";

const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `<h3>Welcome to your home page!</h3>`;
//  main.innerHTML = courses;

// fetch('localhost:3000/courses')
//   .then((response) => response.json())
//   .then((data) => console.log(data));



};

export default HomePage;
