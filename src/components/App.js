import React from 'react'
import Navigation from './Navigation'
import DocumentTitle from 'react-document-title'

export default React.createClass({
    render() {
        return (
            <DocumentTitle title="Itera - extern utlegg">
                <div>
                    <Navigation/>

                    {this.props.children}

                    <footer>
                        <div className="container">
                            <div className="row">
                                <a href="https://github.com/Itera/ekstern-utlegg">Kildekode på github</a>
                            </div>
                        </div>
                    </footer>
                </div>
            </DocumentTitle>
        )
    }
})
