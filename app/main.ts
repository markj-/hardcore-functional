import Rx from 'rxjs';
import _ from 'ramda';
import {
  compose,
  map
} from 'pointfree-fantasy';
import io from 'utils/io';
import getEventValue from 'utils/get-event-value';
import setHtml from 'utils/set-html';
import getJson from 'utils/get-json';
import log from 'utils/log';

io.extendFn();

const apiEndpoint: string = 'http://jsonplaceholder.typicode.com/posts';

const templatePost = (title: string) => `<li>${title}</li>`;

const getPostHtml = compose(templatePost, _.prop('title'));

const getPostsHtml = compose(_.join(''), map(getPostHtml));

const displayPosts = compose(setHtml('.posts'), getPostsHtml);

const getDom = document.querySelector.bind(document).toIO();

const listen = _.curry((event: string, element: HTMLElement) => {
  return Rx.Observable.fromEvent(element, event);
});

const logEventValue = compose(log, getEventValue);

getJson(apiEndpoint)
  .fork(log, displayPosts);

getDom('input')
  .map(listen('keyup'))
  .runIO()
  .subscribe(logEventValue, log);
