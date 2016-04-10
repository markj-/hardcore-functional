import _ from 'ramda';
import {
  compose
} from 'pointfree-fantasy';

export default compose(_.prop('value'), _.prop('target');
