import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import shortid from 'shortid';
import StarRatings from 'react-star-ratings';

export default class SurveyContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      survey: [],
      tabIndex: 0
    };
  }

  getTabNames = () => {
    const { pages, setting, surveyName } = this.props.survey;
    if (!!pages) {
      return Object.keys(pages).map((key, index) => {
        return (
          <Tab key={shortid.generate()}>
            <h1>
              {setting.pageNumb && (
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
    const { pages, setting, surveyName } = this.props.survey;
    if (!!pages) {
      return Object.keys(pages).map(page => {
        return (
          <TabPanel key={page}>
            {pages[page].quests.map((item, indexQuest) => (
              <div
                key={shortid.generate()}
                className="notification  flex-column"
              >
                <h1 className="subtitle">
                  {setting.questNumb && (
                    <span className="tag is-dark is-rounded margin-10">
                      {indexQuest + 1}
                    </span>
                  )}
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
                                name={item.title.key}
                              />
                              {quest.body}
                            </label>
                          );
                        })}
                      </React.Fragment>
                    ),
                    severalAnswer: (
                      <React.Fragment>
                        {item.variants.map(quest => {
                          return (
                            <label
                              key={shortid.generate()}
                              className="checkbox"
                            >
                              <input
                                className="margin-10 ask-checkbox"
                                type="checkbox"
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

  getSurveyName = () => !!this.props.survey && this.props.survey.surveyName;

  render() {
    return (
      <div className="hero-body">
        <div className="has-text-centered">
          <h1 className="title margin-r-10">{this.getSurveyName()}</h1>
        </div>
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
    );
  }
}
