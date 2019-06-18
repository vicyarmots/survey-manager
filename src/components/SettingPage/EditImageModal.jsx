import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default class EditImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      image: null,
      crop: {
        unit: '%',
        width: 100,
        aspect: 1
      },
      percentCrop: {}
    };
  }

  uploadUserImage = () => {
    const { image, percentCrop, crop } = this.state;
    const tempImage = new Image();
    tempImage.src = this.state.src;
    const leftOff = Math.floor(tempImage.width * percentCrop.x * 0.01);
    const topOff = Math.floor(tempImage.height * percentCrop.y * 0.01);
    const newWidth = Math.floor(tempImage.width * percentCrop.width * 0.01);
    const newHeight = Math.floor(tempImage.height * percentCrop.height * 0.01);
    console.log(leftOff, topOff, newWidth, newHeight);
    this.props.uploadUserImage(image, topOff, leftOff, newWidth, newHeight);
  };

  getAreaForCrop = () => {
    const { crop, src } = this.state;
    return (
      <div className="image-crop-wrapp">
        <ReactCrop
          src={src}
          crop={crop}
          onImageLoaded={this.onImageLoaded}
          onComplete={this.onCropComplete}
          onChange={this.onCropChange}
          className="crop-image"
        />
        <button className="button" onClick={this.uploadUserImage}>
          Save
        </button>
      </div>
    );
  };

  getUploadInput = () => {
    return (
      <React.Fragment>
        <h2 className="subtitle">Upload new photo</h2>
        <p>We support JPG, GIF or PNG files.</p>
        <div class="file">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              name="resume"
              onChange={this.onSelectFile}
            />

            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload" />
              </span>
              <span class="file-label">Choose a file…</span>
            </span>
          </label>
        </div>
        <p className="help">
          If you have any problems with your upload, try using a smaller
          picture.
        </p>
      </React.Fragment>
    );
  };

  onSelectFile = ({ target }) => {
    if (target.files && target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result, image: target.files[0] })
      );
      reader.readAsDataURL(target.files[0]);
    }
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop, percentCrop });
  };

  render() {
    const { src } = this.state;

    return (
      <div className="edit-image-modal-wrapp">
        {!!src ? this.getAreaForCrop() : this.getUploadInput()}
        <a className="delete delete-button" onClick={this.props.triggerModal} />
      </div>
    );
  }
}
