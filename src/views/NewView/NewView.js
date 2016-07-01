/**
 * Created by lx on 16/6/30.
 */
/**
 * Created by lx on 16/6/30.
 */
import React, {
    View,
    Alert,
    TextInput,
    Text,
    StyleSheet,
    ListView,
    PixelRatio,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform,
    TouchableHighlight
} from "react-native";

var AV = require('leancloud-storage');
var APP_ID = 'yQvWzNn37xnO9c2saeIkTE4d-gzGzoHsz';
var APP_KEY = 'CEDi2aX8iBl8eUwmy2yLnkcU';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var ImagePicker = require('react-native-image-picker');


export default class NewView extends React.Component {
    state = {
        avatarSource: null,
        user: {

            UserName: '',
            Mobile: '',
            Company: '',
            Photo: null
        },

        metadataForm: {
            id: "",
            pageType: "appForm",
            entity: "MyUser",
            layout: {
                views: [
                    {
                        control: "Image",
                        text: "头像",
                        field: "Photo"
                    },
                    {
                        control: "TextBox",
                        text: "用户名",
                        field: "UserName"
                    },
                    {
                        control: "TextBox",
                        text: "公司",
                        field: "Company"
                    },
                    {
                        control: "TextBox",
                        text: "电话",
                        field: "Mobile"
                    }

                ]
            }
        }
    };

    componentWillMount() {
        if (this.props.name == "detailView") {

            var self = this;
            var query = new AV.Query('MyUser');
            // 查询 priority 是 0 的 Todo
            query.equalTo('objectId', self.props.navigationState.objectId);
            query.find().then(function (results) {

                if (results.length > 0) {
                    self.setState({
                        user: {
                            UserName: results[0].get('UserName'),
                            Mobile: results[0].get('Mobile'),
                            Company: results[0].get('Company'),
                            Photo: results[0].get('Photo'),
                        }
                    });
                }
            }, function (error) {
            });
        }
    }

    constructor() {

        super();
        console.log(this);
        var me = this;
        var token = PubSub.subscribe('test', function (dd) {
            console.log(me.state.user.UserName);
            if (me.state.user.UserName == false) {
                Alert.alert('姓名不能为空!')
                return;
            }
            if (me.state.user.Mobile == false) {
                Alert.alert('联系电话不能为空!')
                return;
            }
            if (me.props.name == "detailView") {
                console.log(me.state);
                // 声明类型
                // 第一个参数是 className，第二个参数是 objectId
                var myUser = AV.Object.createWithoutData('MyUser', me.props.navigationState.objectId);
                // 修改属性
                myUser.set('UserName', me.state.user.UserName);
                myUser.set('Mobile', me.state.user.Mobile);
                myUser.set('Company', me.state.user.Company);
                myUser.set('Photo', me.state.user.Photo);
                // 保存到云端
                myUser.save().then(function (todo) {
                    // 成功保存之后，执行其他逻辑.
                    Alert.alert(
                        '提示框',
                        '修改成功',
                    )
                    console.log(todo);
                }, function (error) {
                    // 失败之后执行其他逻辑
                    console.log('Failed to create new object, with error message: ' + error.message);
                });
            }
            else {
                // 声明一个 Todo 类型
                var MyUser = AV.Object.extend('MyUser');
                // 新建一个 Todo 对象
                var myUser = new MyUser();
                myUser.set('UserName', me.state.user.UserName);
                myUser.set('Photo', me.state.user.Photo);
                myUser.set('Mobile', me.state.user.Mobile);
                myUser.set('Company', me.state.user.Company);

                myUser.save().then(function (todo) {
                    // 成功保存之后，执行其他逻辑.

                    Alert.alert(
                        '提示框',
                        '新增成功',
                    )
                    console.log('New object created with objectId: ' + todo.id);
                }, function (error) {
                    // 失败之后执行其他逻辑
                    console.log('Failed to create new object, with error message: ' + error.message);
                });
            }
        });
    }

    selectPhotoTapped(field) {
        var self = this;
        const options = {
            quality: 0.5,
            maxWidth: 300,
            maxHeight: 300,
            allowsEditing: false,
            storageOptions: {
                skipBackup: true
            },
            cancelButtonTitle: "取消",
            takePhotoButtonTitle: "照相",
            chooseFromLibraryButtonTitle: "选择照片"
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var source;
                source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                var user = self.state.user;
                self.setState({user: Object.assign(user, {[field]: source.uri})});
            }
        });
    }


    handleValueChange(field, value, e) {
        var user = this.state.user;
        this.setState({user: Object.assign(user, {[field]: value})});
    }

    renderImage(cell) {
        let source = {uri: this.state.user.Photo, isStatic: true};
        return <TouchableOpacity onPress={this.selectPhotoTapped.bind(this, cell.field)}>
            <View style={[styles.avatar, styles.avatarContainer]}>
                  {this.state.user.Photo === null ? <Text>{cell.text}</Text> :
                      <Image style={styles.avatar} source={source}/> }
            </View>
        </TouchableOpacity>;
    }

    render() {

        var self = this;
        return (
            <ScrollView
                contentContainerStyle={{flex: 1}}
            >
                <View style={styles.container}>

                      {this.state.metadataForm.layout.views.map(cell=> {

                          return (()=> {
                              switch (cell.control) {
                                  case "TextBox":
                                      return <View style={styles.container}>
                                          <Text>
                                              {cell.text}
                                          </Text>
                                          <TextInput placeholder={cell.text}
                                                     style={{
                                                         height: 40,
                                                         width: 300,
                                                         borderColor: 'gray',
                                                         borderWidth: 1
                                                     }}
                                                     onChangeText={(text)=>self.handleValueChange(cell.field, text)}
                                                     value={self.state.user[cell.field]}
                                          />
                                      </View>;
                                  case "Image":
                                      return <View style={styles.container}>
                                                   {self.renderImage(cell)}
                                      </View>;
                                  default:
                                      return <Text>""</Text>;
                              }
                          })();
                      })}
                </View>
            </ScrollView>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop:50
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 21 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
    }
});