import React, { Component } from 'react';
import Select from 'react-select';
import Jobs from '../jobs.json';
import Industry from '../industry.json';

class Client extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      bio: '',
      description: '',
      skills: [],
      industry: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleChange(key, value) {
    this.setState({ ...this.state, [key]: value});
  }

  onSubmit(e) {
    var URL = 'http://localhost:3008/';
    const {description, skills, industry, name, email, bio} = this.state;
    let url = URL + 'api/client';   //`${}`
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        bio: bio,
        description: description,
        skills: skills,
        industry: industry
      })
    })
    .then( () =>{
      console.log('Response success');
    });
  }

  onChange(e) {
    e.map(e => {
      this.setState({
        skills: [...this.state.skills, e.value]
      });
    });
  }

  render() {
    const {description, skills, industry, name, email, bio} = this.props;

    return (
      <div className="client">
        <div className="panel">  
          <div className="panel-body">
            <div className="row">
              <div className="col-md-3"></div>
              <form onSubmit={(e) => this.onSubmit(e)} className="form-horizontal col-md-6">
                <div className="form-group">
                  <label className="control-label col-sm-2"  >Name</label>
                  <div className="col-sm-10">
                  <input className="form-control" name="name" value={name} required='' onChange={(e) => this.handleChange('name', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2"  >Email</label>
                  <div className="col-sm-10">
                  <input className="form-control" type="email" name="email" value={email} required='' onChange={(e) => this.handleChange('email', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2"  >Bio</label>
                  <div className="col-sm-10">
                  <textarea className="form-control" rows="6" maxLength="300" name="bio" value={bio} onChange={(e) => this.handleChange('bio', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2"  >Project Requirements</label>
                  <div className="col-sm-10">
                  <textarea className="form-control" rows="6" maxLength="300" name="description" value={description} required='' onChange={(e) => this.handleChange('description', e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2"  >Industry</label>
                  <div className="col-sm-10">
                    <Select 
                      required={true}
                      value={industry}
                      options={Industry}
                      placeholder='Industry Type'
                      onChange={(e) => this.handleChange('industry', e.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" >Skills</label>
                  <div className="col-sm-10">
                    <Select
                      required={true}
                      value={skills}
                      isMulti={true}
                      simpleValue={true}
                      options={Jobs}
                      placeholder='Skills'
                      onChange={(e) => this.onChange(e)}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="save-btn btn-primary pull-right ml-25">Save</button>
                </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Client;