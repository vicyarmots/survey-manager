import Modal from 'react-modal';
import React from 'react';
import './index.css';
import { OneAnswer } from './OneAnswer/index.jsx';
import { SeveralAnswer } from './SeveralAnswer/index.jsx';
import { customStyles } from './customStylesModal.js';

class ModalQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      variants: ['']
    };
  }

  removeInput = index => {
    let newVariants = this.state.variants.filter(
      item => item !== this.state.variants[index]
    );
    this.setState({ variants: newVariants });
  };

  onChange = inputIndex => e => {
    const textValue = e.target.value;
    const { variants } = this.state;
    const newArray = variants.map((value, index) =>
      index !== inputIndex ? value : textValue
    );
    this.setState({ variants: newArray });
  };

  addVariant = ({ target }) => {
    this.setState({ variants: [target.value] });
  };

  incCounterInput = () =>
    this.setState({ variants: [...this.state.variants, ''] });

  decCounterInput = () => {
    const { variants } = this.state;

    if (this.props.type === 'severalAnswer' && variants.length == 2) {
      return;
    }

    if (variants.length == 1) {
      return;
    }
    const newArray = [...variants];
    newArray.pop();
    this.setState({ variants: newArray });
  };

  addNewQuest = () => {
    this.props.addQuest(this.state);
    this.props.triggerModal();
  };

  addQuestion = e => {
    this.setState({ title: e.target.value });
  };

  afterOpenModal = () => {
    const { type } = this.props;

    type !== 'severalAnswer'
      ? this.setState({ title: '', typeQuest: type })
      : this.setState({ title: '', variants: ['', ''], typeQuest: type });
  };

  choose(type) {
    return (
      {
        oneAnswer: <OneAnswer addVariant={this.addVariant} />,
        severalAnswer: (
          <SeveralAnswer
            variants={this.state.variants}
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
          <label className="label">Question</label>
          <input
            onChange={this.addQuestion}
            className="input "
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
