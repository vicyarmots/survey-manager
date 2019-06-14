import React, { Component } from 'react';
import './index.css';

export default class SettingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currDrobfield: ''
    };
  }

  setCurrDrobfield = ({ target }) => {
    this.setState({ currDrobfield: target.name });
  };

  setPasswordFields = () => {
    const { currDrobfield } = this.state;
    if (currDrobfield === 'password') {
      return (
        <div className="setting-fields-wrapp flex-sb-center">
          <div className="flex-col-sb  h-100p">
            <label class="label has-text-grey-light">Current password</label>
            <label class="label has-text-grey-light">New password</label>
            <label class="label has-text-grey-light">Repeat password</label>
          </div>
          <div className="flex-col-sb margin-b-10 h-100p f-ai-fs">
            <input
              type="text"
              className="input width-300"
              placeholder="current password"
            />
            <input
              type="text"
              className="input width-300 margin-t-20"
              placeholder="new password"
            />
            <input
              type="text"
              className="input width-300 margin-t-20"
              placeholder="repeat password"
            />
          </div>
          <div className="flex-col-sb h-100p">
            <button className="button" name="" onClick={this.setCurrDrobfield}>
              Cancel
            </button>
            <button className="button">Save</button>
          </div>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <label class="label has-text-grey-light">Password</label>
          <label class="label">******</label>
          <button
            className="button"
            name="password"
            onClick={this.setCurrDrobfield}
          >
            Change
          </button>
        </React.Fragment>
      );
    }
  };

  setEmailFields = () => {
    const { currDrobfield } = this.state;

    return (
      <div className="flex-col-sb w-100p">
        <div className="flex-sb-center">
          <label class="label has-text-grey-light">Email</label>
          <label class="label">{`${this.props.userData.email}`}</label>
          <button
            className="button w-80px"
            name={`${currDrobfield === 'email' ? '' : 'email'}`}
            onClick={this.setCurrDrobfield}
          >
            {`${currDrobfield === 'email' ? 'Cancel' : 'Change'}`}
          </button>
        </div>
        {currDrobfield === 'email' && (
          <div className="flex-sb-center f-ai-fs margin-t-20 margin-b-10">
            <label class="label has-text-grey-light">New email</label>
            <input
              type="text"
              className="input width-300"
              placeholder="new email"
            />
            <button className="button">Save</button>
          </div>
        )}
      </div>
    );
  };

  setUsernameFields = () => {
    const { currDrobfield } = this.state;
    return (
      <div className="flex-col-sb w-100p">
        <div className="flex-sb-center">
          <label class="label has-text-grey-light">Username</label>
          <label class="label">{`${this.props.userData.username}`}</label>
          <button
            className="button w-80px"
            name={`${currDrobfield === 'username' ? '' : 'username'}`}
            onClick={this.setCurrDrobfield}
          >
            {`${currDrobfield === 'username' ? 'Cancel' : 'Change'}`}
          </button>
        </div>
        {currDrobfield === 'username' && (
          <div className="flex-sb-center margin-t-20 margin-b-10">
            <label class="label has-text-grey-light">New username</label>
            <input
              type="text"
              className="input width-300"
              placeholder="new username"
            />
            <button className="button">Save</button>
          </div>
        )}
      </div>
    );
  };

  render() {
    console.log(this.props);
    return (
      <div className="hero-body wrapp-main-content">
        <div className="columns is-multiline">
          <div className="column is-full text-center box">
            <div className="title">General</div>
          </div>
          <div className="column is-full ">
            <div className="columns">
              <div className="user-profile-img-wrapp column dropdown is-3 is-hoverable">
                <div className="box user-profile-img-wrapp__box ">
                  <figure className="image is-3 ">
                    <img
                      class="is-rounded is-256x256 dropdown-trigger"
                      src="https://bulma.io/images/placeholders/256x256.png"
                    />
                  </figure>
                </div>
                <div class="dropdown-menu bottom-11-p edit-profile-img-toast">
                  <span>Edit</span>
                </div>
              </div>
              <div className="column">
                <div className="columns is-multiline">
                  <div className="column is-full flex-sb-center border-top-2-g">
                    {this.setUsernameFields()}
                  </div>
                  <div className="column is-full flex-sb-center border-top-2-g">
                    {this.setEmailFields()}
                  </div>
                  <div className="column is-full flex-sb-center border-top-2-g">
                    {this.setPasswordFields()}
                  </div>
                  <div className="column is-full flex-sb-center border-top-2-g ">
                    <label class="label has-text-grey-light">
                      Delete your profile
                    </label>
                    <button
                      className="button"
                      name="delete-profile"
                      onClick={this.setCurrDrobfield}
                    >
                      Delete profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
