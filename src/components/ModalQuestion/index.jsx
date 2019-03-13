import Modal from 'react-modal';
import React from 'react';
import './index.css';
import { OneAnswer } from './OneAnswer/index.jsx';
import { SeveralAnswer } from './SeveralAnswer/index.jsx';
import { customStyles } from './customStylesModal.js';
import shortid from 'shortid';

class ModalQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quests: {
        title: '',
        variants: [{ body: '', key: shortid.generate() }]
      },
      inputError: false
    };
  }

  removeInput = index => {
    const newQuests = this.state.quests;
    newQuests.variants.filter((item, i) => i !== index);
    this.setState({ quests: newQuests });
  };

  onChange = inputIndex => e => {
    const textValue = e.target.value;
    const newQuests = this.state.quests;

    newQuests.variants.map((value, index) => {
      if (index === inputIndex) {
        value.body = textValue;
        return value;
      } else {
        return value;
      }
    });

    this.setState({ quests: newQuests });
  };

  incCounterInput = () => {
    const newQuests = this.state.quests;
    newQuests.variants.push({ body: '', key: shortid.generate() });
    this.setState({ quests: newQuests });
  };

  decCounterInput = () => {
    const newQuests = this.state.quests;

    if (this.props.type === 'severalAnswer' && newQuests.variants.length == 2) {
      return null;
    }

    if (newQuests.variants.length == 1) {
      return null;
    }

    newQuests.variants.pop();
    this.setState({ quests: newQuests });
  };

  addNewQuest = () => {
    const { quests } = this.state;

    if (
      quests.variants.some(item => item.body.length === 0) ||
      quests.title.length === 0
    ) {
      this.setState({ inputError: true });
      setTimeout(() => this.setState({ inputError: false }), 1000);
    } else {
      this.setState({ inputError: false });
      this.props.addQuest(quests);
      this.props.triggerModal();
    }
  };

  addQuestion = e => {
    this.setState({ quests: { ...this.state.quests, title: e.target.value } });
  };

  afterOpenModal = () => {
    const { type } = this.props;

    type === 'severalAnswer'
      ? this.setState({
          quests: {
            ...this.state.quests,
            title: '',
            variants: [
              { body: '', key: shortid.generate() },
              { body: '', key: shortid.generate() }
            ],
            typeQuest: type
          }
        })
      : type === 'oneAnswer'
      ? this.setState({
          quests: {
            ...this.state.quests,
            variants: [{ body: '', key: shortid.generate() }],
            title: '',
            typeQuest: type
          }
        })
      : this.setState({
          quests: { ...this.state.quests, title: '', typeQuest: type }
        });
  };

  choose(type) {
    return (
      {
        oneAnswer: (
          <OneAnswer
            onChange={this.onChange}
            variants={this.state.quests.variants}
          />
        ),
        severalAnswer: (
          <SeveralAnswer
            variants={this.state.quests.variants}
            onChange={this.onChange}
            incCounterInput={this.incCounterInput}
            decCounterInput={this.decCounterInput}
            removeInput={this.removeInput}
          />
        )
      }[type] || null
    );
  }

  render() {
    const { type } = this.props;
    const { quests, inputError } = this.state;

    return (
      <Modal
        ariaHideApp={false}
        isOpen={this.props.isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.props.triggerModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-quest center">
          <button
            className="delete is-medium delete-button"
            onClick={this.props.triggerModal}
          >
            Close Modal
          </button>
          <div className="modal-error">
            {!!inputError && (
              <p className="help is-danger">there is an empty field</p>
            )}
          </div>
          <label className="label">Question</label>
          <input
            onChange={this.addQuestion}
            className={`input ${quests.title.length === 0 ? 'is-danger' : ''}`}
            type="text"
            placeholder="enter question"
          />
          {this.choose(type)}
          <button className="button margin-b" onClick={this.addNewQuest}>
            add on page
          </button>
        </div>
      </Modal>
    );
  }
}

export default ModalQuestion;
