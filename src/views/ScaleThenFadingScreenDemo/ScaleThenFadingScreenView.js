import React, {View, Image,Text, StyleSheet,Dimensions,Animated} from "react-native";

import {Actions} from "react-native-router-flux";
import {bindActionCreators} from 'redux'

import {connect} from 'react-redux'
import {actions as couterActions} from '../../redux/modules/demo'

var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    // Flex to fill, position absolute,
    // Fixed left/top, and the width set to the window width
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'black',
        width: width
    }
});


export default class ScaleThenFadingScreenView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPage: false // inits to zero
        };
    }
    componentWillMount()
    {
        this._animatedValue = new Animated.Value(1);
     //   this._animatedValue.addListener(({value}) => {if(value==2){Actions.pop(); this.setState({showPage: true});}});
       this._opanimatedValue= this._animatedValue.interpolate({
            inputRange: [1, 2],
            outputRange: [1, 0],
        });
    }
    render(){





            return (  <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to the React Native Playground!
                </Text>
                {this.renderAnimatedView()}
            </View>)


    }
        renderAnimatedView()
        {
            return (<Animated.View style={[styles.overlay,{transform: [{scale: this._animatedValue}]},{opacity:this._opanimatedValue}]}>


                    <Image source={require('./screen.png')}  style={{width: width, height: height}} />


            </Animated.View>);

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

