import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
 
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  ReactModal.setAppElement('#root');

  class App extends Component {
    constructor () {
      super();
      this.state = {
        showModal: false
      };
    }
    
    handleOpenModal =()=> {
      this.setState({ showModal: true });
    }
    
    handleCloseModal =()=> {
      this.setState({ showModal: false });
    }
    
    render () {
      const { guildline} = this.props; 
      return (
        <div>
          <button className="btn btn-small m-2" onClick={this.handleOpenModal}>personal CDS Project Guildlines</button>
          <ReactModal 
             isOpen={this.state.showModal}
             contentLabel="Project Guidline"
             style={customStyles}
          >
          <h4 className="card-title">Personal CDS Project Guidline</h4>
          {guildline && guildline.map(guide =>{
           return(
                <div className="grey-text note-date container" key={guide.id}>
                <div>{guide.content}</div>
                </div>
           )}
       )}
          <form>
            <button className="btn btn-small pink" onClick={this.handleCloseModal}>Ok, I got It</button>
          </form>
          </ReactModal>
        </div>
      );
    }
  }
  
  const mapStateToProps=(state)=>{
    return{
        guildline: state.firestore.ordered.projectGuidline
    }
}
export default compose(
    connect(mapStateToProps), 
    firestoreConnect([
        {collection: 'projectGuidline'}
    ])
)(App);

//   const props = {};

  ReactDOM.render(<App/>, document.getElementById('root'))