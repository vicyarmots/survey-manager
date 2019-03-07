import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import RightPad from '../RightPad/index.jsx';
import ModalQuestion from '../ModalQuestion/index.jsx';
import StarRatings from 'react-star-ratings';
import shortid from 'shortid';
import 'react-tabs/style/react-tabs.css';
import './index.css';

class SurveyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: {
        page_1: {
          quests: [],
          index: 1
        }
      },
      countPages: 1,
      showModal: false,
      tabIndex: 0,
      choosen: '',
      rating: 5
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
          index: newCount
        }
      },
      countPages: newCount
    }));
  };

  addQuest = value => {
    const page = `page_${this.state.tabIndex + 1}`;
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

  render() {
    const { pages, choosen, showModal } = this.state;

    const tabTitles = Object.keys(pages).map(key => {
      return (
        <Tab key={shortid.generate()}>
          <h1>Page {pages[key].index}</h1>
        </Tab>
      );
    });

    const tabContent = Object.keys(pages).map(page => {
      return (
        <TabPanel key={page}>
          {pages[page].quests.map(item => (
            <div className="notification  flex-column">
              <h1 className="subtitle">{item.title}</h1>
              <div className="variants" />
              {item.typeQuest === 'oneAnswer' && (
                <label className="checkbox ">
                  <input className="margin-10 ask-checkbox" type="checkbox" />
                  {item.variants[0]}
                </label>
              )}
              {item.variants.map(quest => {
                return (
                  <label className="checkbox">
                    <input className="margin-10 ask-checkbox" type="checkbox" />
                    {quest}
                  </label>
                );
              })}
              {item.typeQuest === 'starRatings' && (
                <StarRatings
                  rating={this.state.rating}
                  starRatedColor="gold"
                  changeRating={this.changeRating}
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
                  Questions: 0, Pages: {this.state.countPages}
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
            <RightPad triggerModal={this.triggerModal} />
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
