import React, { Component } from 'react';
import shortid from 'shortid';
import './index.css';

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
      <div className="hero-body">
        <h1 className="title">Surveys</h1>
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
              <a
                onClick={this.getPrevPage}
                className="pagination-previous"
                title="This is the first page"
                disabled={this.props.page === 1 ? true : null}
              >
                Previous
              </a>
              <a
                onClick={this.getNextPage}
                className="pagination-next"
                disabled={
                  this.props.page === this.props.countPages ? true : null
                }
              >
                Next page
              </a>
            </div>
          </nav>
        ) : null}
        <div>
          {this.props.surveys.map((item, index) => {
            return (
              // <Link
              //   className="box"
              //   key={index}
              //   to={`surveys/${item.url}`}
              //   onClick={() => {
              //     this.setCurrent(item._id);
              //   }}
              // >
              //   {item.surveyName}
              // </Link>
              <a
                key={shortid.generate()}
                className="box"
                onClick={() => this.setCurrent(item._id, item.url)}
              >
                {item.surveyName}
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}
