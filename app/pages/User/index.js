/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  BackHandler,
  DeviceEventEmitter,
	ImageBackground,
	AsyncStorage
} from 'react-native';
import { UserMobx } from '../../mobx/User';

import { Button, GradientButton, PopoverPickerViewItem } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Label, ListRow, PopoverPicker, Badge } from 'teaset';
import BaseContainer from '../../components/BaseContainer';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { observer, inject } from 'mobx-react';
import { PowerStore } from '../../store/PowerStore';
import * as ImagePicker from 'react-native-image-picker';
import ImagePickers from 'react-native-image-crop-picker';

type Props = {
  navigation: any,
  defaultValue: string,
	powerStore: PowerStore,
};


@inject('configStore', 'powerStore')
@observer
export class User extends Component<Props, any> {
  items: Array<any>;
  popView: any;
  badgeNumber: number = 10;
	userMobx: UserMobx;

  // static navigationOptions = ({ navigation }: { navigation: any }) => {
  //   const badgeNumber = navigation.state.params && navigation.state.params.badgeNumber;
  //
  //   const tabBarButtonComponent = (props: any) => {
  //     console.log('tabBarButtonComponent', props);
  //     return [
  //       <TouchableOpacity {...props} activeOpacity={1} style={{ width: SCREEN_WIDTH / 3 }} key={'tabBar'} />,
  //       <Badge
  //         count={badgeNumber}
  //         key={'Badge'}
  //         style={{ position: 'absolute', left: SCREEN_WIDTH - 60, top: 5 }}
  //       />
  //     ];
  //   };
  //   return { tabBarButtonComponent };
  // };

  static navigationOptions = {};

  constructor(props: Props) {
    super(props);
    //PopoverPicker.PopoverPickerView.Item = PopoverPickerViewItem;
    this.items = ['扫一扫', '加好友/群', '首付款', '高能舞室'];

    this.state = {
      selectedIndex: null,
      modalSelectedIndex: null,
			headImg:this.props.powerStore.headImg
    };
		this.userMobx = new UserMobx();
  }

  login = (type: string) => {
    if (type === 'router') {
      this.props.navigation.navigate('AuthRouter', { type });
    } else {
      this.props.navigation.navigate('Login', { type });
    }
  };
	async componentWillMount(){
		this.getUserinfos()
		/*const userinfoData =  await AsyncStorage.getItem('userinfoData');
		let userinfo = JSON.parse(userinfoData);
		if(userinfo.code ==0 ){
			this.setState({
				headImg:userinfo.list.headImg
			});
		}*/
		
	}
	getUserinfos = async ()=>{
		const sessionToken =  await AsyncStorage.getItem('sessionToken');
		let sessionTokenData = {
				sessionToken:sessionToken,
			};
		const userInfoData = await this.userMobx.userInfo(sessionTokenData);
		console.log(userInfoData)
		this.setState({
			headImg:userInfoData.list.headImg
		})
	}
	
	//选择图片
	  selectPhotoTappeds() {
	      const options = {
	          title: '', 
	          cancelButtonTitle: '取消',
	          takePhotoButtonTitle: '拍照', 
	          chooseFromLibraryButtonTitle: '选择相册', 
	          /*customButtons: [
	              {name: 'fb', title: 'Choose Photo from Facebook'},
	            ],*/
	          cameraType: 'back',
	          mediaType: 'photo',
	          videoQuality: 'high', 
	          durationLimit: 10, 
	          maxWidth: 300,
	          maxHeight: 300,
	          quality: 0.8, 
	          angle: 0,
	          allowsEditing: false, 
	          noData: false,
	          storageOptions: {
	              skipBackup: true  
	          }
	      };
	
	      ImagePicker.showImagePicker(options, async(response) => {
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
	              let source = { uri: response.uri };
	
	              // You can also display the image using data:
	              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
								const sessionToken =  await AsyncStorage.getItem('sessionToken');
								this.setState({
									headImg:'data:image/png;base64,'+response.data
								});
								let datas={
										headImg :'data:image/png;base64,'+response.data,
										sessionToken:sessionToken,
										lastModified:response.timestamp.split(':')[0]
								};
								const updatauserData = await this.userMobx.updatauser(datas);
								console.log(updatauserData)
								if(updatauserData.code==0){
									this.getUserinfos()
								}
								
	          }
	      });
	  }

  openModalPress = (popView: any) => {
    const blackStyle = {
      backgroundColor: '#fff',
      paddingLeft: 12,
      paddingRight: 12
    };

    popView.measure((x, y, width, height, pageX, pageY) => {
      PopoverPicker.show(
        { x: pageX + 1, y: pageY, width, height },
        this.items,
        this.state.modalSelectedIndex,
        (item, index) => this.setState({ modalSelectedIndex: index }),
        {
          showArrow: true,
          align: 'end',
          popoverStyle: blackStyle,
          overlayOpacity: 0.3,
          directionInsets: -3
        }
      );
    });
  };

  renderRightView = () => {
    return (
      <Button onPress={() => this.openModalPress(this.popView)}>
        <View ref={e => (this.popView = e)} style={{ marginRight: px2dp(20) }}>
          <Icon name={'md-add'} size={30} color={'white'} />
        </View>
      </Button>
    );
  };

  addBadgeNumber = () => {
    DeviceEventEmitter.emit('badgeNumber', this.badgeNumber++);
  };
	
	//选择并裁剪图片
	selectPhotoCut =  () =>{
		ImagePickers.openPicker({
			width: 300,
			height: 300,
			cropping: true,
			includeBase64:true,
			cropperStatusBarColor:'red',
			cropperToolbarColor:'red',
			cropperCircleOverlay:true,
			loadingLabelText:'正在上传...',
			cropperChooseText:'选择',
			cropperCancelText:'取消',
			forceJpg:true,
			useFrontCamera:true
		}).then(async(image) => {
			const sessionToken =  await AsyncStorage.getItem('sessionToken');
			this.setState({
				headImg:'data:image/png;base64,'+image.data
			});
			let datas={
					headImg :'data:image/png;base64,'+image.data,
					sessionToken:sessionToken,
					lastModified:image.creationDate
			};
			const updatauserData = await this.userMobx.updatauser(datas);
			console.log(updatauserData)
			if(updatauserData.code==0){
				this.getUserinfos()
			}
		});
	}

  render() {
    return (
      <BaseContainer
        style={styles.container}
        title={'用户中心'}
      >
        <View style={{ alignItems: 'center' }}>
					<TouchableOpacity activeOpacity={1} onPress={this.selectPhotoTappeds.bind(this)}>
					<ImageBackground
					          source={{uri:this.state.headImg}}
					          style={{width: 100, height: 100,borderRadius:100,overflow:'hidden'}}
										resizeMode="cover"
					      >
					</ImageBackground>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={1} onPress={this.selectPhotoCut.bind(this)}>
					<ImageBackground
					          source={{uri:this.state.headImg}}
					          style={{width: 100, height: 100,borderRadius:100,overflow:'hidden'}}
										resizeMode="cover"
					      >
					</ImageBackground>
					</TouchableOpacity>
        </View>
      </BaseContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gradientStyle: {
    borderRadius: 10,
    marginTop: 10
  },
  btnStyle: {
    height: 44,
    width: SCREEN_WIDTH / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTitleStyle: {
    color: 'white'
  }
});
