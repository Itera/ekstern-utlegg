import React from 'react'
import { IndexLink, Link } from 'react-router'

export default React.createClass({
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container">
                    <ul className="nav navbar-nav">
                        <li><IndexLink to="/" activeClassName="active">Forklaring</IndexLink></li>
                        <li><Link to="/start" activeClassName="active">Mine detaljer</Link></li>
                        <li><Link to="/rows" activeClassName="active">Utlegg</Link></li>
                        <li><Link to="/done" activeClassName="active">Ferdig</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
})

