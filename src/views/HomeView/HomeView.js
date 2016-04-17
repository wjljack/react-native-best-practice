import React, {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    }
});

export default class HomeView extends React.Component {

    render(){
        return (
            <View style={styles.container}>
                <Text>Home View</Text>

                <Button onPress={Actions.reduxDemo}>Redux Demo</Button>

            </View>
        );
    }
}

