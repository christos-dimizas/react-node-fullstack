import React from 'react';

export default class Header extends React.Component {

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">Emaily</a>
                    <ul className="right">
                        <li><a>Login wih Google</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}