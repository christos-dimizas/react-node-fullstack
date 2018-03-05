/**
 * SurveyForm shows a form for a user to add input
 */
import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

const newSurveyFields = [
    {label: 'Title', name: 'title'},
    {label: 'Subject Line', name: 'subject'},
    {label: 'Email Body', name: 'body'},
    {label: 'Recipient List', name: 'emails'},
];

class SurveyForm extends React.Component {

    static renderFields() {
        return _.map(newSurveyFields, ({label, name}) => {
            return <Field component={SurveyField} type="text" label={label} name={name}/>
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

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);