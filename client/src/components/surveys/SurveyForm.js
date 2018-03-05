/**
 * SurveyForm shows a form for a user to add input
 */
import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validataEmails';

const newSurveyFields = [
    {label: 'Title', name: 'title'},
    {label: 'Subject Line', name: 'subject'},
    {label: 'Email Body', name: 'body'},
    {label: 'Recipient List', name: 'emails'},
];

class SurveyForm extends React.Component {

    static renderFields() {
        return _.map(newSurveyFields, ({label, name}) => {
            return <Field component={SurveyField} type="text" label={label} name={name} key={name}/>
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(value => {
                    console.log(value)
                })}>
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
    errors.emails = validateEmails(values.emails || '');
    _.each(newSurveyFields, ({name, label}) =>{
        if (!values[name]){
            errors[name] = 'You must provide: ' + label;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);