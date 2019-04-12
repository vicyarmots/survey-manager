import React, { Component } from 'react';
import shortid from 'shortid';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactChartkick, { BarChart } from 'react-chartkick';
import Chart from 'chart.js';

import Modal from 'react-modal';
import { customStyles } from '../ModalQuestion/customStylesModal.js';

import './index.css';
ReactChartkick.addAdapter(Chart);

export default class SurveyResultPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
      results: null,
      modalIsOpen: false,
      modalData: null
    };
  }

  componentDidMount() {
    this.props.getSurveyResults(this.props.match.params.path);
    this.props.getSurveyById(this.props.match.params.path);
  }

  triggerModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

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

  getCountResponded = (page, indexQuest) =>
    this.props.results.length - this.getCountMissed(page, indexQuest);

  getPercentageRatio = (total, part) => Math.round((part / total) * 100);

  countPersentage = (page, indexQuest, anwersIndex) => {
    let questResults = this.getQuestResults(page, indexQuest);

    if (
      this.props.survey.pages[page].quests[indexQuest].typeQuest ===
      'severalAnswer'
    ) {
      questResults = questResults
        .reduce((acc, item) => acc.concat(item))
        .filter(item => item !== null);
    }

    const countRepeat = questResults.filter(item => item === anwersIndex)
      .length;

    return (
      <label>
        {this.getPercentageRatio(
          this.getCountResponded(page, indexQuest),
          countRepeat
        )}
        %<span> ({countRepeat} answers)</span>
      </label>
    );
  };

  getDataFromTextArea = (page, indexQuest) => {
    const questResults = this.getQuestResults(page, indexQuest).filter(
      item => !!item
    );

    return (
      <nav className="panel">
        <p className="panel-heading text-anwer-wrapp">All Answers</p>
        {questResults.map((item, index) => {
          return (
            <a
              className="panel-block"
              key={shortid.generate()}
              onClick={() => {
                this.setState({ modalData: item, modalIsOpen: true });
              }}
              name={index}
            >
              <span className="panel-icon">
                <i className="fas fa-envelope-open-text" aria-hidden="true" />
              </span>
              Respondent {index + 1}
            </a>
          );
        })}
      </nav>
    );
  };

  getLegendStarRate = (page, indexQuest) => {
    return Array.apply(null, { length: 5 }).map((item, index) => {
      return (
        <label key={shortid.generate()} className="box">
          <span>
            <strong>
              {' '}
              <span className="icon ">
                <i className="fas fa-star star-icon" />
              </span>
              {index + 1}.{' '}
            </strong>
          </span>
          {this.countPersentage(page, indexQuest, index + 1)}
        </label>
      );
    });
  };

  getDataForChart = (page, indexQuest, questLength) => {
    let questResults = this.getQuestResults(page, indexQuest);
    const countRepeat = {};
    let loopIndex = 0;

    if (
      this.props.survey.pages[page].quests[indexQuest].typeQuest ===
      'starRatings'
    ) {
      loopIndex = 1;
    }

    if (
      this.props.survey.pages[page].quests[indexQuest].typeQuest ===
      'severalAnswer'
    ) {
      questResults = questResults
        .reduce((acc, item) => acc.concat(item))
        .filter(item => item !== null);
    }

    for (loopIndex; loopIndex < questLength; loopIndex++) {
      countRepeat[loopIndex] = questResults.filter(
        item => item === loopIndex
      ).length;
    }

    const chartsData = Object.keys(countRepeat).map((key, index) => [
      index + 1,
      this.getPercentageRatio(
        this.getCountResponded(page, indexQuest),
        countRepeat[key]
      )
    ]);
    return chartsData;
  };

  getTabNames = () => {
    if (!!this.props.survey && !!this.props.results) {
      const { pages } = this.props.survey;
      return Object.keys(pages).map((key, index) => {
        return (
          <Tab key={shortid.generate()}>
            <h1>{pages[key].name}</h1>
          </Tab>
        );
      });
    }
  };

  getTabContent = () => {
    if (!!this.props.survey && !!this.props.results) {
      const { pages } = this.props.survey;
      return Object.keys(pages).map(page => {
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
                    Responded:
                    {this.getCountResponded(page, indexQuest)}
                  </span>
                  <span className="notification margin-r-20">
                    Missed: {this.getCountMissed(page, indexQuest)}
                  </span>
                </div>

                {
                  {
                    oneAnswer: (
                      <React.Fragment>
                        <div className="chart-wrapp">
                          <BarChart
                            data={this.getDataForChart(
                              page,
                              indexQuest,
                              item.variants.length
                            )}
                            min={0}
                            max={100}
                            width="50vw"
                            height={`${item.variants.length * 35}px`}
                            colors={[
                              [
                                '#999999',
                                '#ffff66',
                                '#ff5050',
                                '#00cc66',
                                '#66ccff'
                              ]
                            ]}
                            suffix="%"
                          />
                        </div>
                        <div className="legend">
                          {item.variants.map((quest, index) => {
                            return (
                              <label
                                key={shortid.generate()}
                                className="box stats margin-r-5"
                              >
                                <span className="margin-r-5">
                                  <strong>{index + 1}. </strong>
                                </span>
                                {this.countPersentage(page, indexQuest, index)}
                                <p className="wrapp-text">{quest.body}</p>
                              </label>
                            );
                          })}
                        </div>
                      </React.Fragment>
                    ),
                    severalAnswer: (
                      <React.Fragment>
                        <div className="chart-wrapp">
                          <BarChart
                            data={this.getDataForChart(
                              page,
                              indexQuest,
                              item.variants.length
                            )}
                            min={0}
                            max={100}
                            width="50vw"
                            height={`${item.variants.length * 35}px`}
                            colors={[
                              [
                                '#999999',
                                '#ffff66',
                                '#ff5050',
                                '#00cc66',
                                '#66ccff'
                              ]
                            ]}
                            suffix="%"
                          />
                        </div>
                        <div className="legend">
                          {item.variants.map((quest, index) => {
                            return (
                              <label
                                key={shortid.generate()}
                                className="box stats margin-r-5"
                              >
                                <span className="margin-r-5">
                                  <strong>{index + 1} .</strong>
                                </span>
                                {this.countPersentage(page, indexQuest, index)}
                                <p className="wrapp-text">{quest.body}</p>
                              </label>
                            );
                          })}
                        </div>
                      </React.Fragment>
                    ),
                    starRatings: (
                      <React.Fragment>
                        <div className="chart-wrapp">
                          <BarChart
                            data={this.getDataForChart(page, indexQuest, 6)}
                            min={0}
                            max={100}
                            width="50vw"
                            height={`${5 * 35}px`}
                            colors={[
                              [
                                '#999999',
                                '#ffff66',
                                '#ff5050',
                                '#00cc66',
                                '#66ccff'
                              ]
                            ]}
                            suffix="%"
                          />
                        </div>
                        <div className="legend-start-rating">
                          {this.getLegendStarRate(page, indexQuest)}
                        </div>
                      </React.Fragment>
                    ),
                    text: (
                      <React.Fragment>
                        {this.getDataFromTextArea(page, indexQuest)}

                        <Modal
                          isOpen={this.state.modalIsOpen}
                          style={customStyles}
                          ariaHideApp={false}
                        >
                          <div className="modal-quest center">
                            <p>{this.state.modalData}</p>
                            <button
                              className="delete is-medium delete-button"
                              onClick={this.triggerModal}
                            >
                              Close Modal
                            </button>
                            <div className="message" />
                          </div>
                        </Modal>
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

  getMain = () => {
    if (!this.props.results.length) {
      return (
        <div className="hero-body">
          <h1 className="subtitle">Suck</h1>
        </div>
      );
    } else {
      return (
        <Tabs
          selectedIndex={this.state.tabIndex}
          onSelect={tabIndex => {
            this.setState({ tabIndex });
          }}
        >
          <TabList> {this.getTabNames()} </TabList>
          {this.getTabContent()}
        </Tabs>
      );
    }
  };

  render() {
    return (
      <div className="hero-body">
        <div className="wrapp-main-content">
          <div className="has-text-centered passing-header">
            <div className="passing-header">
              <h1 className="title">{this.getSurveyName()}</h1>
            </div>
          </div>
          {this.getMain()}
        </div>
      </div>
    );
  }
}
