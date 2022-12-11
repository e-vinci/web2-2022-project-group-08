/* eslint-disable import/no-relative-packages */
// import { courses } from "../../../../api/routes/index";

const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `<h3>Welcome to your home page!</h3>`;
//  main.innerHTML = courses;

// let storeData;

// fetch('http://localhost:3000/index')
//   .then((response) => response.json())
//   .then((data) =>  {
//     // eslint-disable-next-line no-unused-vars
//     data.forEach(element => {
//         const markup = `<h1>${element.code}</h1>`;
//         main.innerHTML = markup;
//     });
//   }
// )


//   .catch((error) => console.error("FETCH ERROR:", error));

// console.log(storeData)

};

export default HomePage;
