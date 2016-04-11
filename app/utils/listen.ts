import Rx from 'rxjs';
import _ from 'ramda';

export default _.curry((event: string, element: HTMLElement) => {
  return Rx.Observable.fromEvent(element, event);
});
