import React, {AppRegistry, Navigator, StyleSheet, Text, View} from 'react-native'
import store from './redux/configureStore'
import {Provider} from 'react-redux'
import RNRF, {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'
import {connect} from 'react-redux';
import HomeView from './views/HomeView/HomeView'
import NewView from './views/NewView/NewView'
import DetailView from './views/DetailView/DetailView'

import Pubsub from 'pubsub-js'
var SplashScreen = require('@remobile/react-native-splashscreen');


const reducerCreate = params=> {
    const defaultReducer = Reducer(params);
    return (state, action)=> {

        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

const scenes = Actions.create(
    <Scene key="modal" component={Modal}>
        <Scene key="root" >
            <Scene key="homeView" initial={true} component={HomeView}
                   rightButtonTextStyle={{fontSize:35, marginTop:-15}}
                   onRight={()=>Actions.newView()} rightTitle="+" type="replace" title="通讯录" />
            <Scene key="newView" component={NewView} title="新建联系人"
                   onRight={(a,b)=>{
                                PubSub.publish( 'test', 'hello world!' );
                            }} rightTitle="保存"  leftTitle="返回" onLeft={()=>
            {Actions.pop();
               PubSub.publish( 'reload', 'hello world!' );
            }}/>
            <Scene key="detailView" duaration={0} component={NewView} title="编辑联系人" onRight={(a,b,c,d)=>{
            PubSub.publish('test', 'hello world!' );
        }
            } rightTitle="保存" leftTitle="返回" onLeft={()=>
            {Actions.pop();
               PubSub.publish( 'reload', 'hello world!' );
            }}/>
        </Scene>
    </Scene>
);
export default class App extends React.Component {
    componentDidMount()
    {
        SplashScreen.hide();
    }
    render() {
        const Router = connect()(RNRF.Router);
        return (
            <Provider store={store}>
                <Router createReducer={reducerCreate}  scenes={scenes}>
                </Router>
            </Provider>
        );
    }
}

