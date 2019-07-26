import React, { Component } from 'react'
import CDSGroup from "./CDSGroup";
import {connect} from 'react-redux';
import {editForm} from '../../store/actions/adminAction'
import LocalGovt from './LocalGovt';
import Accordion from 'react-collapsy';
import 'react-collapsy/lib/index.css';

export class Editable extends Component {
  state={
    year: '',
    batch: '',
    stream: '',
    scode: '',
    bcode: ''
}
handleChange=(e)=>{
  console.log(e.target.name);
    this.setState({
      [e.target.id]: e.target.value
    } )
}
handleSubmit=(e)=>{
    e.preventDefault();
    this.props.editForm(this.state)
}
  render() {
    const {error}= this.props

    return (
      <div >
        <Accordion title='Edit Registration Form'>

        <form onSubmit={this.handleSubmit} className="card">
        <div className="center red-text">
          {error ? <p>{error}</p> : null}
        </div>
        <div>
          <div className="row">
          <input className="col m-1" onChange={this.handleChange} placeholder="Year" id="year"/>
          <input className="col m-1" onChange={this.handleChange} placeholder="batch" id="batch"/>
          <input className="col m-1" onChange={this.handleChange} placeholder="Stream" id="stream"/>
          </div>
        </div>
        <div>
        <span>What should be the State Code Prefix?</span>
          <div className="col">
            <div className="row">
              <span className="first col-4"><input id="scode" onChange={this.handleChange} placeholder="Ak" type="text"/></span><input id="bcode" onChange={this.handleChange} placeholder="18C" className="second col-3" type="text" />
            </div>
          </div>
        </div>
        <button href="" className="pink lighten-1 btn-small waves-effect">Publish</button>
        </form>
        </Accordion>
        <Accordion title='CDS List'>
        <CDSGroup/>
        </Accordion>
        <br/>
        <Accordion title='Local Goverment List'>
        <LocalGovt/>
        </Accordion>
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
  // console.log(state);
  return{
    error: state.admin.error,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    editForm: (editables)=> dispatch(editForm(editables))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Editable)
