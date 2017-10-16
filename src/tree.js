import React, { Component } from 'react'
import { Is, map } from './util';

export class Tree extends Component {

  constructor(props) {
    super(props);
    this.state = { open: false }
  }

  toggle = () => this.setState({ open: !this.state.open });

  branch(v, k, i) {
    return <Tree key={ k + '-' + i } data={ v } name={ k }/>
  }

  render() {
    const { open } = this.state;
    const { data, name } = this.props;
    return Is.obj(data)
      ? <nav className="tree">
          <h3 className="title" onClick={ this.toggle }>{ `${ '‣▾'[ +open ] } ${ name }`  }</h3>
          { open && map(data, this.branch, this) }
        </nav>
      : <label><i>{ name }</i> :<b>{ data }</b></label>;
  }
}