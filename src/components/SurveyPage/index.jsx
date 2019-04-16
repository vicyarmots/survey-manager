import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import RightPad from '../RightPad/index.jsx';
import ModalQuestion from '../ModalQuestion/index.jsx';
import StarRatings from 'react-star-ratings';
import SettingPad from '../SettingPad/index.jsx';
import shortid from 'shortid';
import 'react-tabs/style/react-tabs.css';
import './index.css';
import {
  schemaSurvey,
  Validation,
  getErrorMessage
} from '../../helpers/validation.js';

const defaultState = {
  surveyName: { body: 'New Survey', error: null },
  pages: {},
  countPages: 0,
  showModal: false,
  tabIndex: 0,
  choosen: '',
  rating: 5,
  fields: {
    anonQuest: false,
    questNumb: false,
    pageNumb: false,
    randomQuests: false,
    asterisksFields: false,
    progressBar: false
  }
};

class SurveyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultState
    };
  }

  changeRating = newRating => {
    this.setState({
      rating: newRating
    });
  };

  triggerModal = type => {
    if (Object.keys(this.state.pages).length === 0) {
      this.props.addToast('pealse, add at least one question', 'is-info');
    } else {
      this.setState({
        showModal: !this.state.showModal,
        choosen: type || null
      });
    }
  };

  addNewPage = () => {
    const newCount = ++this.state.countPages;

    this.setState(({ pages }) => ({
      pages: {
        ...pages,
        [`page_${newCount}`]: {
          quests: [],
          index: newCount,
          name: `Page ${newCount}`,
          error: null
        }
      },
      countPages: newCount
    }));
  };

  addQuest = (quest, variants, type) => {
    const { pages } = this.state;
    const page = Object.keys(pages)[this.state.tabIndex];
    this.setState({
      pages: {
        ...this.state.pages,
        [page]: {
          ...this.state.pages[page],
          quests: [
            ...this.state.pages[page].quests,
            { title: quest, variants: [...variants], typeQuest: type }
          ]
        }
      }
    });
  };

  handleChange = ({ target }) => {
    if (target.value.length > 3) {
      this.setState({
        ...this.state,
        [target.name]: {
          ...this.state[target.name],
          body: target.value
        }
      });
    }
  };

  removeQuest = index => {
    const { pages } = this.state;
    const page = Object.keys(pages)[this.state.tabIndex];

    const newQuests = this.state.pages[page].quests.filter(
      (item, i) => i !== index
    );
    this.setState({
      pages: {
        ...this.state.pages,
        [page]: {
          ...this.state.pages[page],
          quests: [...newQuests]
        }
      }
    });
  };

  countAllQuests = () => {
    const { pages } = this.state;

    let currentCount = 0;

    Object.keys(pages).map(key => {
      currentCount += pages[key].quests.length;
    });

    return currentCount;
  };

  removePage = deleteKey => {
    const newPages = this.state.pages;
    delete newPages[deleteKey];
    this.setState({
      pages: newPages,
      tabIndex: 0
    });
  };

  changePageName = (textValue, page) => {
    if (textValue.length > 3) {
      const newPages = this.state.pages;
      newPages[page].name = textValue;
      this.setState({ pages: newPages });
    }
  };

  handleValidate = (textValue, page) => {
    const newPages = this.state.pages;
    newPages[page].error = getErrorMessage(textValue, schemaSurvey, 'name');
    this.setState({ pages: newPages });
  };

  triggerCheckField = ({ target }) => {
    const triggerField = target.name;
    const newFields = this.state.fields;
    newFields[triggerField] = !this.state.fields[triggerField];
    this.setState({ fields: newFields });
  };

  triggerMandatory = indexQuest => {
    const { pages } = this.state;
    const page = Object.keys(pages)[this.state.tabIndex];
    const newPages = pages;
    newPages[page].quests[indexQuest].mandatoryQuest = !newPages[page].quests[
      indexQuest
    ].mandatoryQuest;
    this.setState({ pages: newPages });
  };

  validateSuveyName = ({ target }) => {
    Validation(target.value, schemaSurvey, target.name, this);
    target.value = '';
  };

  saveSurvey = () => {
    if (!this.countAllQuests()) {
      this.props.addToast('pealse, add at least one question', 'is-info');
    } else {
      this.props.saveSurveyAsync({
        user: this.props.userData.id,
        surveyName: this.state.surveyName.body,
        pages: this.state.pages,
        setting: this.state.fields,
        url: this.state.surveyName.body
          .split(' ')
          .map(str => str.toLowerCase())
          .join('_')
          .concat('_', shortid.generate())
      });
      this.setState({ ...defaultState });
      this.props.addToast('The survey is saved!', 'is-success');
    }
  };

  getTabNames = () => {
    const { pages, fields } = this.state;
    return Object.keys(pages).map((key, index) => {
      return (
        <Tab key={shortid.generate()}>
          <h1>
            {fields.pageNumb && (
              <span className="tag is-light is-rounded margin-r-10">
                {index + 1}
              </span>
            )}
            {pages[key].name}
          </h1>
        </Tab>
      );
    });
  };

  getTabContent = () => {
    const { pages, fields } = this.state;
    return Object.keys(pages).map(page => {
      return (
        <TabPanel key={page}>
          <div className="wrap-page-name-input">
            <div className="input-wrapp">
              <input
                className="input page-name-input "
                type="text"
                placeholder="Enter page name"
                onChange={e => this.changePageName(e.target.value, page)}
                onBlur={e => this.handleValidate(e.target.value, page)}
              />
              {!!pages[page].error && (
                <p className="help is-danger input-help">{pages[page].error}</p>
              )}
            </div>

            <a
              onClick={() => this.removePage(page)}
              className="is-outlined delete-tag button"
            >
              delete page
              <span className="fa-stack fa-lg">
                <i className="fas fa-backspace fa-stack-1x" />
              </span>
            </a>
          </div>
          {pages[page].quests.map((item, indexQuest) => (
            <div key={shortid.generate()} className="notification  flex-column">
              <h1 className="subtitle">
                {fields.questNumb && (
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
                      {item.variants.map(quest => {
                        console.log(quest);
                        return (
                          <label key={shortid.generate()} className="checkbox">
                            <input
                              className="margin-10 ask-checkbox"
                              type="radio"
                              name={`${indexQuest}`}
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
                          <label key={shortid.generate()} className="checkbox">
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
                      <StarRatings
                        rating={this.state.rating}
                        starRatedColor="gold"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name="rating"
                        starDimension="25px"
                      />
                    </React.Fragment>
                  ),
                  text: (
                    <React.Fragment>
                      <textarea
                        className="textarea"
                        placeholder="enter answer"
                      />
                    </React.Fragment>
                  )
                }[item.typeQuest]
              }

              <div className="wrap-check-delete">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    onChange={e => this.triggerMandatory(indexQuest)}
                    checked={pages[page].quests[indexQuest].mandatoryQuest}
                  />
                  Mandatory
                </label>

                <a
                  className="button is-outlined"
                  onClick={() => this.removeQuest(indexQuest)}
                >
                  <span className="icon is-medium">
                    <i className="fas fa-trash-alt" />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </TabPanel>
      );
    });
  };

  render() {
    const { surveyName, pages, choosen, showModal } = this.state;
    return (
      <div className="survey-page column is-10">
        <div className="columns">
          <div className="column is-9">
            <div className="columns is-multiline">
              <div className="column is-full">
                <div className="box field survey-name-wrapp input-wrapp">
                  <label className="label margin-10">
                    {this.state.surveyName.body}
                  </label>
                  <div className="control margin-10">
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter survey name"
                      onChange={this.handleChange}
                      onBlur={this.validateSuveyName}
                      name={'surveyName'}
                    />
                    {!!surveyName.error && (
                      <p className="help is-danger input-help">
                        {surveyName.error}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="column is-full">
                <p className="is-pulled-left  margin-t-10">
                  <span className="notification margin-10">
                    Questions: {this.countAllQuests()}
                  </span>
                  <span className="notification">
                    Pages: {Object.keys(pages).length}
                  </span>
                </p>
                <div className="is-pulled-right ">
                  <button
                    onClick={this.saveSurvey}
                    className="button margin-10"
                  >
                    Save
                  </button>
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
          </div>
          <div className="column is-3">
            <RightPad triggerModal={this.triggerModal} />
            <SettingPad triggerCheckField={this.triggerCheckField} />
            <ModalQuestion
              isOpen={showModal}
              triggerModal={this.triggerModal}
              type={choosen}
              addQuest={this.addQuest}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SurveyPage;
