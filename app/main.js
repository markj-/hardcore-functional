import _ from 'ramda';
import {
  compose,
  map
} from 'pointfree-fantasy';
import setHtml from 'utils/setHtml';
import getJson from 'utils/getJson';
import log from 'utils/log';

const apiEndpoint =
  'http://jsonplaceholder.typicode.com/posts';

const templatePost = (title) => `<li>${title}</li>`;

const getPostHtml = compose(templatePost, _.prop('title'));

const getPostsHtml = compose(_.join(''), map(getPostHtml));

const displayPosts = compose(setHtml('.posts'), getPostsHtml));

getJson(apiEndpoint)
  .fork(log, displayPosts);
