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
	AsyncStorage,
	Dimensions,
	ScrollView,
	ListView,
	Keyboard
} from 'react-native';

import { Button, GradientButton, PopoverPickerViewItem,CustomIcon } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Label, ListRow, PopoverPicker, Badge, Toast,Select } from 'teaset';
import BaseContainer from '../../components/BaseContainer';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { observer, inject } from 'mobx-react';
import { PowerStore } from '../../store/PowerStore';
import * as ImagePicker from 'react-native-image-picker';
import { System } from '../../utils';
import {  InputItem,TextareaItem,List } from '@ant-design/react-native';

import { IntellectualMobx } from '../../mobx/Intellectual';

type Props = {
  navigation: any,
  defaultValue: string,
	powerStore: PowerStore,
};
const {height:screenHeight,width:screenWidth} =  Dimensions.get('window');

@inject('configStore', 'powerStore')
@observer
export class Intellectualadd extends Component<Props, any> {
  intellectualMobx: IntellectualMobx;
  items: Array<any>;
  popView: any;
  badgeNumber: number = 10;
  

  static navigationOptions = {};

  constructor(props: Props) {
    super(props);
    //PopoverPicker.PopoverPickerView.Item = PopoverPickerViewItem;
		this.intellectualMobx = new IntellectualMobx();

    this.state = {
			title:'',
			content:'',
			jurisdiction:'',
			value:'著作权'
    };
  }

	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
	  this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
	  this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
	}
	 
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
	  this.keyboardDidShowListener.remove();
	  this.keyboardDidHideListener.remove();
	}
	 
	_keyboardDidShow() {
	    keyBoardIsShow = true;
	}
	 
	_keyboardDidHide() {
	    keyBoardIsShow = true;
	}
	lostBlur=()=>{
	    //退出软件盘
	    if (keyBoardIsShow) {
	       Keyboard.dismiss();
	    }
	}
  


  _addMore = async (end)=>{
		
	  let params = {
			title:this.state.title,
			content:this.state.content,
			jurisdiction:this.state.value
	  };
		//console.log(params)
	  const intellectualData = await this.intellectualMobx.intellectualadd(params);
	  if(intellectualData.code == 0){
			this.props.navigation.goBack();
			DeviceEventEmitter.emit('intellectualadd', params);
		}
    
  }

  componentDidMount() {
		
  }
	_onPress() {
        console.log("press");
    }
  

  render() {
		const	items = [
			'工业产权',
			'著作权',
		];
    return (
		
    <BaseContainer style={styles.container} title={'添加创新'} >
			<View style={{marginBottom:25}}>
				<InputItem
					ref={'InputText'}
            defaultValue=""
            clear
            placeholder=""
						returnKeyType="done"
						onChange={(text)=>{this.setState({
							 title:text
						})}}//输入框改变触发的函数
						 underlineColorAndroid="transparent"
          >
            标题
          </InputItem>
					
			</View>
			<View style={{marginBottom:25,borderBottomWidth:0.8,borderBottomColor:'#eee'}}>
			<View><Text style={{fontSize:16,paddingLeft:16,paddingTop:10,paddingBottom:10}}>内容</Text></View>
			<TextareaItem
				ref={'InputTextarea'}
			  rows={4}
			  placeholder=""
			  autoHeight
			  style={{ paddingVertical: 10,paddingLeft:16,paddingRight:16,paddingBottom:10 }}
				returnKeyType="done"
				onChange={(text)=>{this.setState({
					 content:text
				})}}//输入框改变触发的函数
				blurOnSubmit={true}
				underlineColorAndroid="transparent"
			/>
			</View>
			
			<View><Text style={{fontSize:16,paddingLeft:16,paddingTop:10,paddingBottom:10}}>标签</Text></View>
			<View style={{justifyContent: 'flex-start',alignItems: 'center',marginBottom:36}} >
				<Select
				style={{width: screenWidth-32,paddingLeft:16}}
				value={this.state.value}
				items={items}
				iconTintColor=''
				placeholder='请选择标签'
				pickerTitle='请选择标签'
				onSelected={(item, index) => this.setState({value: item})}
				
				/>
			</View>
			<View style={{ alignItems: 'center' }}>
				 <GradientButton
				   title={'提交'}
				   onPress={this._addMore.bind(this)}
				   gradientStyle={styles.gradientStyle}
				   titleStyle={styles.btnTitleStyle}
				   btnStyle={styles.btnStyle}
				 />
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
	  color: 'white',
		fontSize:18,
	}
});
