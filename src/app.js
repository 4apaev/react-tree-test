import React, { Component } from 'react'
import ReactDom from 'react-dom';
import { Tree } from './tree';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { data: {}, value: 'app' }
  }

  componentDidMount() {
    this.fetch('/dump')
  }

  fetch = async value => {
      try {
        const res = await fetch(value);
        const data = await res.json();
        this.setState({ data, value, error: null });
      } catch(err) {
        this.setState({ error: err.message });
      }
    };

  handleChange = e => {
      e.target.reportValidity()
          && this.fetch(`/${ e.target.value }.json`)
    };

  render() {
    const { data, value, error } = this.state;
    return <div className="wrap">
      <header>
        <h2>Load Json</h2>
        <input
              type="text"
              onChange={ this.handleChange }
              required={ true }/>
      </header>
      { error
        ? <h2 className="err">{ error }</h2>
        : <Tree name={ value } data={ data } />
      }
    </div>
  }
}

export const init = () => ReactDom.render(<App/>, document.getElementById('app'));

