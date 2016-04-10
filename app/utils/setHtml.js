import _ from 'ramda';

export default _.curry((selector, html) => {
  return document.querySelector(selector).innerHTML = html;
});
