import Modal from 'react-modal';
import React from 'react';
import './index.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    height: 'auto'
  }
};

class ModalQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      variants: [''],
      typeAsk: props.type
    };
  }

  onChange = inputIndex => e => {
    const textValue = e.target.value;
    const { variants } = this.state;
    const newArray = variants.map((value, index) =>
      index !== inputIndex ? value : textValue
    );
    this.setState({ variants: newArray });
  };

  incCounterInput = () =>
    this.setState({ variants: [...this.state.variants, ''] });

  decCounterInput = () => {
    const { variants } = this.state;
    if (variants.length == 1) {
      return;
    }
    const newArray = [...variants];
    newArray.pop();
    this.setState({ variants: newArray });
  };

  addNewAsk = () => {
    this.props.addAsk(this.state);
    this.setState({ title: '', variants: [''], typeAsk: '' });
    this.props.onClose();
  };

  addQuestion = e => {
    this.setState({ title: e.target.value });
  };

  closeModal = () => {
    this.props.onClose();
    this.setState({ title: '', variants: [''] });
  };

  afterOpenModal = () => {
    const { type } = this.props;
    type === 'severalAsk' && this.incCounterInput();
    type === 'text' &&
      this.setState({ title: '', variants: [], typeAsk: 'text' });
    type === 'starRatings' &&
      this.setState({ title: '', variants: [], typeAsk: 'starRatings' });
  };

  addVariant = e => {
    this.setState({ variants: [...this.state.variants, e.target.value] });
  };

  choose(type) {
    return {
      type_1: (<div>dasfdasf</div>)
    }[type] || null;
  }

  render() {
    const { type } = this.props;
    const { variants } = this.state;
    return (
      <Modal
        ariaHideApp={false}
        isOpen={this.props.isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.props.triggerModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-ask center">
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

          {variants.map((input, index) => (
            <input
              placeholder="enter answer"
              className="input margin-b"
              type="text"
              value={input}
              onChange={this.onChange(index)}
            />
          ))}

          <div className="modal-panel-button margin-b">
            {type === 'severalAsk' && (
              <React.Fragment>
                <button
                  onClick={this.decCounterInput}
                  className="button is-primary margin-10"
                >
                  -
                </button>
                <button
                  onClick={this.incCounterInput}
                  className="button is-primary margin-10"
                >
                  +
                </button>
              </React.Fragment>
            )}

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
