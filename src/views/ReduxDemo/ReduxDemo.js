import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native'

import {Actions} from "react-native-router-flux";
import {connect} from 'react-redux'
import {increment, doubleAsync, test} from '../../redux/modules/demo'
import Button from "react-native-button";

export class ReduxDemo extends Component {
    render() {
        console.log(this.props);
        return (
            <View style={styles.container2}>


                <View style={styles.container}>

                    <Text style={styles.welcome}>
                        Welcome to React Native!
                    </Text>
                    <Text style={styles.instructions}>
                        To get started, edit index.ios.js
                    </Text>


                    <TouchableHighlight onPress={()=>this.props.increment(10)}>
                        <View>
                            <Text style={styles.instructions}>
                                calc :{this.props.counter}
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={()=>this.props.doubleAsync()}>
                        <View>
                            <Text style={styles.instructions}>
                                doublecalc :{this.props.counter}
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <Button onPress={Actions.pop}>Go back</Button>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    counter: state.counter
})
export default connect((mapStateToProps), {
    increment,
    doubleAsync,
    test
})(ReduxDemo)


const styles = StyleSheet.create({
    container2: {
        flex: 1,
        flexDirection: 'column',
    },
    viewpager: {
        flex: 1,
    },
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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
