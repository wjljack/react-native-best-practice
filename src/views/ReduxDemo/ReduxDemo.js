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

                <View style={styles.container}>
                    <Button onPress={()=>this.props.increment(10)}>   calc :{this.props.counter}</Button>
                    <Button onPress={()=>this.props.doubleAsync()}>    doublecalc :{this.props.counter}</Button>
                    <Button onPress={Actions.pop}>Go back</Button>
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

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
