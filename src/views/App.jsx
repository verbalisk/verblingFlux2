import React from 'react';
import AppFlux from '../AppFlux';
import Dashboard from './Dashboard';
import ChatPanel from './ChatPanel';
import {FluxComponent} from 'flummox/addons/react';

export default class App extends React.Component {
  render() {
    const flux = new AppFlux();
    return (
    	     <div>
    	       <FluxComponent flux={flux} connectToStores={['sithlordstore', 'kenobistore']} >
    	         <Dashboard flux={flux} />
    	       </FluxComponent>
    	       <FluxComponent flux={flux} connectToStores={['chatstore', 'userstore']}>
    	          <ChatPanel flux={flux} /> 
			   </FluxComponent>
    	     </div>
    	   );
  }
}