import Modal from 'react-modal';
import React from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '60%',
    width: '60%',
    display: 'flex',
    justifyContent: 'center'
  }
};

class ModalQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      variants: [],
      countInputAnswer: 1
    };
  }

  addNewAsk = () => {
    
    this.props.addAsk(this.state);
    this.setState({ title: '', variants: [], countInputAnswer: 1 });
  };

  addVariant = e => {
    this.setState({ variants: [...this.state.variants, e.target.value] });
  };

  addQuestion = e => {
    this.setState({ title: e.target.value });
  };

  addAnswerInput = () => {
    this.setState({ countInputAnswer: ++this.state.countInputAnswer });
  };

  collectInputsValue = () => {
    console.log(answerInputs);
  };

  render() {
    const { type } = this.props;
    const { countInputAnswer } = this.state;

    const answerInputs = [];

    for (let index = 0; index < countInputAnswer; index++) {
      answerInputs.push(
        <React.Fragment>
          <label className="label">Answer</label>
          <input
            onChange={this.addVariant}
            className="input is-small"
            type="text"
            placeholder="enter answer"
          />
        </React.Fragment>
      );
    }

    return (
      <Modal
        ariaHideApp={false}
        isOpen={this.props.isOpen}
        onRequestClose={this.props.nRequestClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-ask center">
          <button
            className="delete is-medium delete-button"
            onClick={this.props.onClose}
          >
            Close Modal
          </button>

          <label className="label">Question</label>
          <input
            onChange={this.addQuestion}
            className="input is-small"
            type="text"
            placeholder="enter question"
          />

          {answerInputs}

          <div className="modal-panel-button">
            <button onClick={this.addAnswerInput} className="button is-primary">
              +
            </button>
            <button className="button" onClick={this.addNewAsk}>
              add on page
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ModalQuestion;
