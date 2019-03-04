import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './index.css';
import RightPad from '../RightPad/index.jsx';
import ModalQuestion from '../ModalQuestion/index.jsx';

class SurveyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: {
        page_1: {
          id: 0,
          asks: [
            { title: 'Ask1', variant: 'Да' },
            { title: 'Ask2', variant: 'Да' }
          ]
        }
      },
      countPages: 1,
      showModal: false,
      tabIndex: 1
    };
  }

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
        [`pages_${countPages + 1}`]: {
          id: countPages,
          asks: []
        }
      },
      countPages: ++countPages
    }));
  };

  addAsk = (page, value) => {
    this.setState({
      pages: {
        [page]: {
          asks: [...this.state.pages[page].asks, value]
        }
      }
    });
  };

  render() {
    const { pages } = this.state;

    let tabTitles = [];
    let tabContent = [];

    for (let key in pages) {
      tabTitles.push(
        <Tab key={pages[key].id}>
          <h1>Page {pages[key].id + 1}</h1>
        </Tab>
      );
    }

    for (let item in pages) {
      tabContent.push(
        <TabPanel key={item}>
          {pages[item].asks.map(item => (
            <div className="notification">
              <h1 className="subtitle">{item.title}</h1>
              <div>
                <label className="checkbox ">
                  <input className="margin-10 ask-checkbox" type="checkbox" />
                  {item.variant}
                </label>
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
                  defaultIndex={1}
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
            <RightPad showModal={this.handleOpenModal} />
            <ModalQuestion
              isOpen={this.state.showModal}
              onRequestClose={this.handleOpenModal}
              onClose={this.handleCloseModal}
              addAsk={this.addAsk}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SurveyPage;
