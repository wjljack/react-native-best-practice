import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import store from './redux/configureStore'
import {Provider} from 'react-redux'
import RNRF, {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';
import HomeView from './views/HomeView/HomeView'
import ReduxDemo from './views/ReduxDemo/ReduxDemo'



const reducerCreate = params=> {
    const defaultReducer = Reducer(params);
    return (state, action)=> {
       
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};
export default class App extends React.Component {

    render() {
        const Router = connect()(RNRF.Router);
        return (
            <Provider store={store}>
                <Router createReducer={reducerCreate}>
                    <Scene key="modal" component={Modal}>
                        <Scene key="root" hideNavBar={true}>
                            <Scene key="homeView" initial={true} component={HomeView} title="HomeView"/>
                            <Scene key="reduxDemo"  component={ReduxDemo} title="ReduxDemo"/>

                        </Scene>
                    </Scene>
                </Router>
            </ Provider >
        );
    }
}

