/* eslint-disable import/no-relative-packages */
// import { courses } from "../../../../api/routes/index";

const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `<h3>Welcome to your home page!</h3>`;
//  main.innerHTML = courses;

};

export default HomePage;
