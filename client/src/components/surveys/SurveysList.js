import React from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions';

class SurveysList extends React.Component {
    componentDidMount(){
        this.props.fetchSurveys();
    }

    renderSurveys(){
        return this.props.surveys.reverse().map(survey => (
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        Title: <span className="card-title">{survey.title}</span>
                        <p><span>Subject: </span>{survey.subject}</p>
                        <p>Mail Body: {survey.body}</p>
                        <p>Send on: {survey.dateSend && (new Date(survey.dateSend).toLocaleDateString())}</p>
                    </div>
                    <div className="card-action">
                        <a>YES: {survey.yes}</a>
                        <a>NO: {survey.no}</a>
                    </div>
                </div>
            </div>
        ));
    }

    render() {
        return (
            <div className="row">
                {this.renderSurveys()}
            </div>
        )
    }
}

function mapStateToProps({surveys}) {
    return {surveys};
}

export default connect(mapStateToProps, {fetchSurveys})(SurveysList);