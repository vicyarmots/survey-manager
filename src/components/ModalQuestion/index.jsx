import Modal from 'react-modal';
import React from 'react';
import './index.css';
import { OneAnswer } from './OneAnswer/index.jsx';
import { SeveralAnswer } from './SeveralAnswer/index.jsx';
import { customStyles } from './customStylesModal.js';
import shortid from 'shortid';
import {
  schemaSurvey,
  Validation,
  getErrorMessage
} from '../../helpers/validation.js';

class ModalQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quest: { body: '', error: null, key: shortid.generate() },
      variants: [{ body: '', key: shortid.generate(), error: null }],
      inputError: false
    };
  }

  removeInput = index => {
    if (this.state.variants.length > 2) {
      const newVariants = this.state.variants.filter((item, i) => i !== index);
      this.setState({ variants: newVariants });
    }
  };

  onChange = inputIndex => e => {
    const textValue = e.target.value;
    const newVariants = this.state.variants;

    newVariants.map((value, index) => {
      if (index === inputIndex) {
        value.body = textValue;
        return value;
      } else {
        return value;
      }
    });

    this.setState({ variants: newVariants });
  };

  incCounterInput = () => {
    if (this.state.variants.length < 5) {
      const newVariants = this.state.variants;
      newVariants.push({ body: '', key: shortid.generate(), error: null });
      this.setState({ variants: newVariants });
    }
  };

  decCounterInput = () => {
    if (this.state.variants.length > 2) {
      const newVariants = this.state.variants;
      newVariants.pop();
      this.setState({ variants: newVariants });
    }
  };

  addNewQuest = () => {
    const { quest, variants, typeQuest } = this.state;

    if (variants.some(item => !item.body) || !!quest.error || !quest.body) {
      this.setState({ inputError: true });
      setTimeout(() => this.setState({ inputError: false }), 1000);
    } else {
      this.setState({ inputError: false });
      this.props.addQuest(quest, variants, typeQuest);
      this.props.triggerModal();
    }
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

  afterOpenModal = () => {
    const { type } = this.props;

    const defState = {
      quest: { body: '', error: null, key: shortid.generate() },
      typeQuest: type,
      variants: []
    };

    const variants =
      {
        oneAnswer: {
          variants: [{ body: '', key: shortid.generate() }],
          typeQuest: type,
          quest: { body: '', error: null, key: shortid.generate() }
        },
        severalAnswer: {
          variants: [
            { body: '', key: shortid.generate() },
            { body: '', key: shortid.generate() }
          ],
          typeQuest: type,
          quest: { body: '', error: null, key: shortid.generate() }
        }
      }[type] || defState;

    this.setState({ ...variants });
  };

  handleValiadate = ({ target }) => {
    Validation(target.value, schemaSurvey, target.name, this);
  };

  AnswerValidate = (textValuem, index) => {
    const newVariants = this.state.variants;
    newVariants[index].error = getErrorMessage(
      textValuem,
      schemaSurvey,
      'body'
    );
    this.setState({ variants: newVariants });
  };

  choose(type) {
    return (
      {
        oneAnswer: (
          <OneAnswer
            onChange={this.onChange}
            variants={this.state.variants}
            AnswerValidate={this.AnswerValidate}
          />
        ),
        severalAnswer: (
          <SeveralAnswer
            variants={this.state.variants}
            AnswerValidate={this.AnswerValidate}
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
    const { quest, inputError } = this.state;

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
              <p className="help is-danger">
                Please fill in the fields below on the page and try again
              </p>
            )}
          </div>
          <div className="input-wrapp quest-input-title">
            <label className="label">Question</label>
            <input
              onChange={this.handleChange}
              name={'quest'}
              onBlur={this.handleValiadate}
              className={`input ${!quest.body ? 'is-danger' : ''}`}
              type="text"
              placeholder="enter question"
            />
            {!!quest.error && (
              <p className="help is-danger input-help">{quest.error}</p>
            )}
          </div>

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
