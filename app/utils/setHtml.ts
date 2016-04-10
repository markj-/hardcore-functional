import _ from 'ramda';

export default _.curry((selector: string, html: string) => {
  return document.querySelector(selector).innerHTML = html;
});
