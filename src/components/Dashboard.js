import React, { Component } from 'react';
import history from '../history';

class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      experts_details: [],
      clients_details: [],
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    var URL = 'http://localhost:3008/';
    let url = URL + 'api/clients_details';   //`${}`
    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(dataWrappedByPromise => dataWrappedByPromise.json())
    .then( (response) =>{
      this.setState({ clients_details: response });
    });
  }

  onSubmit(c) {
    var URL = 'http://localhost:3008/';
    let url = URL + `api/search/${c._id}`;   //`${}`
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: c.description,
        skills: c.skills,
        industry: c.industry
      })
    })
    .then(dataWrappedByPromise => dataWrappedByPromise.json())
    .then( (response) =>{
      history.push({pathname: '/search', state: {experts: response, client: c} }); 
    });
  }

  render() {
    return (
      <div className="dashboard row" >
        <h3 className="head" >Clients: </h3>
        {!this.state.clients_details.length ? <h4 className="head">No clients available</h4> : null}
        {this.state.clients_details && this.state.clients_details.map(c => {
          return (
            <div className="col-md-3" key={c._id} >
              <div className="panel" onClick={() => this.onSubmit(c)} >  
                  <div className="panel-body expert-details-main">
                    <div className="well">
                      <ul className="experts-details">
                        <li><strong>{c.name}</strong></li>
                        <li>{c.email}</li>
                      </ul>
                        <div><label className="control-label mr10" >Bio: </label>{c.bio}</div>
                    </div>
                  </div>
              </div>
            </div>
          )
        })
        }
      </div>
    );
  }
}

export default Dashboard;