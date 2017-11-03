import React from 'react'
import { IndexLink, Link } from 'react-router'

export class Navigation extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container">
                    <ul className="nav navbar-nav">
                        <li><IndexLink to={BASE_PATH} activeClassName="active">Forklaring</IndexLink></li>
                        <li><Link to={`${BASE_PATH}start`} activeClassName="active">Mine detaljer</Link></li>
                        <li><Link to={`${BASE_PATH}rows`} activeClassName="active">Utlegg</Link></li>
                        <li><Link to={`${BASE_PATH}done`} activeClassName="active">Ferdig</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}
