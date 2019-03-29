import PassingPage from '../components/PassingPage/index.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';



// const mapStateToProps = store => {
//   return {
//     id: store.surveyReducer.currentSurveyId
//   };
// };

export default withRouter(
  connect(
    null,
    null
  )(PassingPage)
);
