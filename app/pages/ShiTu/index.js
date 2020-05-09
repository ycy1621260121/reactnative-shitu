/**
 * @flow
 * Created by Rabbit on 2018/4/12.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  NativeModules,
  DeviceInfo,
  DeviceEventEmitter,
	Image
} from 'react-native';

import { ShiTuMobx } from '../../mobx/ShiTu';
import { BaiduMobx } from '../../mobx/Baidu';

import { GradientButton, PopoverActionSheetItem } from '../../components';
import BaseContainer from '../../components/BaseContainer';
import { System } from '../../utils';
import { observer, inject } from 'mobx-react';
import { PowerStore } from '../../store/PowerStore';

import * as Animatable from 'react-native-animatable';
const AnimationButton = Animatable.createAnimatableComponent(GradientButton);
const AnimationImageBackground = Animatable.createAnimatableComponent(ImageBackground);

import { ActionSheet, Theme, Toast } from 'teaset';
import * as ImagePicker from 'react-native-image-picker';
import { ConfigStore } from '../../store/ConfigStore';
import type { NavigationScreenProp } from 'react-navigation';
import {Buffer} from "buffer" 

type Props = {
  navigation: NavigationScreenProp<*>,
  powerStore: PowerStore,
  configStore: ConfigStore,
};

type State = {
  aaa: string
};


@inject('configStore', 'powerStore')
@observer
class ShiTu extends Component<Props, State> {
  shiTuMobx: ShiTuMobx;
	baiduMobx: BaiduMobx;

  constructor(props: Props) {
    super(props);
    ActionSheet.ActionSheetView.Item = PopoverActionSheetItem;
    this.shiTuMobx = new ShiTuMobx();
		this.baiduMobx = new BaiduMobx();

    this.state = {
      aaa: '',
			access_token:'',
			wordsresult:'',
			wordsresultOr:false,
			wordsresultOrs:false
    };
  }
	/**
     * 加密
     */
    encodeBase64Content(content) {
        return new Buffer(content).toString('base64')
    }
    /**
     * 解密
     */
    decodeBase64Content(base64Content) {
        return new Buffer(base64Content, 'base64').toString();
    }

  componentDidMount() {
    this.state.aaa;
		this.baiduload()

    DeviceEventEmitter.emit('badgeNumber', 20);
  }
	
	baiduload = async ()=>{
		this.props.configStore.showLoading();
		var baiduData = await this.baiduMobx.baidu();
		var baiduDatas = JSON.parse(baiduData);
		if(baiduDatas.expires_in ==2592000){
			console.log('baiduData',baiduDatas);
			this.props.configStore.hideLoading();
			this.setState({
				access_token:baiduDatas.access_token
			})
		}
		
	}

  /*selectedImagePicker = (type: string) => {
    const options = {
      quality: 0.5,
      allowsEditing: false,
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'ShiTu'
      }
    };

    const launchType = `launch${type}`;

    ImagePicker[launchType](options, async imageResponse => {
      //this.props.configStore.showLoading();
			console.log(imageResponse.uri)
			let datas={
					imgData :'data:image/png;base64,'+imageResponse.uri,
					access_token:this.state.access_token,
					api:'handwriting'
			};
			const uploadData = await this.baiduMobx.upload(datas);
			console.log('uploadData',uploadData)

      const imageData = await this.shiTuMobx.uploadImage(imageResponse);

      const params = {
        token: imageData.key
      };

      const searchDetail = await this.shiTuMobx.getSearchDetail(params);

      this.props.configStore.hideLoading();

      this.props.navigation.navigate('WebView', {
        uri: searchDetail.data.webURL
      });
    });
  };

  openImagePicker = async () => {
    const items = [
      {
        title: '拍照',
        onPress: () => this.selectedImagePicker('Camera')
      },
      {
        title: '选择相册',
        onPress: () => this.selectedImagePicker('ImageLibrary')
      }
    ];
    const cancelItem = { title: '取消' };
    ActionSheet.show(items, cancelItem);
  };*/
	
	//选择图片
    selectPhotoTapped() {
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
			let ToastExample = Toast.show({
			    text: '识别中,请稍后...',
			    position: 'center',
			    duration: 1000000,
			  });
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
				let datas={
						imgData :'data:image/png;base64,'+response.data,
						access_token:this.state.access_token,
						api:'bankcard'//handwriting
				};
				const uploadData = await this.baiduMobx.upload(datas);
				let   uploadDatas  =JSON.parse(uploadData);
				Toast.hide(ToastExample);
				Toast.show({
				    text: '识别成功',
				    position: 'center',
				    duration: 1000,
				  });
				console.log(uploadDatas);
				if(uploadDatas.words_result){
					this.setState({
						wordsresult:uploadDatas.words_result,
						wordsresultOr:true
					})
				}
				if(uploadDatas.result){
					this.setState({
						wordsresult:uploadDatas.result,
						wordsresultOrs:true
					})
				}
								

                this.setState({
                    avatarSource: source
                });
            }
        });
    }
		
		uploadVideo(){
			
		}

  render() {
		let wordsresultOr =this.state.wordsresultOr ?(<View>
						{this.state.wordsresult.map((item,index) => {
						    return (
									<Text key={index} style={{color:'white',lineHeight:30}}>{item.words}</Text>
						    );
						})}
					</View>):null;
		let wordsresultOrs =this.state.wordsresultOrs ?(<View>
											<Text style={{color:'white',lineHeight:30}}>{this.state.wordsresult.bank_card_number}</Text>
											<Text style={{color:'white',lineHeight:30,alignSelf:'center'}}>{this.state.wordsresult.bank_name}</Text>
							</View>):null;					
    return (
      <BaseContainer title={'识兔'} isTopNavigator={true}>
        <AnimationImageBackground
          style={styles.container}
          animation="fadeIn"
          source={{ uri: this.props.powerStore.ShiTuBackgroundImage }}
          blurRadius={System.Android ? 5 : 5}
        >
          <AnimationButton
            title={'百度智能识别'}
            animation="bounceInLeft"
            useNativeDriver
            titleStyle={styles.buttonTitle}
            gradientStyle={styles.button}
            onPress={this.selectPhotoTapped.bind(this)}
            btnStyle={styles.btnStyle}
          />
				{/*	
					<AnimationButton
					  title={'上传视频'}
					  animation="bounceInLeft"
					  useNativeDriver
					  titleStyle={styles.buttonTitle}
					  gradientStyle={styles.button}
					  onPress={this.uploadVideo.bind(this)}
					  btnStyle={styles.btnStyle}
					/>
					*/}
					{wordsresultOr}
					{wordsresultOrs}
					
					
        </AnimationImageBackground>
      </BaseContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  button: {
    borderRadius: 5
  },
  btnStyle: {
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 3,
    shadowOpacity: 1,
    elevation: 2,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
  }
});

export { ShiTu };
