import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import Layout from '../../_components/layout/layout.component';
import Reservations from '../../_components/reservations/reservations.component';

class Home extends Component {
    render() {
        const panes = [
            { menuItem: 'Layout', render: () => <Layout/> },
            { menuItem: 'Reservations', render: () => <Reservations/> },
        ]

        return (
            <div className="row">
                <div className="col"></div>
                <div className="col-12">
                    <h2>Restaurant Details...</h2>
                    <Tab panes={panes} menu={{ pointing: true }} />
                </div>
                <div className="col"></div>
            </div>
        )
    }
}

export default Home;