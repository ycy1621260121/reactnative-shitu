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

import { Button, GradientButton, PopoverPickerViewItem } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { Label, ListRow, PopoverPicker, Badge } from 'teaset';
import BaseContainer from '../../components/BaseContainer';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { observer, inject } from 'mobx-react';
import { PowerStore } from '../../store/PowerStore';
import * as ImagePicker from 'react-native-image-picker';

type Props = {
  navigation: any,
  defaultValue: string,
	powerStore: PowerStore,
};


@inject('configStore', 'powerStore')
@observer
export class Message extends Component<Props, any> {
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


  render() {
    return (
      <BaseContainer
        style={styles.container}
        isTopNavigator={true}
        title={'消息'}
      >
        <View style={{ alignItems: 'center' }}>
				
        </View>
      </BaseContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
