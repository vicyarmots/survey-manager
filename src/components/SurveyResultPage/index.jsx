import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import shortid from 'shortid';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactChartkick, { BarChart } from 'react-chartkick';
import Chart from 'chart.js';
ReactChartkick.addAdapter(Chart);

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

  getQuestResults = (page, indexQuest) => {
    return this.props.results.map(user => user.answers[page][indexQuest].value);
  };

  getCountMissed = (page, indexQuest) => {
    const questResults = this.getQuestResults(page, indexQuest);
    return questResults.filter(item => {
      if (Array.isArray(item)) {
        return !item.length;
      } else {
        return item === '';
      }
    }).length;
  };

  getPercentageRatio = (page, indexQuest, questLength) => {
    let questResults = this.getQuestResults(page, indexQuest);

    console.log(questResults);

    if (
      this.props.survey.pages[page].quests[indexQuest].typeQuest ===
      'severalAnswer'
    ) {
      questResults = questResults
        .reduce((acc, item) => acc.concat(item))
        .filter(item => item !== null);
    }

    console.log(questResults);

    if (
      this.props.survey.pages[page].quests[indexQuest].typeQuest ===
      'starRatings'
    ) {
      questLength = 6;
    }

    const countRepeat = {};
    for (let index = 0; index < questLength; index++) {
      countRepeat[index] = questResults.filter(item => item === index).length;
    }

    console.log(countRepeat);

    return '00';
  };

  render() {
    let tabTitles,
      tabContent = [];

    if (!!this.props.survey && !!this.props.results) {
      const { pages, setting } = this.props.survey;

      tabTitles = Object.keys(pages).map((key, index) => {
        return (
          <Tab key={shortid.generate()}>
            <h1>{pages[key].name}</h1>
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
                <div>
                  <span className="notification margin-r-20 ">
                    Responded:{' '}
                    {this.props.results.length -
                      this.getCountMissed(page, indexQuest)}
                  </span>
                  <span className="notification margin-r-20">
                    Missed: {this.getCountMissed(page, indexQuest)}
                  </span>
                </div>
                {item.typeQuest === 'oneAnswer' &&
                  item.variants.map((quest, index, array) => {
                    return (
                      <label key={shortid.generate()} className="checkbox">
                        {quest.body}{' '}
                      </label>
                    );
                  })}
                {item.typeQuest === 'severalAnswer' &&
                  item.variants.map((quest, index, array) => {
                    return (
                      <label key={shortid.generate()} className="checkbox">
                        {quest.body}
                        {this.getPercentageRatio(
                          page,
                          indexQuest,
                          array.length
                        )}
                      </label>
                    );
                  })}
                {item.typeQuest === 'starRatings' && (
                  <React.Fragment>
                    <StarRatings
                      starRatedColor="gold"
                      numberOfStars={5}
                      name="rating"
                      starDimension="25px"
                    />
                  </React.Fragment>
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
