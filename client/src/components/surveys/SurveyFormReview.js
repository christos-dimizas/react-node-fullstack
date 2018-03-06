import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import formFieldsConst from './formFields';
import {withRouter} from 'react-router-dom';
import * as actions from '../../actions'; // store action for submitSurvey

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {

    const reviewFiledList = _.map(formFieldsConst, ({name, label}) =>{
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });
    return (
        <div>
            <h5>Please Confirm Entries</h5>
            {reviewFiledList}
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
                Back
            </button>

            <button className="green white-text btn-flat right" onClick={() => submitSurvey(formValues, history)}>
                Send Survey
                <i className="material-icons right white-text">email</i>
            </button>
        </div>
    );
};

/**
 * This function includes the whole store from redux, which added there with the connect method.
 * What ever is returned on this function will appear as props in this component.
 */
function mapStateToProps(state) {
    return {formValues: state.form.surveyForm.values};
}
// You can get access to the history object’s properties and the closest <Route>'s match via the withRouter
// higher-order component. withRouter will pass updated match, location, and history props to the wrapped component
// whenever it renders.
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));