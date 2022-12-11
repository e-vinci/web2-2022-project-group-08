/* eslint-disable no-unused-vars */
import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const HomePage = () => {
    const main = document.querySelector('main');
    main.innerHTML = `<h3>Welcome to your User Page!</h3>`;
  };
  
  
  export default HomePage;