import React from 'react'
import { Link } from 'react-router'

export class Home extends React.Component {
    render() {
        return <div className="container">
            <div className="jumbotron">
                <h1>Itera</h1>

                <h2>Utlegg for eksterne</h2>

                <p>Vennligst fyll ut følgende skjema.</p>

                <p className="text-primary">
                    <strong>
                        Når du er ferdig så må du sende resultat som PDF til din kontakt hos Itera via e-post.
                    </strong>
                </p>

                <p>Husk å legge ved kvittering på alle utleggene du fører.</p>

                <p>Data du legge inn i dette skjemaet sendes ikke videre fra nettleseren.</p>

                <p>For å lage PDF:</p>

                <ul>
                    <li>Mac - print dialog - save as PDF under PDF menyen</li>
                    <li>Linux - print to PDF eller print to file</li>
                    <li>Windows - enten må du ha en PDF printer installert eller bruk Chrome som har save as PDF som en del av sin print dialog</li>
                </ul>

                <Link className="btn btn-lg btn-primary" to={`${BASE_PATH}start`}>Start</Link>
            </div>
        </div>
    }
}
