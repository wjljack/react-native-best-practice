/**
 * Created by lx on 16/6/30.
 */
/**
 * Created by lx on 16/6/30.
 */
import React, {View,TextInput, Text, StyleSheet,ListView,PixelRatio,ScrollView,TouchableOpacity,Image,Platform,TouchableHighlight} from "react-native";

var AV = require('leancloud-storage');
var APP_ID = 'yQvWzNn37xnO9c2saeIkTE4d-gzGzoHsz';
var APP_KEY = 'CEDi2aX8iBl8eUwmy2yLnkcU';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var ImagePicker = require('react-native-image-picker');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',

    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 21/ PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
    }
});
var metadataForm = {
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
};

export default class NewView extends React.Component {
    state = {
        avatarSource: null,
        userName:'',
        mobile:'',
        company:''
    };

    constructor () {
        super();
        var me=this;
        var token = PubSub.subscribe( 'test', function (dd) {
            // 声明一个 Todo 类型
            var MyUser = AV.Object.extend('MyUser');
            // 新建一个 Todo 对象
            var myUser = new MyUser();
            myUser.set('UserName', me.state.userName);
            myUser.set('Photo', me.state.avatarSource.uri);
            myUser.set('Mobile',me.state.mobile );
            myUser.set('Company', me.state.company);

            myUser.save().then(function (todo) {
                // 成功保存之后，执行其他逻辑.
                console.log('New object created with objectId: ' + todo.id);
            }, function (error) {
                // 失败之后执行其他逻辑
                console.log('Failed to create new object, with error message: ' + error.message);
            });
        } );
    }

    selectPhotoTapped() {
        const options = {
            quality: 0.5,
            maxWidth: 300,
            maxHeight: 300,
            allowsEditing: false,
            storageOptions: {
                skipBackup: true
            },
            cancelButtonTitle:"取消",
            takePhotoButtonTitle:"照相",
            chooseFromLibraryButtonTitle:"选择照片"
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
                console.log(response.data);
                // You can display the image using either:
                source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                // Or:
                // if (Platform.OS === 'android') {
                //   source = {uri: response.uri, isStatic: true};
                // } else {
                //   source = {uri: response.uri.replace('file://', ''), isStatic: true};
                // }
                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    render(){
        debugger;
        console.log(this.state.userName);
        return ( <View style={styles.container}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                    { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                        <Image style={styles.avatar} source={this.state.avatarSource} />
                    }
                </View>
            </TouchableOpacity>


            <TextInput placeholder="User Name"
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({userName:text})}
                value={this.state.userName}
            />
            <TextInput placeholder="Mobile"
                       style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                       onChangeText={(text) => this.setState({mobile:text})}
                       value={this.state.mobile}
            />
            <TextInput placeholder="Company"
                       style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                       onChangeText={(text) => this.setState({company:text})}
                       value={this.state.company}
            />

        </View>)
    }
}