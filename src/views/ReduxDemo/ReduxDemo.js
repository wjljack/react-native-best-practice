import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native'
import {bindActionCreators} from 'redux'
import {Actions} from "react-native-router-flux";
import {connect} from 'react-redux'
import {actions as couterActions} from '../../redux/modules/demo'
import Button from "react-native-button";

export class ReduxDemo extends Component {
    render() {
        console.log(this.props);
        return (

                <View style={styles.container}>
                    <Button onPress={()=>this.props.actions.increment(10)}>   calc :{this.props.counter}</Button>
                    <Button onPress={()=>this.props.actions.doubleAsync()}>    doublecalc :{this.props.counter}</Button>
                    <Button onPress={Actions.pop}>Go back</Button>
                </View>

        );
    }
}

const mapStateToProps = (state) => ({
    ...state
})

function  mapActionsToProps(dispatch) {
    return {
        actions:bindActionCreators({...couterActions},dispatch)
    }

}
export default connect(mapStateToProps,mapActionsToProps )(ReduxDemo)


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
