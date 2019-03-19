import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import RightPad from "../RightPad/index.jsx";
import ModalQuestion from "../ModalQuestion/index.jsx";
import StarRatings from "react-star-ratings";
import SettingPad from "../SettingPad/index.jsx";
import shortid from "shortid";
import "react-tabs/style/react-tabs.css";
import "./index.css";
import { PageNameSchema, validation } from "../../helpers/validation.js";

class SurveyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: {
        page_1: {
          quests: [],
          index: 1,
          name: "Page 1",
          error: null
        }
      },
      countPages: 1,
      showModal: false,
      tabIndex: 0,
      choosen: "",
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
  }

  changeRating = newRating => {
    this.setState({
      rating: newRating
    });
  };

  triggerModal = type => {
    this.setState({
      showModal: !this.state.showModal,
      choosen: type || null
    });
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

  addQuest = value => {
    const { pages } = this.state;
    const page = Object.keys(pages)[this.state.tabIndex];
    this.setState({
      pages: {
        ...this.state.pages,
        [page]: {
          ...this.state.pages[page],
          quests: [...this.state.pages[page].quests, value]
        }
      }
    });
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
    const { error } = validation(textValue, PageNameSchema, "name");
    if (error) {
      const newPages = this.state.pages;
      newPages[page].error = error.details[0].message.replace('"value"', "");
      this.setState({ pages: newPages });
    } else {
      const newPages = this.state.pages;
      newPages[page].error = null;
      this.setState({ pages: newPages });
    }
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

  render() {
    const { pages, choosen, showModal, fields } = this.state;

    const tabTitles = Object.keys(pages).map((key, index) => {
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

    const tabContent = Object.keys(pages).map(page => {
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
              {item.typeQuest === "oneAnswer" && (
                <label className="checkbox ">
                  <input className="margin-10 ask-checkbox" type="checkbox" />
                  {item.variants[0].body}
                </label>
              )}
              {item.typeQuest === "severalAnswer" &&
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
              {item.typeQuest === "starRatings" && (
                <StarRatings
                  rating={this.state.rating}
                  starRatedColor="gold"
                  changeRating={this.changeRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="25px"
                />
              )}
              {item.typeQuest === "text" && (
                <textarea className="textarea" placeholder="enter answer" />
              )}

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
                  Questions: {this.countAllQuests()} , Pages:
                  {Object.keys(pages).length}
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
