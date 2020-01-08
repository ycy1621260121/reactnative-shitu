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
	ListView
} from 'react-native';

import { Button, GradientButton, PopoverPickerViewItem,CustomIcon } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Label, ListRow, PopoverPicker, Badge, Toast } from 'teaset';
import BaseContainer from '../../components/BaseContainer';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { observer, inject } from 'mobx-react';
import { PowerStore } from '../../store/PowerStore';
import * as ImagePicker from 'react-native-image-picker';
import { System } from '../../utils';
import { List, SwipeAction } from '@ant-design/react-native';
import { SearchMobx } from '../../mobx/Search';

import {
  SwRefreshScrollView,
  SwRefreshListView,
  RefreshStatus, //刷新状态 用于自定义
  LoadMoreStatus //上拉加载状态 用于自定义
} from 'react-native-swRefresh'


type Props = {
  navigation: any,
  defaultValue: string,
	powerStore: PowerStore,
};
const {height:screenHeight,width:screenWidth} =  Dimensions.get('window');

@inject('configStore', 'powerStore')
@observer
export class Search extends Component<Props, any> {
	searchMobx: SearchMobx;
  items: Array<any>;
  popView: any;
  badgeNumber: number = 10;

  _page=1
  _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2})

  static navigationOptions = {};

  constructor(props: Props) {
    super(props);
    //PopoverPicker.PopoverPickerView.Item = PopoverPickerViewItem;
		this.searchMobx = new SearchMobx();

    this.state = {
		searchText:'',
		dataSource:this._dataSource.cloneWithRows([]),
		placeholder:'杨超越代言  进口奶粉',
    };
  }

	componentWillMount(){
		
	}
	search = async ()=>{
		if(this.state.searchText == '' || this.state.searchText == null){
			this.setState({
				searchText:this.state.placeholder
			})
		}
		setTimeout(async()=>{
			let params = {
					content:this.state.searchText,
				};
				const searchData = await this.searchMobx.search(params);
				if(searchData.code==0){
					this.setState({
						dataSource:this._dataSource.cloneWithRows(searchData.list),
					})
				}else{
					
				}
		},100)
		
	}
	
	_renderRow(rowData) {
	    return (
	        <List>
	          <SwipeAction
	            autoClose
	            style={{ backgroundColor: 'transparent' }}
	            onOpen={() => console.log('open')}
	            onClose={() => console.log('close')}
	          >
	            <List.Item>
					{rowData.content}
	            </List.Item>
	          </SwipeAction>
	        </List>
		  )
	
	  }


  render() {
	  
    return (
	 
      <View style={styles.container}>
			{/*搜索框*/}
				<View style={{height:System.iOS ? (Theme.statusBarHeight + Theme.navBarContentHeight+11.5) : (Theme.statusBarHeight + Theme.navBarContentHeight+10) }}>
					<View style={styles.search}>
						<TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Search')} style={{position:'relative'}}>
					
	
							 <TextInput style={styles.textInputStyle} placeholder={this.state.placeholder} placeholderTextColor="white" autoFocus={true}
							 clearButtonMode="while-editing"
							 returnKeyType="search"
							 onChangeText={(text)=>{this.setState({
								 searchText:text
							 })}}//输入框改变触发的函数
							 onEndEditing={() => this.search()}
							 ></TextInput>
							
						</TouchableOpacity>
						
						<TouchableOpacity activeOpacity={1} onPress = {() => this.props.navigation.goBack()}>
							<Text style={{color:'white',marginTop:10}}>取消</Text>
						</TouchableOpacity>
					</View>
				</View>
				<SwRefreshListView
						dataSource={this.state.dataSource}
						ref="listView"
						renderRow={this._renderRow.bind(this)}
						isShowLoadMore={false}
				
						/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
	search:{
		backgroundColor:'#ff6464',
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection:'row',
	},
	textInputStyle:{
		marginTop:System.iOS ? 11.5:10,
		width:screenWidth*0.75,
		paddingLeft:14, 
		height:30, 
		 backgroundColor:"#ff9696",
		 color:'white',
		 borderRadius:15,
		 overflow:'hidden'
		
	}
});
