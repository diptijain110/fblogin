import React, { Component } from 'react';
import { View,Text ,Alert} from 'react-native';
import {FBLogin, LoginButton,AccessToken} from 'react-native-fbsdk';

export default class Information extends Component {
	constructor(props) {
    super(props);

    this.state = {
        pId: this.props.navigation.state.params.uid,
	}
	
	Alert.alert(this.props.navigation.state.params.uid);
	}
	
	
  render() {
	  
	  
    return (
      <View>
	   
        
		  
		 
      </View>
    );
  }
};

module.exports = Information;