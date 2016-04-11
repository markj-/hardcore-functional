import getEventValue from 'utils/get-event-value';
import {
  compose
} from 'pointfree-fantasy';
import log from 'utils/log';

export default compose(log, getEventValue);
