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
    TouchableHighlight,
    Switch
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
        user:{

            UserName:'',
            Mobile:'',
            Company:'',
            Photo:null
        },

        metadataForm :[]

    };

    componentWillMount()
    {
        var me=this;
        var query = new AV.Query('Metadata');
        // 查询 priority 是 0 的 Todo
        query.equalTo('objectId', '5774ee9b5bbb50005928f11c');
        query.find().then(function (results) {


            var data={};
            if(Platform.OS === 'ios') {
                data=results[0].get("data").pages.find(p=>p.route == 'user/:userId').layout.ios.components;
            }
            else
            {
                data=results[0].get("data").pages.find(p=>p.route == 'user/:userId').layout.android.components;

            }
            me.setState({metadataForm:data});

            if(me.props.name=="detailView")
            {

              console.log('ffff')
                var self=me;
                var query = new AV.Query('MyUser');
                // 查询 priority 是 0 的 Todo
                query.equalTo('objectId', self.props.navigationState.objectId);
                query.find().then(function (results) {

                    if(results.length>0)
                    {
                        let user={};
                        self.state.metadataForm.forEach(cell=> {
                            user[cell.layout.name]=results[0].get(cell.layout.name);
                        })
                        self.setState({ user:user});
                    }
                }, function (error) {
                });
            }


        });




        PubSub.unsubscribe('test');
        var token = PubSub.subscribe( 'test', function (dd) {
            console.log('test');


            if(me.props.name=="detailView") {

                // 声明类型
                // 第一个参数是 className，第二个参数是 objectId
                var myUser = AV.Object.createWithoutData('MyUser', me.props.navigationState.objectId);
                // 修改属性


                me.state.metadataForm.forEach(cell=> {
                    myUser.set(cell.layout.name, me.state.user[cell.layout.name]);

                })


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

                me.state.metadataForm.forEach(cell=> {
                    myUser.set(cell.layout.name, me.state.user[cell.layout.name]);

                })

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
        } );



    }



    constructor () {

        super();


    }

    selectPhotoTapped(field) {
        var self=this;
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
                source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                var user = self.state.user;
                self.setState({user: Object.assign(user, {[field]:source.uri})});
            }
        });
    }


    handleValueChange(field,value, e) {
        var user = this.state.user;
        this.setState({user: Object.assign(user, {[field]:value})});
    }

    renderImage(cell){
        let source={uri : this.state.user.Photo, isStatic: true};
        return  <TouchableOpacity onPress={this.selectPhotoTapped.bind(this,cell.layout.name)}>
            <View style={[styles.avatar,styles.avatarContainer]}>
                {this.state.user.Photo === null ?  <Image style={styles.avatar} source={require('../HomeView/contact.png')}/>:
                    <Image style={styles.avatar} source={source} /> }
            </View>
        </TouchableOpacity>;
    }

    render(){

        var self = this;
        return (
            <ScrollView
                contentContainerStyle={{flex: 1}}
            >
                <View style={styles.container}>

                      {this.state.metadataForm.map(cell=> {

                          return (()=> {
                              switch (cell.type) {
                                  case "TextBox":
                                  return <View style={styles.row}>
                                      <Text style={{width:100,alignSelf:'center',
                                          marginLeft:20,fontSize:18}}>
                                          {cell.layout.title}
                                      </Text>
                                      <TextInput placeholder={cell.layout.title}
                                                 style={{
                                                         height: 40,
                                                         width: 260,
                                                         borderColor: '#bababa',
                                                         borderWidth: 1,
                                                         flex:1,
                                                         paddingLeft:6
                                                     }}
                                                 onChangeText={(text)=>self.handleValueChange(cell.layout.name, text)}
                                                 value={self.state.user[cell.layout.name]}
                                      />
                                  </View>;
                                  case "Switch":
                                      return <View style={styles.row}>
                                          <Text style={{width:100,alignSelf:'center',
                                          marginLeft:20,fontSize:18}}>
                                              {cell.layout.title}
                                          </Text>

                                          <Switch
                                              onValueChange={(value) => self.handleValueChange(cell.layout.name, value)}
                                              style={{
                                                height: 40,
                                                         width: 260,
                                                         flex:1,
                                                         paddingLeft:6
                                                     }}
                                              value={self.state.user[cell.layout.name]} />


                                      </View>;
                                  case "Photo":
                                      return <View style={styles.row}>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop:50
    },
    row:
    {
      flexDirection:'row',
        alignSelf:'center',
        paddingTop:25
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