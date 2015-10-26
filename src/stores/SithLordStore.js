import { Store } from 'flummox';
import SithLordAPISource from '../sources/SithLordAPISource';

export default class SithLordStore extends Store {
  constructor(flux) {
    super(); 

    const sithLordActionIds = flux.getActionIds('sithlordactions');
    this.registerAsync(sithLordActionIds.fetchSithLord, this.handleFetchSithLord, this.handleFetchSithLordSuccess, this.handleFetchSithLordFail);
    this.register(sithLordActionIds.scrollUp, this.handleScrollUp);
    this.register(sithLordActionIds.scrollDown, this.handleScrollDown);
    this.register(sithLordActionIds.cancelAllFetches, this.handleCancelAllFetches);

    this.state = {
        sithLords: [],
        fetchingSithLord: false,
        numSithLordSlots: 5,
        scrollAmount: 2
    };
  }

  handleFetchSithLord(requestObj) {
    this.setState({fetchingSithLord: true});
  }

  handleFetchSithLordSuccess(fetchedSithLord) {
    let foundSlot = false;      
    let sithLords = this.state.sithLords;
    for (let g = 0; g < sithLords.length; g++) {
      if (!sithLords[g]) {
        continue;
      }
      if (sithLords[g].apprentice.id === fetchedSithLord.id) {
        if (g < this.state.numSithLordSlots-1) {
          sithLords[g+1] = fetchedSithLord;
          foundSlot = true;
          break;  
        }
      }
      else if (sithLords[g].master.id === fetchedSithLord.id) {
        if (g > 0) {
          sithLords[g-1] = fetchedSithLord;
          foundSlot = true;
          break;
        }
      }
    }
    if (!foundSlot) {
      sithLords[0] = fetchedSithLord; 
    }
    this.setState({sithLords: sithLords, fetchingSithLord: false});
  }

  handleFetchSithLordFail(parms) {
    this.setState({fetchingSithLord: false});
  }

  




  handleScrollUp() {
    let sithLords = this.state.sithLords;
    for (let g = this.state.numSithLordSlots-1; g >= 0; g--) {
      if (g < this.state.scrollAmount) {
        sithLords[g] = null;
      }
      else {
        sithLords[g] = sithLords[g - this.state.scrollAmount];  
      }
    }
    this.setState({sithLords: sithLords});
    
    // dguillamot - discussion can be had on whether this is non-idiomatic flux / anti-pattern
    // here, we are not moving backwards in the view-->action-->dispatcher-->store-->view unidirectional flow
    // instead, we are only notifying a tangential module (SithLordAPISource) to cancel what it is doing, and not triggering any new actions/dispatches
    // this could potentially be refactored into the action before this scroll handler however that would optimistically assume scrolling
    // has occured successfuly, which should not necessarily be assumed in all implementations of this store
    if (SithLordAPISource.cancelDanglingPending(this.state.sithLords, this.state.numSithLordSlots)) { // cancel any pending API requests that are no longer needed as a result of this scroll
      this.setState({fetchingSithLord: false}); // dguillamot - we cancelled the pending request so fetching is false
    }
  }

  handleScrollDown() {
    let sithLords = this.state.sithLords;
    for (let g = 0; g < this.state.numSithLordSlots; g++) {
      if (g >= this.state.numSithLordSlots - this.state.scrollAmount) {
        sithLords[g] = null;
      }
      else {
        sithLords[g] = sithLords[g + this.state.scrollAmount];  
      }
    }
    this.setState({sithLords: sithLords});

    // dguillamot - see note in handleScrollUp regarding whether this is anti flux-pattern or not
    if (SithLordAPISource.cancelDanglingPending(this.state.sithLords, this.state.numSithLordSlots)) { // cancel any pending API requests that are no longer needed as a result of this scroll
      this.setState({fetchingSithLord: false}); // dguillamot - we cancelled the pending request so fetching is false
    }
  }




  handleCancelAllFetches() {
    this.setState({fetchingSithLord: false});
  }


}

