import React, { Component } from 'react';

class SearchResult extends Component {
  constructor(){
    super();
    this.state = {
      experts_details: [],
    }
  }

  render() {
    return (
      <div className="dashboard row" >
				<h3 className="headname"><strong>{this.props.location.state.client.name}</strong></h3>
				<h4 className="head" >Experts details according to client requirements: </h4>
				{this.props.location.state && this.props.location.state.experts.map((e, i) => {
          console.log(e._source.resume);
          return (
            <div className="col-md-3" key={i}>
              <div className="panel">  
                  <div className="panel-body expert-details-main">
                    <div className="well">
                      <div>
												<ul className="experts-details">
													<li><strong>{e._source.name}</strong></li>
													<li>{e._source.email}</li>
												</ul>
											</div>
											<div>
												<ul className="extra-details">
													<li><label className="control-label mr10" >Description: </label>{e._source.description}</li>
													<li><label className="control-label mr10" >Industry: </label>{e._source.industry}</li>
													<li><label className="control-label mr10" >Skills: </label>{e._source.skills}</li>
                          <li>{e._source.resume && <a  href={`/uploads/${e._source.resume}`}>Download Resume</a>}</li>
												</ul>
											</div>
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

export default SearchResult;