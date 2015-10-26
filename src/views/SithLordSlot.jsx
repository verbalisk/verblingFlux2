import React from 'react';
import {FluxComponent} from 'flummox/addons/react';
import classnames from 'classnames'; 

export default class SithLordSlot extends React.Component {
  constructor(props) {
  	super(props);
  }

  // dguillamot - render markup for one Sith Lord slot
  render() {
    let thisSithLordMarkup;
    if (this.props.sithLord) {
      let sithLord = this.props.sithLord;

      let identicalHomeworld = false;

      let homeworldMarkup;
      if (sithLord.homeworld) {
        if (sithLord.homeworld.id && this.props.kenobiLocation && this.props.kenobiLocation.id && sithLord.homeworld.id === this.props.kenobiLocation.id) {
          identicalHomeworld = true;
        }
        if (sithLord.homeworld.name) {
          homeworldMarkup = <h6>{sithLord.homeworld.name}</h6>;  
        }
      }

      thisSithLordMarkup = (
                             <li key={"sithLordSlotLI-"+this.props.slotNum} className={classnames('css-slot', {'css-identical-homeworld': identicalHomeworld})}>
                               <h3>{sithLord.name}</h3>
                               {homeworldMarkup}
                             </li>
                           );
    }
    else {
      thisSithLordMarkup = <li key={"sithLordSlotLI-"+this.props.slotNum} className="css-slot"></li>;
    }
    return thisSithLordMarkup;
  }
}