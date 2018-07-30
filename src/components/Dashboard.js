import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      experts_details: []
    }
  }

  render() {
    return (
      <div className="dashboard row" >
        {this.props.location.state && this.props.location.state.experts.map(e => {
          return (
            <div class="col-md-3">
              <div className="panel">  
                  <div className="panel-body expert-details-main">
                    <div className="well">
                      <ul className="experts-details">
                        <li><strong>{e._source.name}</strong></li>
                        <li>{e._source.email}</li>
                        <li><label className="control-label mr10" >Description: </label>{e._source.description}</li>
                        <li><label className="control-label mr10" >Industry: </label>{e._source.industry}</li>
                        <li><label className="control-label mr10" >Skills: </label>{e._source.skills}</li>
                      </ul>
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