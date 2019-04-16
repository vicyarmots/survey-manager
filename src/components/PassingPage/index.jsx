import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import shortid from 'shortid';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

import './index.css';

export default class PassingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
      pages: null,
      resultIsSent: false
    };
  }

  componentDidMount() {
    this.props.setPassingSurvey(this.props.match.params.path);
  }

  static getDerivedStateFromProps(props, state) {
    if (!!props.survey && !state.pages) {
      const newPages = {};
      Object.keys(props.survey.pages).map(
        key =>
          (newPages[key] = Array.apply(null, {
            length: props.survey.pages[key].quests.length
          }).map((item, index) => {
            const isMadatory = !!props.survey.pages[key].quests[index]
              .mandatoryQuest;
            if (isMadatory) {
              if (
                props.survey.pages[key].quests[index].typeQuest ===
                'severalAnswer'
              ) {
                return { value: [], mandatory: true };
              } else {
                return { value: '', mandatory: true };
              }
            } else {
              if (
                props.survey.pages[key].quests[index].typeQuest ===
                'severalAnswer'
              ) {
                return { value: [], mandatory: false };
              } else {
                return { value: '', mandatory: false };
              }
            }
          }))
      );
      return { pages: newPages };
    } else {
      return null;
    }
  }

  handleChange = (page, index, value) => {
    const newPages = this.state.pages;
    newPages[page][index].value = value;
    this.setState({ pages: newPages });
  };

  handleChechBox = (page, index, checkboxIndex) => {
    const newPages = this.state.pages;
    if (newPages[page][index].value[checkboxIndex] === checkboxIndex) {
      delete newPages[page][index].value[checkboxIndex];
    } else {
      newPages[page][index].value[checkboxIndex] = checkboxIndex;
    }
    this.setState({ pages: newPages });
  };

  sentSurveyRes = () => {
    const { pages } = this.state;
    const allAnswers = [];

    Object.keys(pages).map(key =>
      pages[key].map(answer => allAnswers.push(answer))
    );

    const isValid = !allAnswers.some(
      item => !!item.mandatory && item.value === ''
    );

    if (!!isValid) {
      if (!!this.props.userData) {
        this.props.saveSurveyResultAsync({
          answers: pages,
          userId: this.props.userData.id,
          surveyId: this.props.survey._id
        });
        this.setState({ resultIsSent: true });
      } else {
        this.props.saveSurveyResultAsync({
          answers: pages,
          surveyId: this.props.survey._id
        });
        this.setState({ resultIsSent: true });
      }
    } else {
      this.props.addToast('please fill in the required fields', 'is-info');
    }
  };

  showTitle = () => {
    return !!this.props.survey ? (
      <div className="has-text-centered passing-header">
        <div className="passing-header">
          <h1 className="title margin-r-10">{this.props.survey.surveyName}</h1>
          <button onClick={this.sentSurveyRes} className="button margin-10-l">
            Done
          </button>
        </div>
      </div>
    ) : null;
  };

  getTabNames = () => {
    if (!!this.props.survey) {
      const { pages, setting } = this.props.survey;
      return Object.keys(pages).map((key, index) => {
        return (
          <Tab key={shortid.generate()}>
            <h1>
              {!!setting.pageNumb && (
                <span className="tag is-light is-rounded margin-r-10">
                  {index + 1}
                </span>
              )}
              {pages[key].name}
            </h1>
          </Tab>
        );
      });
    }
  };

  getTabContent = () => {
    if (!!this.props.survey) {
      const { pages, setting } = this.props.survey;
      return Object.keys(pages).map(page => {
        return (
          <TabPanel key={page}>
            {pages[page].quests.map((item, indexQuest) => (
              <div key={item.title.key} className="notification  flex-column">
                <h1 className="subtitle">
                  {!!setting.questNumb && (
                    <span className="tag is-dark is-rounded margin-10">
                      {indexQuest + 1}
                    </span>
                  )}
                  {!!item.mandatoryQuest && <i className="fas fa-asterisk" />}
                  {item.title.body}
                </h1>
                {
                  {
                    oneAnswer: (
                      <React.Fragment>
                        {item.variants.map((quest, index) => {
                          return (
                            <label
                              key={shortid.generate()}
                              className="checkbox"
                            >
                              <input
                                className="margin-10 ask-checkbox"
                                type="radio"
                                name={`${indexQuest}`}
                                checked={
                                  this.state.pages[page][indexQuest].value ===
                                  index
                                }
                                onChange={() =>
                                  this.handleChange(page, indexQuest, index)
                                }
                              />
                              {quest.body}
                            </label>
                          );
                        })}
                      </React.Fragment>
                    ),
                    severalAnswer: (
                      <React.Fragment>
                        {item.variants.map((quest, index) => {
                          return (
                            <label
                              key={shortid.generate()}
                              className="checkbox"
                            >
                              <input
                                className="margin-10 ask-checkbox"
                                type="checkbox"
                                checked={
                                  this.state.pages[page][indexQuest].value[
                                    index
                                  ] === index
                                }
                                onChange={() =>
                                  this.handleChechBox(page, indexQuest, index)
                                }
                              />
                              {quest.body}
                            </label>
                          );
                        })}
                      </React.Fragment>
                    ),
                    starRatings: (
                      <React.Fragment>
                        {
                          <StarRatings
                            rating={+this.state.pages[page][indexQuest].value}
                            changeRating={countStars =>
                              this.handleChange(page, indexQuest, countStars)
                            }
                            starRatedColor="gold"
                            numberOfStars={5}
                            name="rating"
                            starDimension="25px"
                          />
                        }
                      </React.Fragment>
                    ),
                    text: (
                      <React.Fragment>
                        {
                          <textarea
                            className="textarea"
                            placeholder="enter answer"
                            value={this.state.pages[page][indexQuest].value}
                            onChange={({ target }) =>
                              this.handleChange(page, indexQuest, target.value)
                            }
                          />
                        }
                      </React.Fragment>
                    )
                  }[item.typeQuest]
                }
              </div>
            ))}
          </TabPanel>
        );
      });
    }
  };

  getMain = () => {
    return (
      <div className="passing-page-wrapp">
        {this.showTitle()}
        <div className="passing-page-content-wrapp">
          <Tabs
            selectedIndex={this.state.tabIndex}
            onSelect={tabIndex => {
              this.setState({ tabIndex });
            }}
          >
            <TabList> {this.getTabNames()} </TabList>
            {this.getTabContent()}
          </Tabs>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="hero-body">
        {!this.state.resultIsSent ? (
          this.getMain()
        ) : (
          <div className="center notification">
            <div className="center">
              <p className="notification is-success">
                The result of the survey saved!
              </p>
              <div>
                <Link to="/about-us" className="is-link margin-10">
                  About Us
                </Link>
                {!!this.props.userData ? (
                  <Link to="/survey-page" className="is-link margin-10">
                    New Survey
                  </Link>
                ) : (
                  <Link to="/sign-up" className="is-link margin-10">
                    Sign Up
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
