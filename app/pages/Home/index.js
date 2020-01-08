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
	ScrollView
} from 'react-native';

import { Button, GradientButton, PopoverPickerViewItem,CustomIcon } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Label, ListRow, PopoverPicker, Badge, Theme, Carousel } from 'teaset';
import BaseContainer from '../../components/BaseContainer';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { observer, inject } from 'mobx-react';
import { PowerStore } from '../../store/PowerStore';
import * as ImagePicker from 'react-native-image-picker';
import { System } from '../../utils';

type Props = {
  navigation: any,
  defaultValue: string,
	powerStore: PowerStore,
};

const {height:screenHeight,width:screenWidth} =  Dimensions.get('window');


@inject('configStore', 'powerStore')
@observer
export class Home extends Component<Props, any> {
  items: Array<any>;
  popView: any;
  badgeNumber: number = 10;

  

  static navigationOptions = {};

  constructor(props: Props) {
    super(props);
    //PopoverPicker.PopoverPickerView.Item = PopoverPickerViewItem;

    this.state = {
		
    };
  }

	componentWillMount(){
		
	}
	// 开始拖拽时调用
    onScrollerBeginDrag(){
        // 停止定时器
       console.log('开始')
    }
 
    // 停止拖拽时调用
    onScrollEndDrag(){
        // 开启定时器
        console.log('结束')
 
    }


  render() {
    return (
		<View style={styles.container}>
		{/*搜索框*/}
			<View style={{height:System.iOS ? (Theme.statusBarHeight + Theme.navBarContentHeight+11.5) : (Theme.statusBarHeight + Theme.navBarContentHeight+10) }}>
				<View style={styles.search}>
					<TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Search')} style={{position:'relative'}}>
						<Text style={{marginTop:System.iOS ? 11.5:10,width:screenWidth*0.75,paddingLeft:14, height:30, lineHeight:30, backgroundColor:"#ff9696",color:'white',borderRadius:15,overflow:'hidden'}}>
							杨超越代言  进口奶粉
						</Text>
						<TouchableOpacity activeOpacity={1} onPress={() => {}} style={{position:'absolute',right:0,top:System.iOS ? 11.5:10,height:30,justifyContent:'center',alignItems:'center',width:40}}>
							<CustomIcon name='sousuo' size={20} color='white'></CustomIcon>
						</TouchableOpacity>
					</TouchableOpacity>
					
					<TouchableOpacity activeOpacity={1} onPress={() => {}} style={{position:'absolute',right:5,top:System.iOS ? 30.5:29,height:30,justifyContent:'center',alignItems:'center',width:40}}>
						<CustomIcon name='saoyisao' size={20} color='white'></CustomIcon>
					</TouchableOpacity>
				</View>
			</View>
        <ScrollView 
				

				//开始拖拽
				onScrollBeginDrag={(e)=>this.onScrollerBeginDrag(e)}

				//停止拖拽
				onScrollEndDrag={(e)=>this.onScrollEndDrag(e)}>
					
					<View style={styles.imageBackground} >
					
					
					{/*幻灯片*/}
						<Carousel
							style={{width:screenWidth,height:(screenWidth*302)/721}}
							control={
								<Carousel.Control
									style={{alignItems: 'center',marginBottom:20}}
									dot={<Text style={{backgroundColor: 'rgba(255,255,255,0.5)', margin: 4,width:8,height:8,borderRadius:4,overflow:'hidden'}}></Text>}
									activeDot={<Text style={{backgroundColor: 'rgba(255, 255, 255, 1)', margin: 4,width:8,height:8,borderRadius:4,overflow:'hidden'}}></Text>}
									/>
							}
						>
							<Image style={{width:screenWidth,height: (screenWidth*285)/750}} resizeMode='cover' source={{uri:'http://106.13.69.59/muayue/static/images/banner1.png'}} />
							<Image style={{width:screenWidth,height: (screenWidth*285)/750}} resizeMode='cover' source={{uri:'http://106.13.69.59/muayue/static/images/banner1.png'}} />
							<Image style={{width:screenWidth,height: (screenWidth*285)/750}} resizeMode='cover' source={{uri:'http://106.13.69.59/muayue/static/images/banner1.png'}} />
						</Carousel>
						
						{/*圆形导航*/}
						<View style={{marginTop:5,width:screenWidth*0.75,flex: 1,justifyContent: 'space-between',flexDirection:'row',alignItems:'flex-start'}}>
							
								<TouchableOpacity activeOpacity={1} onPress={() => {}}>
									<Text style={styles.topfourtab}>科技</Text>
								</TouchableOpacity>
								
								<TouchableOpacity activeOpacity={1} onPress={() => {}}>
									<Text style={styles.topfourtab}>时尚</Text>
								</TouchableOpacity>
								
								<TouchableOpacity activeOpacity={1} onPress={() => {}}>
									<Text style={styles.topfourtab}>美妆</Text>
								</TouchableOpacity>
								
								<TouchableOpacity activeOpacity={1} onPress={() => {}}>
									<Text style={styles.topfourtab}>美护</Text>
								</TouchableOpacity>
						</View>
						
						
					</View>
					
					{/*两个框*/}
					<View style={{flex:1,justifyContent: 'space-between',flexDirection:'row',alignItems:'flex-start',marginTop:0,paddingLeft:10,paddingRight:10}}>
						<TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Detail')}>
							<View style={styles.twoflex}>
							 <Text style={{fontSize:18,padding:8,color:'#333'}}>高端科技</Text>
							 <Image style={{width:56,height: 56,position:'absolute',right:16,bottom:10}} resizeMode='cover' source={require('../../../assets/image/nfen.png')} />
							</View>
						</TouchableOpacity>
						
						<TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Detail')}>
							<View style={styles.twoflex}>
							<Text style={{fontSize:18,padding:8,color:'#333'}}>尖端创新</Text>
							<Image style={{width:56,height: 56,position:'absolute',right:16,bottom:10}} resizeMode='cover' source={require('../../../assets/image/nfen.png')} />
							</View>
						</TouchableOpacity>
					
					</View>
					
					
					{/*一个框*/}
					<View style={{flex:1,flexDirection:'row',alignItems:'flex-start',paddingLeft:10,paddingRight:10,marginTop:20,position:'relative'}}>
						<TouchableOpacity activeOpacity={1} onPress={() => {}}>
							<View style={[styles.twoflex,{width:(screenWidth)*0.95,backgroundColor:'#f6f6f6'}]}>
							 <Text style={{fontSize:18,padding:8,color:'#333'}}>医药</Text><Text style={{fontSize:12,color:'#999',position:'absolute',left:50,top:12}}>安全保障 高赔付率</Text>
							 <Image style={{width:screenWidth*0.72,height: (screenWidth*0.72*174)/458,position:'absolute',right:16,top:10}} resizeMode='cover' source={require('../../../assets/image/longbox.png')} />
							</View>
						</TouchableOpacity>
						
					</View>
					
					
					{/*一个框*/}
					<View style={{flex:1,justifyContent: 'flex-start',flexDirection:'row',alignItems:'flex-start',marginTop:20,}}>
						<Text style={{fontSize:18,padding:8,color:'#333'}}>创新品牌</Text><Text style={{fontSize:12,color:'#999',paddingTop:12}}>享受平台知识产权保护法保护</Text>
					</View>
					<View style={{flex:1,flexDirection:'row',alignItems:'flex-start',paddingLeft:10,paddingRight:10,marginTop:0,position:'relative'}}>
						<TouchableOpacity activeOpacity={1} onPress={() => {}}>
							<View style={[styles.twoflex,{width:(screenWidth)*0.95,backgroundColor:'#f6f6f6'}]}>
							<Text style={{color:'#333',position:'absolute',bottom:10,alignSelf:'center',zIndex:9}}>拥抱新科技  创造新未来</Text>
							 <Image style={{width:screenWidth*0.72,height: (screenWidth*0.72*174)/458,position:'absolute',right:16,bottom:10,right:45}} resizeMode='cover' source={require('../../../assets/image/feiji.png')} />
							</View>
						</TouchableOpacity>
						
					</View>
					
					
					{/*列表*/}
					<View style={{flex:1,justifyContent: 'flex-start',flexDirection:'row',alignItems:'flex-start',marginTop:20,}}>
						<Text style={{fontSize:18,padding:8,color:'#333'}}>猜你喜欢</Text>
					</View>
					<View style={{flex:1,justifyContent: 'space-between',flexDirection:'row',alignItems:'flex-start',paddingLeft:10,paddingRight:10,position:'relative'}}>
						
						<TouchableOpacity activeOpacity={1} onPress={() => {}}>
							<View style={styles.twoflexlove}>
							 <Image style={{width:100,height: 100}} resizeMode='cover' source={require('../../../assets/image/nfen.png')} />
							</View>
						</TouchableOpacity>
						
						<TouchableOpacity activeOpacity={1} onPress={() => {}}>
							<View style={styles.twoflexlove}>
							<Image style={{width:100,height: 100}} resizeMode='cover' source={require('../../../assets/image/nfen.png')} />
							</View>
						</TouchableOpacity>
						
					</View>
					
					
			
        </ScrollView>
				</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		overflow:'scroll'
  },
  search:{
		backgroundColor:'#ff6464',
		flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
	imageBackground:{
		height: (screenWidth*471)/750,
		width: screenWidth,
		alignItems: 'center',
	},
	topfourtab:{
		width:44,
		height:44,
		backgroundColor:'#ff6464',
		borderRadius:22,
		overflow:'hidden',
		lineHeight:44,
		textAlign:'center',
		fontSize:12,
		color:'white'
		
	},
	twoflex:{
		width:(screenWidth/2)*0.9,
		height:100,
		backgroundColor:'#fcedef',
		borderRadius:5,
		overflow:'hidden',
		position:'relative'
	},
	twoflexlove:{
		width:(screenWidth/2)*0.9,
		height:168,
		backgroundColor:'#fcedef',
		borderRadius:5,
		overflow:'hidden',
		position:'relative',
		flex:1,
		justifyContent: 'center',
		alignItems:'center',
		marginBottom:20
	}
});
