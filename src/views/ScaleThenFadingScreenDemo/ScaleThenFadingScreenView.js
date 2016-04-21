import React, {View, Image,Text, StyleSheet,Dimensions,Animated} from "react-native";

import {Actions} from "react-native-router-flux";
import {bindActionCreators} from 'redux'

import {connect} from 'react-redux'
import {actions as couterActions} from '../../redux/modules/demo'

var {height, width} = Dimensions.get('window');


export default class ScaleThenFadingScreenView extends React.Component {

    componentWillMount()
    {
        this._animatedValue = new Animated.Value(1);
       this._opanimatedValue= this._animatedValue.interpolate({
            inputRange: [1, 2],
            outputRange: [1, 0],
        });
    }
    render(){





        return (
            <Animated.View style={{transform: [{scale: this._animatedValue}],opacity:this._opanimatedValue}}>
                <Image source={require('./screen.png')}  style={{width: width, height: height}} />

            </Animated.View>
        );
    }

    componentDidMount()
    {

        Animated.timing(this._animatedValue, {
            toValue: 2,
            delay: 500,
            duration: 1000
        }).start()
    }
}

