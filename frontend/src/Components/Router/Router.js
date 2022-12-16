import { removePathPrefix, usePathPrefix } from '../../utils/path-prefix';
import routes from './routes';

const Router = () => {
  onFrontendLoad();
  onNavBarClick();
  onHistoryChange();
};

function onNavBarClick() {
  const navbarWrapper = document.querySelector('#navbarWrapper');

  navbarWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    const navBarItemClicked = e.target;
    const uri = navBarItemClicked?.dataset?.uri;
    if (uri) {
      const componentToRender = routes[uri];
      if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

      componentToRender();
      window.history.pushState({}, '', usePathPrefix(uri));
    }
  });
}

function onHistoryChange() {
  window.addEventListener('popstate', (e) => {
    const uri = removePathPrefix(window.location.pathname);
    const componentToRender = routes[uri];
    console.log("router", e.state.data);
    componentToRender(e.state?.data ? e.state.data : null);
  });
}

function onFrontendLoad() {
  window.addEventListener('load', (e) => {
    const uri = removePathPrefix(window.location.pathname);
    const componentToRender = routes[uri];
    if (!componentToRender) throw Error(`The ${uri} ressource does not exist.`);

    
    componentToRender(e.state?.data ? e.state.data : null);
  });
}

export default Router;
