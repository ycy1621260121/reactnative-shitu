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
import { Label, ListRow, PopoverPicker, Badge, Toast, Theme } from 'teaset';
import BaseContainer from '../../components/BaseContainer';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { observer, inject } from 'mobx-react';
import { PowerStore } from '../../store/PowerStore';
import * as ImagePicker from 'react-native-image-picker';
import { System } from '../../utils';

import { SearchMobx } from '../../mobx/Search';

type Props = {
  navigation: any,
  defaultValue: string,
	powerStore: PowerStore,
};
const {height:screenHeight,width:screenWidth} =  Dimensions.get('window');

@inject('configStore', 'powerStore')
@observer
export class Detail extends Component<Props, any> {
	searchMobx: SearchMobx;
  items: Array<any>;
  popView: any;
  badgeNumber: number = 10;

  

  static navigationOptions = {};

  constructor(props: Props) {
    super(props);
	this.searchMobx = new SearchMobx();

    this.state = {
    };
  }

	componentWillMount(){
		
	}
	_onScroll = (event) => {
    let Y = event.nativeEvent.contentOffset.y;
    //console.log(Y);
    if (Y < 100) {
      st = Y*0.01;
    } else {
      st = 1;
    }
		
	if (Y >0) {
	  str = 1-(Y/100);
	} else {
	  str = 1;
	}
	
	if (Y > screenHeight) {
	  sop =(Y-screenHeight)*0.01;
	} else {
	  sop = 0;
	}
    this._refHeader.setNativeProps({
      opacity:str
    })
	this._refHeadertwo.setNativeProps({
	  opacity:st
	});
	this._ToTop.setNativeProps({
	  opacity:sop
	});
  }


  render() {
    return (
		
      <View style={styles.container}>
					{/*头部导航*/}
					<View ref={(e) => this._refHeader = e} style={{opacity: 1,position:'relative',zIndex:999,}} >
						<View style={styles.leftBack}>
							<TouchableOpacity activeOpacity={1} onPress = {() => this.props.navigation.goBack()}>
								<CustomIcon name='zuo' size={18} color='white' ></CustomIcon>
							</TouchableOpacity>
						</View>
						
						<View style={styles.shopCar}>
							<TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('News')}>
								<CustomIcon name='news' size={18} color='white' ></CustomIcon>
							</TouchableOpacity>
						</View>
					</View>
					
					{/*头部导航2*/}
					<View ref={(e) => this._refHeadertwo = e} style={{opacity: 0,position:'absolute',zIndex:999,backgroundColor:'#ff6464',width:screenWidth,height:Theme.statusBarHeight + Theme.navBarContentHeight}} >
						<View style={styles.leftBack2}>
							<TouchableOpacity activeOpacity={1} onPress = {() => this.props.navigation.goBack()}>
								<CustomIcon name='zuo' size={18} color='white' ></CustomIcon>
							</TouchableOpacity>
						</View>
						
						<View style={styles.shopCar2}>
							<TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('News')}>
								<CustomIcon name='news' size={18} color='white' ></CustomIcon>
							</TouchableOpacity>
						</View>
					</View>
				
				<ScrollView onScroll = {this._onScroll} scrollEventThrottle={10} ref={(view) => { this.myScrollView = view; }}>
				<Image style={{width:screenWidth,height: (screenWidth*518)/750}} resizeMode='cover' source={require('../../../assets/image/detail/bannertop.png')} />
				
				{/*第一块*/}
				<View style={{borderBottomColor:'#e6e6e6',borderBottomWidth:5,}}>
					<View style={{flex:1,justifyContent: 'flex-start',alignItems:'center',flexDirection:'row',height:36,marginLeft:10,marginTop:5,}}>
						<Text style={{fontSize:24,color:'#ff6464'}}>￥258</Text>
						<Text style={{fontSize:10,color:'#aaa',backgroundColor:'#f1f1f1',paddingLeft:6,paddingRight:6,paddingTop:3,paddingBottom:3,marginLeft:5,borderRadius:5,overflow:'hidden'}}>热卖促销</Text>
					</View>
					
					<View style={{flex:1,justifyContent: 'flex-start',alignItems:'center',flexDirection:'row',marginLeft:10}}><Text style={{fontSize:14,color:'#aaa'}}>价格</Text><Text style={{fontSize:14,color:'#aaa',textDecorationLine:'line-through'}}>￥498</Text></View>
				
					<View style={{flex:1,justifyContent: 'space-between',alignItems:'center',flexDirection:'row',padding:10,marginTop:5}}>
							<View style={{width:screenWidth*0.82}}><Text style={{lineHeight:28,fontSize:17}}>清新欧美风两件套秋装 小姐姐时尚流行 女神范  秋装裙子薄款潮流休闲秋装新款</Text></View>
							<View>
							<TouchableOpacity activeOpacity={1} onPress={() => {}}>
								<CustomIcon name='fenxiang_1' size={22} color='#333' ></CustomIcon>
							</TouchableOpacity>
							</View>
					</View>
					
					
					<View style={{flex:1,justifyContent: 'space-between',alignItems:'center',flexDirection:'row',padding:10,}}>
						<Text style={{fontSize:12,color:'#aaa'}}>快递费：0.00</Text>
						<Text style={{fontSize:12,color:'#aaa'}}>月销 88</Text>
						<Text style={{fontSize:12,color:'#aaa'}}>广东深圳</Text>
					</View>
				
				</View>
				
				
				{/*第二块*/}
				<View style={{borderBottomColor:'#e6e6e6',borderBottomWidth:5,paddingTop:10,paddingLeft:10,paddingRight:10}}>
				
				{/*商品投票通道*/}
				<View style={{borderBottomColor:'#e6e6e6',borderBottomWidth:0.8,marginBottom:10}}>
					<TouchableOpacity activeOpacity={1} onPress={() => {}}>
						<Text style={{fontSize:18,color:'#ff6464',marginBottom:10}}>商品投票通道 >></Text>
						<Text numberOfLines={1} style={{fontSize:14,color:'#666',marginBottom:12}}>商家旗下xxx产品已被发起投诉，正在投票、收集证据中...</Text>
					</TouchableOpacity>
				</View>
				
				{/*商品知识产权*/}
				<View style={{borderBottomColor:'#e6e6e6',borderBottomWidth:0.8,marginBottom:10}}>
					<TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Intellectual')}>
						<Text style={{fontSize:18,color:'#ff6464',marginBottom:10}}>商品知识产权 >></Text>
						<Text numberOfLines={1} style={{fontSize:14,color:'#666',marginBottom:12}}>拥有1000项专利，平台排名100</Text>
					</TouchableOpacity>
				</View>
				
				{/*正品保证 · 赠运费险 · 公益宝贝 · 七天退换*/}
				<View>
					<TouchableOpacity activeOpacity={1} onPress={() => {}} style={{flex:1,justifyContent: 'space-between',alignItems:'center',flexDirection:'row',}}>
						<Text style={{fontSize:12,color:'#666',marginBottom:10}}>正品保证 · 赠运费险 · 公益宝贝 · 七天退换</Text>
						<CustomIcon name='gengduo' size={20} color='#666'></CustomIcon>
					</TouchableOpacity>
				</View>
				
				
			</View>
			
			{/*第三块*/}
			<View style={{borderBottomColor:'#e6e6e6',borderBottomWidth:5,paddingTop:10,paddingLeft:10,paddingRight:10}}>
			
				{/*产品参数*/}
				<View style={{borderBottomColor:'#e6e6e6',borderBottomWidth:0.8,marginBottom:10}}>
					<TouchableOpacity activeOpacity={1} onPress={() => {}} style={{flex:1,justifyContent: 'space-between',alignItems:'center',flexDirection:'row',}}>
						<Text style={{fontSize:14,color:'#666',marginBottom:10,lineHeight:30}}>产品参数</Text>
						<CustomIcon name='gengduo' size={20} color='#666'></CustomIcon>
					</TouchableOpacity>
				</View>
				
				{/*选择 颜色 尺码*/}
				<View style={{}}>
					<TouchableOpacity activeOpacity={1} onPress={() => {}} style={{flex:1,justifyContent: 'space-between',alignItems:'center',flexDirection:'row',}}>
						<Text style={{fontSize:14,color:'#666',marginBottom:10,lineHeight:30}}>选择 颜色 尺码</Text>
						<CustomIcon name='gengduo' size={20} color='#666'></CustomIcon>
					</TouchableOpacity>
				</View>
				
			</View>
			
			
			
			{/*第四块*/}
				<View style={{borderBottomColor:'#e6e6e6',borderBottomWidth:5,paddingTop:10,paddingLeft:10,paddingRight:10,}}>
				
				{/*商品投票通道*/}
				<View style={{marginBottom:10}}>
						<Text style={{fontSize:18,color:'#ff6464',marginBottom:15}}>商品评价</Text>
						<View style={{flex:1,justifyContent: 'space-between',alignItems:'center',flexDirection:'row',flexWrap:'wrap',marginBottom:5}}>
							<TouchableOpacity activeOpacity={1} onPress={() => {}}><Text style={styles.shopbiao}>质量很好(36)</Text></TouchableOpacity>
							<TouchableOpacity activeOpacity={1} onPress={() => {}}><Text style={styles.shopbiao}>穿上很合适(30)</Text></TouchableOpacity>
							<TouchableOpacity activeOpacity={1} onPress={() => {}}><Text style={styles.shopbiao}>衣服很漂亮(36)</Text></TouchableOpacity>
						</View>
						<TouchableOpacity activeOpacity={1} onPress={() => {}}>
						<View style={{flex:1,justifyContent: 'flex-start',alignItems:'flex-start',flexDirection:'row',marginBottom:10}}>
								<View><Image style={{width:44,height:44,borderRadius:22,overflow:'hidden'}} resizeMode='cover' source={require('../../../assets/image/detail/userimg.png')} /></View>
								<Text style={{color:'#aaa',marginLeft:15,marginTop:5}}>yan***ue</Text>
						</View>
						<Text numberOfLines={2} style={{fontSize:14,color:'#333',marginBottom:25,lineHeight:20}}>衣服质量很好，穿上很舒服，做工很精细，很适合这个季节穿，姐妹都说我穿着好看，哼，这个我肯定知道啦</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{flex:1,justifyContent: 'center',alignItems:'center',marginBottom:10}} activeOpacity={1} onPress={() => {}}>
						<Text style={{color:'#ff6464',lineHeight:28,height:30,paddingLeft:18,paddingRight:18,borderColor:'#ff6464',borderWidth:0.8,borderRadius:15,overflow:'hidden'}}>查看全部评论</Text>
					</TouchableOpacity>
				</View>
				
				
				
			</View>
			
			
				{/*第五块*/}
					<View style={{paddingTop:10,paddingLeft:10,paddingRight:10,}}>
					
					{/*商品投票通道*/}
					<View style={{marginBottom:10}}>
							<View style={{flex:1,justifyContent: 'flex-start',alignItems:'center',flexDirection:'row',}}>
								<Image style={{width:(44*80)/60,height:44,overflow:'hidden'}} resizeMode='cover' source={require('../../../assets/image/detail/shopimg.png')} />
								<Text style={{color:'#333',marginLeft:15,fontSize:16}}>杨超越应援站</Text>
							</View>
							<View style={{flex:1,justifyContent: 'space-between',alignItems:'center',flexDirection:'row',marginTop:15,marginBottom:20}}>
									<View style={{flex:1,justifyContent: 'space-around',flexDirection:'column',height:80,alignItems:'center',borderRightColor:'#e6e6e6',borderRightWidth:0.8}}>
										<Text>300</Text>
										<Text style={{color:'#aaa'}}>全部宝贝</Text>
									</View>
									<View style={{flex:1,justifyContent: 'space-around',flexDirection:'column',height:80,alignItems:'center',borderRightColor:'#e6e6e6',borderRightWidth:0.8}}>
										<Text>100</Text>
										<Text style={{color:'#aaa'}}>关注人数</Text>
									</View>
									<View style={{flex:1,justifyContent: 'space-around',flexDirection:'column',height:80,alignItems:'center',}}>
										<View style={{flex:1,justifyContent: 'space-around',flexDirection:'row',alignItems:'center',}}>
											<Text style={{color:'#aaa'}}>宝贝描述</Text><Text style={{color:'#ff6464',marginLeft:4,}}>4.9</Text>
										</View>
										<View style={{flex:1,justifyContent: 'space-around',flexDirection:'row',alignItems:'center',}}>
											<Text style={{color:'#aaa'}}>卖家服务</Text><Text style={{color:'#ff6464',marginLeft:4}}>4.9</Text>
										</View>
										<View style={{flex:1,justifyContent: 'space-around',flexDirection:'row',alignItems:'center',}}>
											<Text style={{color:'#aaa'}}>物流服务</Text><Text style={{color:'#ff6464',marginLeft:4}}>4.9</Text>
										</View>
									</View>
							</View>
								
							<View style={{flex:1,justifyContent: 'space-around',alignItems:'center',flexDirection:'row'}}>
								<TouchableOpacity style={{flex:1,justifyContent: 'center',alignItems:'center',marginBottom:10}} activeOpacity={1} onPress={() => {}}>
									<Text style={{color:'#ff6464',lineHeight:24,height:26,paddingLeft:16,paddingRight:16,borderColor:'#ff6464',borderWidth:0.8,borderRadius:13,overflow:'hidden'}}>查看分类</Text>
								</TouchableOpacity>
								<TouchableOpacity style={{flex:1,justifyContent: 'center',alignItems:'center',marginBottom:10}} activeOpacity={1} onPress={() => {}}>
									<Text style={{color:'#ff6464',lineHeight:24,height:26,paddingLeft:16,paddingRight:16,borderColor:'#ff6464',borderWidth:0.8,borderRadius:13,overflow:'hidden'}}>进店逛逛</Text>
								</TouchableOpacity>
							</View>
					</View>
					
					
					
				</View>
				
				{/*详情线*/}
				<View style={{flex:1,justifyContent: 'center',alignItems:'center',flexDirection:'row',backgroundColor:'#e6e6e6',paddingTop:12,paddingBottom:12}}>
					<Image style={{width:screenWidth*0.5,height:(screenWidth*0.5*19)/274,}} resizeMode='cover' source={require('../../../assets/image/detail/detailline.png')} />
				</View>
				
				
				{/*详情*/}
				<View style={{flex:1,justifyContent: 'center',alignItems:'center',flexDirection:'row',}}>
					<Image style={{width:screenWidth,height:(screenWidth*7992)/750,}} resizeMode='cover' source={require('../../../assets/image/detail/detailimg.jpg')} />
				</View>
				
				
				
				</ScrollView>
				<View style={styles.totop} ref={(e) => this._ToTop = e} >
					<TouchableOpacity activeOpacity={1} onPress = {() => this.myScrollView.scrollTo({ x: 0, y: 0, animated: true})}>
						<CustomIcon name='huidaodingbu' size={18} color='white' ></CustomIcon>
					</TouchableOpacity>
				</View>
			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		position:'relative'
  },
	leftBack:{
		backgroundColor:'rgba(0,0,0,0.5)',
		width:30,
		height:30,
		borderRadius:15,
		overflow:'hidden',
		flex:1,
		justifyContent: 'center',
		alignItems:'center',	
		position:'absolute',
		top:System.iOS ? 26.5:25,
		zIndex:99,
		left:10
	},
	shopCar:{
		backgroundColor:'rgba(0,0,0,0.5)',
		width:30,
		height:30,
		borderRadius:15,
		overflow:'hidden',
		flex:1,
		justifyContent: 'center',
		alignItems:'center',	
		position:'absolute',
		top:System.iOS ? 26.5:25,
		zIndex:99,
		right:10
	},
	leftBack2:{
		width:30,
		height:30,
		flex:1,
		justifyContent: 'center',
		alignItems:'center',	
		position:'absolute',
		top:System.iOS ? 26.5:25,
		zIndex:99,
		left:10
	},
	shopCar2:{
		width:30,
		height:30,
		flex:1,
		justifyContent: 'center',
		alignItems:'center',	
		position:'absolute',
		top:System.iOS ? 26.5:25,
		zIndex:99,
		right:10
	},
	shopbiao:{
		backgroundColor:'#ffd2d2',
		height:28,
		lineHeight:28,
		paddingLeft:10,
		paddingRight:10,
		borderRadius:14,
		fontSize:12,
		color:'#333',
		overflow:'hidden',
		marginBottom:15
	},
	totop:{
		backgroundColor:'rgba(0,0,0,0.5)',
		width:30,
		height:30,
		borderRadius:15,
		overflow:'hidden',
		flex:1,
		justifyContent: 'center',
		alignItems:'center',	
		position:'absolute',
		bottom:60,
		zIndex:99,
		right:10,
		opacity:0
	},
});
