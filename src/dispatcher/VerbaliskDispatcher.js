import Dispatcher from './Dispatcher';

// dguillamot - small extension of Facebooks Dispatcher just as a naive queueing dispatcher. 
// this allows us to fire off an action from our views even within an inprogress action dispatch cycle
// the action will be 'queued' and fired off in the next cycle via setTimeout.
// An alternative, albeit quite heavy and out-of-date, may be to look at quantum-flux dispatcher to do an
// Event queue here - https://github.com/sterpe/quantum-flux
export default class MyCustomDispatcher extends Dispatcher {
  dispatch(...args) {
    if (!this.isDispatching()) {
      super.dispatch(...args);
    } else {
      setTimeout(() => {
        super.dispatch(...args);
      }, 0);
    }
  }
}