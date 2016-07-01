import React, {
    View,
    Text,
    Image,
    StyleSheet,
    PixelRatio,
    RefreshControl,
    ListView,
    ScrollView,
    TouchableHighlight
} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

var AV = require('leancloud-storage');
var APP_ID = 'yQvWzNn37xnO9c2saeIkTE4d-gzGzoHsz';
var APP_KEY = 'CEDi2aX8iBl8eUwmy2yLnkcU';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
AV._config.APIServerURL = "https://api.leancloud.cn";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 64
    },
    content: {
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: 'row',
        alignItems: 'center'
    },
    list: {
        backgroundColor: '#eeeeee'
    },
    titleBar: {
        height: 60,
        backgroundColor: '#05A5D1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleBarText: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 20,
        color: '#ffffff'
    },
    column: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    row: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    separator: {
        height: 1,
        backgroundColor: '#bbbbbb',

    },
    rowTitleText: {
        color: '#ea4c89',
        fontSize: 17,
        fontWeight: '500',
        width: 180,
        marginLeft: 20
    },
    rowDetailText: {
        fontSize: 17,
        color: '#999',
        width: 200
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 48,
        height: 48
    }
})

export default class HomeView extends React.Component {

    componentWillMount() {
        var query = new AV.Query('MyUser');
        var me = this;
        query.find().then(function (results) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            me.setState({
                dataSource: me.state.dataSource.cloneWithRows(
                    results
                ), refreshing: false
            });
        }, function (error) {
        });
    }

    constructor() {
        super()
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows([]),
            refreshing: false,
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});

        var query = new AV.Query('MyUser');
        var me = this;
        query.find().then(function (results) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            me.setState({
                dataSource: me.state.dataSource.cloneWithRows(
                    results
                ), refreshing: false
            });
        }, function (error) {
            this.setState({refreshing: false});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}/>}
                          dataSource={this.state.dataSource}
                          renderRow={this._renderRow}
                />
            </View>
        )
    }

    _renderRow(project, index) {


        let source = {uri: project.get('Photo'), isStatic: true};
        return (
            <View key={index}>
                <TouchableHighlight onPress={()=> Actions.detailView({objectId: project.get('objectId')})}>
                    <View style={[styles.column]}>

                          {source.uri == undefined ?
                              <Image style={{width: 48, height: 48, marginLeft: 10}}
                                     source={require('./contact.png')}></Image>
                              :
                              <View style={[styles.avatar, styles.avatarContainer]}>
                                  <Image style={{width: 41, height: 41, marginLeft: 18, borderRadius: 19,}}
                                         source={source}></Image>
                              </View>
                          }
                              <View style={styles.content}>
                                  <Text style={styles.rowTitleText}>
                                        {project.get("UserName")}
                                  </Text>
                                  <Text style={styles.rowDetailText}>
                                        {project.get("Mobile")}
                                  </Text>
                              </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator}/>
            </View>
        )
    }


}

