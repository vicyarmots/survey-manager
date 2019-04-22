import React, { Component } from 'react';
import './index.css';
import Modal from 'react-modal';
import { customStyles } from '../ModalQuestion/customStylesModal.js';
import { schemaUser, getErrorMessage } from '../../helpers/validation.js';

export default class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDropdown: null,
      modalIsOpen: false,
      modalTitle: '',
      valueForChange: { body: '', error: null },
      currentUserID: null
    };
  }

  componentDidMount() {
    this.props.getUsersData(5, 1);
  }

  getNextPage = () => {
    this.props.getUsersData(5, this.props.usersData.page + 1);
  };

  getPrevPage = () => {
    this.props.getUsersData(5, this.props.usersData.page - 1);
  };

  triggerModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  handleChange = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: {
        ...this.state[target.name],
        body: target.value
      }
    });
  };

  handleValiadate = ({ target }) => {
    let ErrorMessage;
    if (this.state.modalTitle === 'Name') {
      ErrorMessage = getErrorMessage(target.value, schemaUser, 'firstName');
    }
    if (this.state.modalTitle === 'Email') {
      ErrorMessage = getErrorMessage(target.value, schemaUser, 'login');
    }

    if (!!ErrorMessage) {
      this.setState({
        ...this.state,
        [target.name]: {
          ...this.state[target.name],
          error: ErrorMessage
        }
      });
    } else {
      this.setState({
        ...this.state,
        [target.name]: {
          ...this.state[target.name],
          error: null
        }
      });
    }
  };

  sentEditing = () => {
    const { valueForChange, currentUserID } = this.state;
    const { page } = this.props.usersData;
    if (!valueForChange.body && !valueForChange.error) {
      this.props.addToast('Please enter data', 'is-info');
    }
    if (!!valueForChange.body && !valueForChange.error) {
      if (this.state.modalTitle === 'Name') {
        this.props.changeUserName(currentUserID, valueForChange.body, page);
      }
      if (this.state.modalTitle === 'Email') {
        this.props.changeUserEmail(currentUserID, valueForChange.body, page);
      }

      this.setState({
        modalIsOpen: false,
        modalTitle: '',
        valueForChange: { ...this.state.valueForChange, body: '', error: null }
      });
    }
  };

  deleteUser = userId => {
    const { page } = this.props.usersData;
    this.props.deleteUser(userId, page);
  };

  getMain = () => {
    if (!!this.props.usersData) {
      const {
        usersData,
        total,
        page,
        pages,
        totalUsersSurveys
      } = this.props.usersData;
      return (
        <React.Fragment>
          <div className="users-h-paginate">
            <nav
              className="pagination margin-b-40"
              role="navigation"
              aria-label="pagination"
            >
              <div>
                <span className="notification margin-r-20">
                  Current page: {page}
                </span>
                <span className="notification margin-r-20">Pages: {pages}</span>

                <span className="notification margin-r-20">
                  Total users: {total}
                </span>
              </div>
              <div className="paginationWrapp">
                {page !== 1 && (
                  <a
                    onClick={this.getPrevPage}
                    className="pagination-previous"
                    title="This is the first page"
                  >
                    Previous
                  </a>
                )}
                {page !== pages && (
                  <a onClick={this.getNextPage} className="pagination-next">
                    Next page
                  </a>
                )}
              </div>
            </nav>
          </div>

          <table className="table is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr className="notification">
                <th>Name</th>
                <th>Role</th>
                <th>email</th>
                <th>Date of registration</th>
                <th>Total surveys</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.role.role}</td>
                    <td>{user.email}</td>
                    <td>{user.registrationDate}</td>
                    <td>
                      {totalUsersSurveys[index] === 0 ? (
                        <span>{totalUsersSurveys[index]}</span>
                      ) : (
                        <a>{totalUsersSurveys[index]}</a>
                      )}
                    </td>
                    <td>
                      <div
                        className={`dropdown ${
                          this.state.currentDropdown === index
                            ? 'is-active'
                            : ''
                        }`}
                      >
                        <div className="dropdown-trigger">
                          <a
                            className="is-outlined button margin-5-r"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu3"
                            onClick={() =>
                              this.setState({ currentDropdown: index })
                            }
                          >
                            <span> Edit</span>
                            <span className="fa-stack fa-lg">
                              <i className="fas fa-pen-square fa-stack-1x" />
                            </span>
                          </a>
                        </div>
                        <div
                          className="dropdown-menu"
                          id="dropdown-menu3"
                          role="menu"
                        >
                          <div className="dropdown-content">
                            <a
                              className="dropdown-item"
                              onClick={() =>
                                this.setState({
                                  modalTitle: 'Name',
                                  modalIsOpen: true,
                                  currentDropdown: null,
                                  currentUserID: user._id
                                })
                              }
                            >
                              Name
                            </a>
                            <a
                              className="dropdown-item"
                              onClick={() =>
                                this.setState({
                                  modalTitle: 'Email',
                                  modalIsOpen: true,
                                  currentDropdown: null,
                                  currentUserID: user._id
                                })
                              }
                            >
                              Email
                            </a>
                            <a
                              className="delete delete-button"
                              onClick={() =>
                                this.setState({ currentDropdown: null })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <a
                        className="is-outlined button"
                        onClick={() => this.deleteUser(user._id)}
                      >
                        <span className="fa-stack fa-lg">
                          <i className="fas fa-trash-alt fa-stack-1x" />
                        </span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal
            isOpen={this.state.modalIsOpen}
            style={customStyles}
            ariaHideApp={false}
          >
            <div className="modal-quest center">
              {!!this.state.valueForChange.error && (
                <p className="help is-danger input-help ">
                  {this.state.valueForChange.error}
                </p>
              )}
              <h1 className="subtitle margin-20-t">{this.state.modalTitle}</h1>
              <input
                type="text"
                onChange={this.handleChange}
                className="input"
                name="valueForChange"
                onBlur={this.handleValiadate}
                placeholder={`enter new ${this.state.modalTitle.toLowerCase()}`}
              />

              <button
                className="button is-success margin-t-10"
                onClick={this.sentEditing}
              >
                Edit
              </button>
              <button
                className="delete is-medium delete-button"
                onClick={this.triggerModal}
              >
                Close Modal
              </button>
            </div>
          </Modal>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <div className="hero-body">
        <div className="users-main-wrapp">{this.getMain()}</div>
      </div>
    );
  }
}
