/**
 * Survey new shows SurveyForm and SurveyReview
 */
import React from 'react';
import {reduxForm} from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends React.Component {
    state = {showFormReview: false};

    renderContent() {
        if (this.state.showFormReview) {
            return (
                <SurveyFormReview
                    onCancel={() => this.setState({showFormReview: false})}
                />
            )
        }
        return (<SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})} />);
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

// with the below trick if SurveyNew is unmounted then the form values are dumped
// (this is a default behaviour from redux-form)
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);