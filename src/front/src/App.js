import React, { Component } from 'react';
import Subscribe from './Subscribe';
import { Container } from 'reactstrap';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
              <Container className="themed-container">
              <Subscribe />
              </Container>
               
        );
    }
}

export default App;