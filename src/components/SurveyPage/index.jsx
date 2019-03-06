import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './index.css';
import RightPad from '../RightPad/index.jsx';
import ModalQuestion from '../ModalQuestion/index.jsx';
const shortid = require('shortid');
import StarRatings from 'react-star-ratings';

class SurveyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: {
        page_1: {
          asks: []
        }
      },
      countPages: 1,
      showModal: false,
      tabIndex: 0,
      choosen: ''
    };
  }

  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating
    });
  };

  setTypeAsk = ({ target }) => {
    this.setState({ choosen: target.name });
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  addNewPage = () => {
    this.setState(({ countPages, pages }) => ({
      pages: {
        ...pages,
        [`page_${countPages + 1}`]: {
          asks: []
        }
      },
      countPages: ++countPages
    }));
  };

  addAsk = value => {
    const page = `page_${this.state.tabIndex + 1}`;
    this.setState({
      pages: {
        ...this.state.pages,
        [page]: {
          asks: [...this.state.pages[page].asks, value]
        }
      }
    });
  };

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue });
  };

  render() {
    const { pages, choosen, showModal, rating } = this.state;
    const tabContent = [];

    const tabTitles = Object.keys(pages).map(item => {
      return (
        <Tab key={shortid.generate()}>
          <h1>
            Page {item.length > 6 ? item.substring(6) : item.substring(5)}
          </h1>
        </Tab>
      );
    });

    for (let item in pages) {
      tabContent.push(
        <TabPanel key={shortid.generate()}>
          {pages[item].asks.map(item => (
            <div className="notification">
              <h1 className="subtitle">{item.title}</h1>
              <div className="variants flex-column">
                {item.typeAsk === 'text' && (
                  <textarea className="textarea" placeholder="enter answer" />
                )}
                {item.typeAsk === 'starRatings' && (
                  <StarRatings
                    rating={this.state.rating}
                    starRatedColor="gold"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name="rating"
                    starDimension="25px"
                  />
                )}
                {item.variants.map(item => {
                  return (
                    <label className="checkbox ">
                      <input
                        className="margin-10 ask-checkbox"
                        type="checkbox"
                      />
                      {item}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </TabPanel>
      );
    }

    return (
      <div className="survey-page column is-10">
        <div className="columns">
          <div className="column is-9">
            <div className="columns is-multiline">
              <div className="column is-full">
                <div className="box field survey-main">
                  <label className="label">New Survey</label>
                  <div className="control">
                    <input className="input is-small" type="text" />
                  </div>
                </div>
              </div>
              <div className="column is-full ">
                <p className="is-pulled-left margin-10">
                  Questions: 0, Pages: 0
                </p>
                <div className="is-pulled-right ">
                  <button className="button margin-10">Save</button>
                  <button
                    onClick={this.addNewPage}
                    className="button margin-10"
                  >
                    New page
                  </button>
                </div>
              </div>
              <div className="column is-full">
                <Tabs
                  defaultIndex={0}
                  onSelect={tabIndex => {
                    this.setState({ tabIndex });
                  }}
                >
                  <TabList>{tabTitles}</TabList>
                  {tabContent}
                </Tabs>
              </div>
            </div>
          </div>
          <div className="column is-3">
            <RightPad
              showModal={this.handleOpenModal}
              setTypeAsk={this.setTypeAsk}
            />

            <ModalQuestion
              isOpen={showModal}
              onRequestClose={this.handleOpenModal}
              onClose={this.handleCloseModal}
              type={choosen}
              addAsk={this.addAsk}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SurveyPage;
