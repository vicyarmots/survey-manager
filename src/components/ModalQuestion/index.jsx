import Modal from 'react-modal';
import React from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class ModalQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      variant: ''
    };
  }

  addNewAsk = () => {
    this.props.addAsk('page_1', this.state);
  };

  addVariant = e => {
    this.setState({ variant: e.target.value });
  };

  addQuestion = e => {
    this.setState({ title: e.target.value });
  };

  showState = () => {
    console.log(this.state);
  };

  render() {
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
          <label className="label">Answer</label>
          <input
            onChange={this.addVariant}
            className="input is-small"
            type="text"
            placeholder="enter answer"
          />
          <button className="button" onClick={this.addNewAsk}>
            add
          </button>
        </div>
      </Modal>
    );
  }
}

export default ModalQuestion;
