/**
 * SurveyForm shows a form for a user to add input
 */
import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validataEmails';

import formFieldsConst from './formFields';

class SurveyForm extends React.Component {

    static renderFields() {
        return _.map(formFieldsConst, ({label, name}) => {
            return <Field component={SurveyField} type="text" label={label} name={name} key={name}/>
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {SurveyForm.renderFields()}
                    <Link to="/surveys" className="red btn-flat left white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors ={};
    errors.recipients = validateEmails(values.recipients || '');
    _.each(formFieldsConst, ({name, label}) =>{
        if (!values[name]){
            errors[name] = 'You must provide: ' + label;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false,
})(SurveyForm);