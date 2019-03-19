import Modal from "react-modal";
import React from "react";
import "./index.css";
import { OneAnswer } from "./OneAnswer/index.jsx";
import { SeveralAnswer } from "./SeveralAnswer/index.jsx";
import { customStyles } from "./customStylesModal.js";
import shortid from "shortid";
import {
  schemaAnswer,
  schemaTitleQuest,
  validation
} from "../../helpers/validation.js";

class ModalQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quests: {
        title: { body: "", error: null },
        variants: [{ body: "", key: shortid.generate(), error: null }]
      },
      inputError: false
    };
  }

  removeInput = index => {
    if (this.state.quests.variants.length > 2) {
      const newQuests = this.state.quests;
      newQuests.variants = newQuests.variants.filter((item, i) => i !== index);
      this.setState({ quests: newQuests });
    }
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
    newQuests.variants.push({ body: "", key: shortid.generate(), error: null });
    this.setState({ quests: newQuests });
  };

  decCounterInput = () => {
    if (this.state.quests.variants.length > 2) {
      const newQuests = this.state.quests;
      newQuests.variants.pop();
      this.setState({ quests: newQuests });
    }
  };

  addNewQuest = () => {
    const { quests } = this.state;

    if (
      quests.variants.some(item => item.body.length === 0) ||
      quests.title.error !== null ||
      quests.title.length > 3
    ) {
      this.setState({ inputError: true });
      setTimeout(() => this.setState({ inputError: false }), 1000);
    } else {
      this.setState({ inputError: false });
      this.props.addQuest(quests);
      this.props.triggerModal();
    }
  };

  addQuestion = ({ target }) => {
    const newQuests = this.state.quests;
    newQuests.title.body = target.value;
    this.setState({ quests: newQuests });
  };

  afterOpenModal = () => {
    const { type } = this.props;

    if (type === "severalAnswer") {
      this.setState({
        quests: {
          ...this.state.quests,
          title: { body: "", error: null },
          variants: [
            { body: "", key: shortid.generate() },
            { body: "", key: shortid.generate() }
          ],
          typeQuest: type
        }
      });
    } else if (type === "oneAnswer") {
      this.setState({
        quests: {
          ...this.state.quests,
          variants: [{ body: "", key: shortid.generate() }],
          title: { body: "", error: null },
          typeQuest: type
        }
      });
    } else {
      this.setState({
        quests: {
          ...this.state.quests,
          title: { body: "", error: null },
          typeQuest: type
        }
      });
    }
  };

  handleValiadate = ({ target }) => {
    const { error } = validation(target.value, schemaTitleQuest, "body");
    const newQuests = this.state.quests;

    newQuests.title.error = !!error
      ? error.details[0].message.replace('"value"', "")
      : null;

    this.setState({ quests: newQuests });
  };

  AnswerValidate = (textValuem, index) => {
    const { error } = validation(textValuem, schemaAnswer, "body");
    const newQuests = this.state.quests;

    newQuests.variants[index].error = !!error
      ? error.details[0].message.replace('"value"', "")
      : null;

    this.setState({ quests: newQuests });
  };

  choose(type) {
    return (
      {
        oneAnswer: (
          <OneAnswer
            onChange={this.onChange}
            variants={this.state.quests.variants}
            AnswerValidate={this.AnswerValidate}
          />
        ),
        severalAnswer: (
          <SeveralAnswer
            variants={this.state.quests.variants}
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
              <p className="help is-danger">
                Please fill in the fields below on the page and try again
              </p>
            )}
          </div>
          <div className="input-wrapp quest-input-title">
            <label className="label">Question</label>
            <input
              onChange={this.addQuestion}
              onBlur={this.handleValiadate}
              className={`input ${
                quests.title.body.length === 0 ? "is-danger" : ""
              }`}
              type="text"
              placeholder="enter question"
            />
            {!!quests.title.error && (
              <p className="help is-danger input-help">{quests.title.error}</p>
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
