/**
 * Navigate to a URI by triggering the popstate event in order for the router to deal with
 * a change of browser history.
 * NB : this solution is to avoid circular depedencies : if Navigate() had to import, directly or
 * indirectly, the pages, then there would be a circular reference because the router
 * has to import all the pages to render them.
 */

import { usePathPrefix } from '../../utils/path-prefix';

const Navigate = (toUri, data) => {
  const fromUri = Number(window.location.href.split('?')[1])
console.log("fromUri",fromUri)
  if (fromUri === toUri) return;

  window.history.pushState({data}, '', usePathPrefix(toUri));
  const popStateEvent = new PopStateEvent('popstate', { state: {data} });
  dispatchEvent(popStateEvent);
  
};

export default Navigate;
