import React, { Component } from 'react';
import shortid from 'shortid';
import './index.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class Surveys extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.countPages) {
      this.props.getSurveys(this.props.userId, 5, 1);
    }
  }

  setCurrent = (id, url) => {
    this.props.setCurrentSurvey(id, url);
  };

  getNextPage = () => {
    this.props.getSurveys(this.props.userId, 5, this.props.page + 1);
  };

  getPrevPage = () => {
    this.props.getSurveys(this.props.userId, 5, this.props.page - 1);
  };

  render() {
    return (
      <div className="hero-body wrapp-main-content">
        <h1 className="title">Surveys</h1>
        {!this.props.surveys[0] && (
          <div className="notification">
            <h1 className="subtitle">You don't have surveys.</h1>
          </div>
        )}
        {this.props.countPages > 1 ? (
          <nav
            className="pagination margin-b-40"
            role="navigation"
            aria-label="pagination"
          >
            <div>
              <span className="notification margin-r-20">
                Pages: {this.props.countPages}
              </span>
              <span className="notification margin-r-20">
                Current page: {this.props.page}
              </span>
            </div>
            <div className="paginationWrapp">
              {this.props.page !== 1 && (
                <a
                  onClick={this.getPrevPage}
                  className="pagination-previous"
                  title="This is the first page"
                >
                  Previous
                </a>
              )}
              {this.props.page !== this.props.countPages && (
                <a onClick={this.getNextPage} className="pagination-next">
                  Next page
                </a>
              )}
            </div>
          </nav>
        ) : null}
        <div>
          {this.props.surveys.map(item => {
            return (
              <div className="survey-link-wrapp " key={shortid.generate()}>
                <a
                  className="box"
                  onClick={() => this.setCurrent(item._id, item.url)}
                >
                  {item.surveyName}
                </a>
                <CopyToClipboard
                  text={`http://localhost:8080/passing/${item._id}`}
                >
                  <button className="button copy-link">Copy link</button>
                </CopyToClipboard>
                <button>results</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
