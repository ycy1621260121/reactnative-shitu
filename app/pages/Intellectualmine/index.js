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

import { IntellectualMobx } from '../../mobx/Intellectual';
//根据需要引入
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
export class Intellectualmine extends Component<Props, any> {
  intellectualMobx: IntellectualMobx;
  items: Array<any>;
  popView: any;
  badgeNumber: number = 10;
  
   _page=1
   _dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2})
	_dataLoading = false
  

  static navigationOptions = {};

  constructor(props: Props) {
    super(props);
    //PopoverPicker.PopoverPickerView.Item = PopoverPickerViewItem;
		this.intellectualMobx = new IntellectualMobx();

    this.state = {
		dataSource:this._dataSource.cloneWithRows([]),
		intellectualData:{}
    };
  }

	componentWillMount(){
		
	}
  
  

  /**
   * 模拟刷新
   * @param end
   * @private
   */
//   _onRefresh(end){
//    let timer =  setTimeout(()=>{
//      clearTimeout(timer)
//       alert('刷新成功')
// 
//      end()//刷新成功后需要调用end结束刷新
// 
//     },1500)
// 
//   }

  /**
   * 模拟刷新
   * @param end
   * @private
   */
  _onListRefersh = async (end) => {
      /*let data = []
      for (let i = 0;i<10;i++){
        data.push(i)
      }
      this.setState({
        dataSource:this._dataSource.cloneWithRows(data)
      })*/
	  let params = {
	  	page: 1,
	  	pageSize: 15
	  };
		this._dataLoading = true;
		let timer = setTimeout(async()=>{
		 clearTimeout(timer)
	  const intellectualData = await this.intellectualMobx.intellectualmine(params);
	  if(intellectualData.code == 0){
		  this._page=1;
		  this.refs.listView.resetStatus() //重置上拉加载的状态
		  this.setState({
		  	dataSource:this._dataSource.cloneWithRows(intellectualData.list),
				intellectualData:intellectualData.list
		  });
			this._dataLoading = false;
			if(intellectualData.list.length<15){
				this.refs.listView.endLoadMore(this._page)
			}
	  } 
		
     // end()//刷新成功后需要调用end结束刷新
     this.refs.listView.endRefresh() //建议使用end() 当然 这个可以在任何地方使用
		 },500)
  }


  _onLoadMore = async (end)=>{
//       let data = []
//       for (let i = 0;i<(this._page+1)*10;i++){
//         data.push(i)
//       }
//       this.setState({
//         dataSource:this._dataSource.cloneWithRows(data)
//       })
		
      //end(this._page > 2)//加载成功后需要调用end结束刷新 假设加载4页后数据全部加载完毕
	  if(!this._dataLoading){
	  	this._page++;
	  }
	  let params = {
		page: this._page,
		pageSize: 15
	  };
	  const intellectualData = await this.intellectualMobx.intellectualmine(params);
	  if(intellectualData.code == 0){
		  this.setState({
				dataSource:this._dataSource.cloneWithRows(this.state.intellectualData.concat(intellectualData.list))
		  })
	  }
		  this.refs.listView.endLoadMore(this._page)
	  
	  //end(this._page > 0)
    
  }

  componentDidMount() {
   let timer = setTimeout(()=>{
     clearTimeout(timer)
	 this._onListRefersh()
      // this.refs.scrollView.beginRefresh()
     this.refs.listView.beginRefresh()
    }) //自动调用刷新 新增方法
		
		DeviceEventEmitter.addListener('intellectualadd', (param) => {
        //收到通知后处理逻辑
        //eg 刷新数据 
				this._onListRefersh()
    })
  }
  
	_delect = async(id)=>{
		let params = {
		id: id,
		};
		const intellectualData = await this.intellectualMobx.intellectualdelect(params);
		if(intellectualData.code == 0){
			this._onListRefersh()
		}
		
	}
  


_renderRow(rowData) {
	const right = [
	    {
	      text: '去出售',
	      onPress: () => console.log('去出售'),
	      style: { backgroundColor: 'orange', color: 'white' },
	    },
	    {
	      text: '删除',
	      onPress: () => this._delect(rowData._id),
	      style: { backgroundColor: 'red', color: 'white' },
	    },
	  ];
    return (
        <List>
          <SwipeAction
            autoClose
            style={{ backgroundColor: 'transparent' }}
            right={right}
            //left={left}
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
	 renderRightView = () => {
	  return (
	    <Button onPress={() => this.props.navigation.navigate('Intellectualadd')}>
	      <View ref={e => (this.popView = e)} style={{ marginRight: px2dp(20) }}>
	        <Icon name={'md-add'} size={30} color={'white'} />
	      </View>
	    </Button>
	  );
	};

  render() {
			let dataSourceLength =  this.state.dataSource._dataBlob.s1.length;
    return (
		
      <BaseContainer style={styles.container} title={'我的创新'} rightView={this.renderRightView()}>
			<SwRefreshListView
					dataSource={this.state.dataSource}
					ref="listView"
					renderRow={this._renderRow.bind(this)}
					onRefresh={this._onListRefersh.bind(this)}
					onLoadMore={this._onLoadMore.bind(this)}
					pusuToLoadMoreTitle ={dataSourceLength >0 ? '上拉加载更多~~~~':''}
					noMoreDataTitle ={ dataSourceLength < 15 ? '' : '已经加载到底啦（￣︶￣)~~'}
					isShowLoadMore={dataSourceLength >0 ? true :false }
					//isShowLoadMore={false}
					renderFooter={()=>{return
						(<View style={{backgroundColor:'blue',height:30}}>
						<Text>我是footer</Text>
						</View>)
						}}

					/>
		</BaseContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content:{
    width:screenWidth,
    height:screenHeight,
    backgroundColor:'yellow',
    justifyContent:'center',
    alignItems:'center'
  },
  cell:{
    height:100,
    backgroundColor:'pink',
    alignItems:'center',
    justifyContent:'center',
    borderBottomColor:'#ececec',
    borderBottomWidth:1

  }
});
