import _ from 'ramda';
import {
  compose,
  map
} from 'pointfree-fantasy';
import listen from 'utils/listen';
import getDom from 'utils/get-dom';
import logEventValue from 'utils/log-event-value';
import setHtml from 'utils/set-html';
import getJson from 'utils/get-json';
import log from 'utils/log';

const apiEndpoint: string = 'http://jsonplaceholder.typicode.com/posts';

// templatePost :: String -> String
const templatePost = (title: string) => `<li>${title}</li>`;

// getPostHtml :: Post -> String
const getPostHtml = compose(templatePost, _.prop('title'));

// getPostsHtml :: [Post] -> String
const getPostsHtml = compose(_.join(''), map(getPostHtml));

const displayPosts = compose(setHtml('.posts'), getPostsHtml);

getJson(apiEndpoint)
  .fork(log, displayPosts);

getDom('input')
  .map(listen('keyup'))
  .runIO()
  .subscribe(logEventValue, log);
