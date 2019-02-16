import React from 'react';
import {createNavigationContainer, createStackNavigator } from 'react-navigation';
import {FBLogin, LoginButton,AccessToken } from 'react-native-fbsdk';

import FBLoginButton from './FBLoginButton.js';
import Information from './Information.js';
 
 
const Navigator = createNavigationContainer(createStackNavigator({
    FBLoginButton: { screen: FBLoginButton },
    Information: { screen: Information },
},  {
	
	initialRouteName: 'FBLoginButton', 
 
	
        headerMode: 'none' 

}));

export default Navigator;