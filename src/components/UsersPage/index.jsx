import React, { Component } from 'react';
import './index.css';
import Modal from 'react-modal';
import { customStyles } from '../ModalQuestion/customStylesModal.js';
import { schemaUser, getErrorMessage } from '../../helpers/validation.js';
import { ModalEditNameOrEmail } from './ModalEditNameOrEmail.jsx';
import { ModalEditRole } from './ModalEditRole.jsx';
import { history } from '../../index.jsx';

export default class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDropdown: null,
      modalIsOpen: false,
      type: null,
      valueForChange: { body: '', error: null },
      currentUserID: null,
      currentRole: 'user',
      currentSort: 'default'
    };
  }

  componentDidMount() {
    this.props.getUsersData(5, 1);
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27 && !!this.state.modalIsOpen) {
        this.triggerModal();
      }
    });
  }

  singOut = () => {
    this.props.signOut();
    localStorage.removeItem('token');
  };

  getNextPage = () => {
    this.props.getUsersData(
      5,
      this.props.usersData.page + 1,
      this.state.currentSort
    );
  };

  getPrevPage = () => {
    this.props.getUsersData(
      5,
      this.props.usersData.page - 1,
      this.state.currentSort
    );
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

  handleSelect = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: target.value
    });
    this.getSortUsers(target.value);
  };

  getSortUsers = sortType => {
    this.props.getUsersData(5, 1, sortType);
  };

  handleValiadate = ({ target }) => {
    let ErrorMessage;
    if (this.state.type === 'name') {
      ErrorMessage = getErrorMessage(target.value, schemaUser, 'firstName');
    }
    if (this.state.type === 'email') {
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
      if (this.state.type === 'name') {
        this.props.changeUserName(currentUserID, valueForChange.body, page);
      }
      if (this.state.type === 'email') {
        this.props.changeUserEmail(currentUserID, valueForChange.body, page);
      }
      this.setState({
        modalIsOpen: false,
        type: null,
        valueForChange: { ...this.state.valueForChange, body: '', error: null }
      });
    }
  };

  changeUserRole = () => {
    const { currentRole, currentUserID } = this.state;
    const { page } = this.props.usersData;
    this.props.changeUserRole(currentRole, currentUserID, page);
    this.triggerModal();
    if (this.props.currentUserId === currentUserID) {
      this.singOut();
    }
  };

  deleteUser = userId => {
    const { page } = this.props.usersData;
    this.props.deleteUser(userId, page);
  };

  choose(type) {
    return (
      {
        name: (
          <ModalEditNameOrEmail
            valueForChange={this.state.valueForChange}
            modalTitle="Name"
            handleChange={this.handleChange}
            handleValiadate={this.handleValiadate}
            sentEditing={this.sentEditing}
          />
        ),
        email: (
          <ModalEditNameOrEmail
            valueForChange={this.state.valueForChange}
            modalTitle="Email"
            handleChange={this.handleChange}
            handleValiadate={this.handleValiadate}
            sentEditing={this.sentEditing}
          />
        ),
        Role: (
          <ModalEditRole
            currentRole={this.state.currentRole}
            handleSelectChange={this.handleSelect}
            changeUserRole={this.changeUserRole}
          />
        )
      }[type] || null
    );
  }

  onEscPress = e => {
    if (e.keyCode === 27 && !!this.state.modalIsOpen) {
      this.triggerModal();
    }
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
                <span className="notification">Sort:</span>
                <div className="select">
                  <select
                    value={this.state.currentSort}
                    onChange={this.handleSelect}
                    name="currentSort"
                  >
                    <option value="default">Data: New to old</option>
                    <option value="old-to-new">Data: Old to new</option>
                    <option value="A-Z">Alphabetically: A-Z</option>
                    <option value="Z-A">Alphabetically: Z-A</option>
                  </select>
                </div>
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
                <th>Email</th>
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
                    <td
                      style={{
                        textAlign: 'center'
                      }}
                    >
                      {totalUsersSurveys[index] === 0 ? (
                        <span>{totalUsersSurveys[index]}</span>
                      ) : (
                        <a
                          className="button is-link"
                          onClick={() => {
                            this.props.setUserId(user._id);
                            history.push('/surveys-admin');
                          }}
                        >
                          {totalUsersSurveys[index]}
                        </a>
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
                                  type: 'name',
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
                                  type: 'email',
                                  modalIsOpen: true,
                                  currentDropdown: null,
                                  currentUserID: user._id
                                })
                              }
                            >
                              Email
                            </a>
                            <a
                              className="dropdown-item"
                              onClick={() =>
                                this.setState({
                                  type: 'Role',
                                  modalIsOpen: true,
                                  currentDropdown: null,
                                  currentUserID: user._id
                                })
                              }
                            >
                              Role
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
              {this.choose(this.state.type)}
              <button
                className="delete is-medium delete-button"
                onClick={() => {
                  this.triggerModal();
                  this.setState({
                    valueForChange: {
                      ...this.state.valueForChange,
                      body: '',
                      error: null
                    }
                  });
                }}
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
