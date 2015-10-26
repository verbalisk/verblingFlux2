import React from 'react';
import {FluxComponent} from 'flummox/addons/react';
import SithLordSlot from './SithLordSlot'; 
import classnames from 'classnames'; 

export default class Dashboard extends React.Component {
  constructor(props) {
  	super(props);

  	this.state = {
        identicalHomeworldOnDashboard: false,
        enableScrollUp: false,
        enableScrollDown: false
  	}
  }

  componentDidMount() {
  	let requestObj ={
      sithLordID: '3616',
      url: 'http://localhost:3000/dark-jedis/3616'
    };
    this.props.flux.getActions('sithlordactions').fetchSithLord(requestObj);

    // dguillamot - KenobiActions needs to pass the flux instance to KenobiWSSource so we can trigger new actions on new websocket messages
    this.props.flux.getActions('kenobiactions').listenForKenobi(this.props.flux, 'ws://localhost:4000'); 
  }

  componentWillReceiveProps(nextProps) {
  	this.updateSithLordSlots(nextProps);
  }



  render() {
  	let kenobiLocationMessage;
  	if (this.props.kenobiLocation && this.props.kenobiLocation.name) {
  	   kenobiLocationMessage = 'Obi-Wan currently on ' + this.props.kenobiLocation.name;
  	}
  	else {
  	   kenobiLocationMessage = 'Searching for Obi-Wan Kenobi ...'; 
  	}

    let sithLordsMarkup = [];
    for (let g = 0; g < this.props.numSithLordSlots; g++) {
      sithLordsMarkup.push(<SithLordSlot key={"sithLordSlot"+g} sithLord={this.props.sithLords[g]} kenobiLocation={this.props.kenobiLocation} slotNum={g} />);
    }

    return (
      <FluxComponent>
        <div className="css-root">
          <h1 className="css-planet-monitor">{kenobiLocationMessage}</h1>
          <section className="css-scrollable-list">
            <ul className="css-slots">
              {sithLordsMarkup}
            </ul>
            <div className="css-scroll-buttons">
              <button className={classnames('css-button-up', {'css-button-disabled': !this.state.enableScrollUp || this.state.identicalHomeworldOnDashboard})} onClick={this.scrollUp.bind(this)} ></button>
              <button className={classnames('css-button-down', {'css-button-disabled': !this.state.enableScrollDown || this.state.identicalHomeworldOnDashboard})} onClick={this.scrollDown.bind(this)} ></button>
            </div>
          </section>
        </div>
      </FluxComponent>
    );
  }

  
  scrollUp() {
    if (!this.state.enableScrollUp || this.state.identicalHomeworldOnDashboard) {
      return;
    }
    this.props.flux.getActions('sithlordactions').scrollUp();
  }


  scrollDown() {
    if (!this.state.enableScrollDown || this.state.identicalHomeworldOnDashboard) {
      return;
    }
    this.props.flux.getActions('sithlordactions').scrollDown();
  }






  // dguillamot - loop through dashboard slots. if empty slot is found, find nearest apprentice and kickoff a fetch to their master
  // or find nearest master and kickoff a fetch to their apprentice
  updateSithLordSlots(props) {
    if ((!props || !props.sithLords) && !props.fetchingSithLord) { // dguillamot - if dashboard is empty, fetch Darth Sidious
  	  let requestObj ={
        sithLordID: '3616',
        url: 'http://localhost:3000/dark-jedis/3616'
      };
      props.flux.getActions('sithlordactions').fetchSithLord(requestObj);
      return;
    }

    let sithLords = props.sithLords;
    let sentFetch = false;
    let filledSlots = 0;
    let numWithApprentices = 0;
    let numWithMasters = 0;
    for (let g = 0; g < props.numSithLordSlots; g++) { // dguillamot - loop through all slots on the dashboard
      if (!sithLords[g]) { // dguillamot - if this slot is empty, find nearest Sith Lord with valid master or apprentice data to fill it with
        // dguillamot - only send one fetch per pass, and only if not already fetching a Sith Lord, and only if Kenobi is not on the same planet as a Sith Lord currently on the dashboard
        if (!sentFetch && !props.fetchingSithLord && !this.state.identicalHomeworldOnDashboard) { 
          // dguillamot - check for masters first to try and fill this slot. if none found, check apprentices. 
          // A master-first search helps Kenobi find more masterful Sith Lords slightly faster, allowing us to hunt more 
          // masterful and probably older Sith Lords (more likely able to progenate) first, and more junior (younger?) 
          // Sith Lords who may not be as powerful and may not be able to progenate slightly slower. in other words - go after breeders first
          for(let i = g + 1; i <= props.numSithLordSlots && !sentFetch; i++) { // dguillamot - check lower slots for potential apprentices
            if (sithLords[i]) {
              if (sithLords[i].master && sithLords[i].master.url) { // dguillamot - found an apprentice down below with master information
                sentFetch = true;
	        	    let requestObj ={
	                sithLordID: sithLords[i].master.id,
	                url: sithLords[i].master.url,
	                callerID: sithLords[i].id, // dguillamot - callerID and type are used in case we need to cancel this request later
	                type: 'master'
	              };
	              props.flux.getActions('sithlordactions').fetchSithLord(requestObj);
              }
              else { // dguillamot - only nearest apprentice can be used to fill a master slot
                break;
              }
            }
          }

          for (let i = g - 1; i >= 0 && !sentFetch; i--) { // dguillamot - we did not find an apprentice down below, look for masters above this empty slot
            if (sithLords[i]) {
              if (sithLords[i].apprentice && sithLords[i].apprentice.url) { // dguillamot - found a master above with apprentice information
                sentFetch = true;
            	  let requestObj ={
                  sithLordID: sithLords[i].apprentice.id,
                  url: sithLords[i].apprentice.url,
                  callerID: sithLords[i].id, 
                  type: 'apprentice'
                };
                props.flux.getActions('sithlordactions').fetchSithLord(requestObj);
              }
              else { // dguillamot - only nearest master can be used to fill an apprentice slot
                break;
              }
            }
          }
        } // end if !sentFetch
      } // end if !sithLords[g]
      else { // dguillamot - this slot is filled with Sith Lord data. Tally whether this Sith Lord has a master and an apprentice (used to disable scroll buttons)
        filledSlots++;
        if(sithLords[g].master && sithLords[g].master.id && sithLords[g].master.url) { 
          numWithMasters++;
        }
        if(sithLords[g].apprentice && sithLords[g].apprentice.id && sithLords[g].apprentice.url) {
          numWithApprentices++;
        }
      }
    }
    
    let enableScrollUp = false;
    let enableScrollDown = false;
    if (filledSlots > 0) { // dguillamot - we have at least one Sith Lord loaded, check if we should enable buttons
      if(filledSlots === numWithMasters) { // dguillamot - every Sith Lord on the dashboard has a master so we have not reached top of Sith Lord hierarchy
        enableScrollUp = true;
      }
      if(filledSlots === numWithApprentices) { // dguillamot - every Sith Lord on the dashboard has an apprentice so we have not reached bottom of Sith Lord hierarchy
        enableScrollDown = true;
      }
    }
    else if(!props.fetchingSithLord){ // dguillamot - no Sith Loards are loaded, keep enableScroll buttons = false (above) and re-initialize the list with Darth Sidious
  	  let requestObj ={
        sithLordID: '3616',
        url: 'http://localhost:3000/dark-jedis/3616'
      };
      props.flux.getActions('sithlordactions').fetchSithLord(requestObj);
    }

    let identicalHomeworldOnDashboard = this.checkIdenticalHomeworld(props); // dguillamot - check if Kenobi is on the same planet as a Sith Lord currently on the dashboard
    if (identicalHomeworldOnDashboard) { // dguillamot - if Kenobi is on same planet as a Sith Lord on the dashboard, cancel all pending API requests
      if (props.fetchingSithLord) { // dguillamot - if no request is pending, no need to trigger cancel action
      	props.flux.getActions('sithlordactions').cancelAllFetches();
      }
    }

    this.setState({enableScrollUp: enableScrollUp, enableScrollDown: enableScrollDown, identicalHomeworldOnDashboard: identicalHomeworldOnDashboard});
  }




  // dguillamot - Check if Kenobi is on the same planet as one of the Sith Lords currently on the dashboard
  checkIdenticalHomeworld(props) {
  	if (!props || !props.kenobiLocation || !props.kenobiLocation.id || !props.sithLords || !props.numSithLordSlots) {
      return;
  	}
    let identicalHomeworldOnDashboard = false;
    let sithLords = props.sithLords;
    for(let g=0; g<props.numSithLordSlots; g++) {
      let thisSithLord = sithLords[g];
      if (thisSithLord && thisSithLord.homeworld && thisSithLord.homeworld.id === props.kenobiLocation.id) {
        return true;
      }
    }
    return false;
  }
}