import { Store } from 'flummox';

export default class KenobiStore extends Store {
  constructor(flux) {
    super(); 

    const kenobiActionIds = flux.getActionIds('kenobiactions');
    this.register(kenobiActionIds.updateKenobiLocation, this.handleUpdateKenobiLocation);
    
    this.state = {
        kenobiLocation: null
    };
  }

  handleUpdateKenobiLocation(newLocation) {
    this.setState({kenobiLocation: newLocation});
  }
}

