import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { getSurveyById } from '../../api/index.js';
import shortid from 'shortid';
import StarRatings from 'react-star-ratings';

export default class SurveyContainer extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      survey: [],
      tabIndex: 0
    };
  }

  componentDidMount() {
    getSurveyById(this.props.id)
      .then(res => this.setState({ survey: res.data.survey[0] }))
      .catch(err => console.log(err));
  }

  render() {
    const { pages, setting, surveyName } = this.state.survey;

    let tabTitles,
      tabContent = [];

    if (!!pages) {
      tabTitles = Object.keys(pages).map((key, index) => {
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

      tabContent = Object.keys(pages).map(page => {
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
                {item.typeQuest === 'oneAnswer' && (
                  <label className="checkbox ">
                    <input className="margin-10 ask-checkbox" type="checkbox" />
                    {item.variants[0].body}
                  </label>
                )}
                {item.typeQuest === 'severalAnswer' &&
                  item.variants.map(quest => {
                    return (
                      <label key={shortid.generate()} className="checkbox">
                        <input
                          className="margin-10 ask-checkbox"
                          type="checkbox"
                        />
                        {quest.body}
                      </label>
                    );
                  })}
                {item.typeQuest === 'starRatings' && (
                  <StarRatings
                    starRatedColor="gold"
                    numberOfStars={5}
                    name="rating"
                    starDimension="25px"
                  />
                )}
                {item.typeQuest === 'text' && (
                  <textarea className="textarea" placeholder="enter answer" />
                )}
              </div>
            ))}
          </TabPanel>
        );
      });
    }

    return (
      <div className="hero-body">
        <Tabs
          selectedIndex={this.state.tabIndex}
          onSelect={tabIndex => {
            this.setState({ tabIndex });
          }}
        >
          <TabList> {tabTitles} </TabList>
          {tabContent}
        </Tabs>
      </div>
    );
  }
}
