import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import shortid from 'shortid';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class SurveyResultPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
      pages: null
    };
  }

  componentDidMount() {
    this.props.getSurveyResults(this.props.match.params.path);
    this.props.getSurveyById(this.props.match.params.path);
  }

  render() {
    let tabTitles,
      tabContent = [];

    if (!!this.props.survey && !!this.props.results) {
      const { pages, setting } = this.props.survey;

      tabTitles = Object.keys(pages).map((key, index) => {
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

      tabContent = Object.keys(pages).map(page => {
        return (
          <TabPanel key={page}>
            {pages[page].quests.map((item, indexQuest) => (
              <div key={item.title.key} className="notification  flex-column">
                <h1 className="subtitle">
                  <span className="tag is-dark is-rounded margin-10">
                    {indexQuest + 1}
                  </span>
                  {!!item.mandatoryQuest && <i className="fas fa-asterisk" />}
                  {item.title.body}
                </h1>
                {item.typeQuest === 'oneAnswer' &&
                  item.variants.map((quest, index) => {
                    return (
                      <label key={shortid.generate()} className="checkbox">
                        {quest.body}
                      </label>
                    );
                  })}
                {item.typeQuest === 'severalAnswer' &&
                  item.variants.map((quest, index) => {
                    return (
                      <label key={shortid.generate()} className="checkbox">
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
    console.log('SurveyResultPage', this.props);
    return (
      <div className="hero-body">
        {!!this.props.survey ? (
          <div className="has-text-centered passing-header">
            <div className="passing-header">
              <h1 className="title">{this.props.survey.surveyName}</h1>
            </div>
          </div>
        ) : null}
        <div className="wrapp-main-content">
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
      </div>
    );
  }
}
