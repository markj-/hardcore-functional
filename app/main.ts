import Rx from 'rxjs';
import _ from 'ramda';
import {
  compose,
  map
} from 'pointfree-fantasy';
import getEventValue from 'utils/get-event-value';
import setHtml from 'utils/set-html';
import getJson from 'utils/get-json';
import log from 'utils/log';

const apiEndpoint: string = 'http://jsonplaceholder.typicode.com/posts';

const templatePost = (title: string) => `<li>${title}</li>`;

const getPostHtml = compose(templatePost, _.prop('title'));

const getPostsHtml = compose(_.join(''), map(getPostHtml));

const displayPosts = compose(setHtml('.posts'), getPostsHtml);

const input = document.querySelector('input');

const listen = (element, event) => {
  return () => {
    return Rx.Observable.fromEvent(element, event);
  }
};

const inputKeysStream = listen(input, 'keyup');

inputKeysStream()
  .subscribe(compose(log, getEventValue), log));

getJson(apiEndpoint)
  .fork(log, displayPosts);
