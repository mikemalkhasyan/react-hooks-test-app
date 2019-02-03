import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './myStyles.scss';

function App() {
    const [captainKirkBio, setCaptainKirkBio] = useState({});

    const onGetKirkBio = async () => {
        try {
            const result = await fetch('http://stapi.co/api/v1/rest/character/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: {
                    title: 'James T. Kirk',
                    name: 'James T. Kirk',
                },
            });
            const resultJSON = await result.json();
            const character = resultJSON.characters[0];
            setCaptainKirkBio( character );
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        onGetKirkBio();
    });

    return (
        <div className="app">
            <img alt="header" src="/dist/images/header.jpeg" className="app-header" />
            <p>
                We are a most promising species, Mr. Spock, as predators go. Did you know that? I
                frequently have my doubts. I dont. Not any more. And maybe in a thousand years or so, we
                will be able to prove it.
            </p>
            <p>- Captain Kirk</p>
            <section>
                {Object.values(captainKirkBio).length === 0 ? (
                    <p>Loading User Information</p>
                ) : (
                    <p style={{ wordBreak: 'break-all' }}>{JSON.stringify(captainKirkBio)}</p>
                )}
            </section>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));