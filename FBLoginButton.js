import React, { Component } from 'react';
import { View,Text,AsyncStorage,StyleSheet } from 'react-native';
import {FBLogin, LoginButton,AccessToken } from 'react-native-fbsdk';
import {createNavigationContainer, createStackNavigator } from 'react-navigation';

export default class FBLoginButton extends Component {
	constructor(props) {
    super(props);

    this.state = {
      uname: ""
	}
	}
  render() {
	  
	    
    return (
        <View style={styles.maincontainer}>
	<Text style={styles.label}>SUNTIST</Text>
	   
        <LoginButton
         readPermissions={["public_profile","email"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + error.message);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
				  
				 
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
					  
					var api = 'https://graph.facebook.com/v2.8/me?fields=name,email&access_token=' +data.accessToken.toString();
           fetch(api)
      .then((response) => response.json())
      .then( (responseData) => {
           alert("Data " + responseData.email)
		   
		     AsyncStorage.setItem('uname', responseData.name);
		   
		   
		    this.props.navigation.navigate('Information',{uid:uname});
      })
      .done();   
					  
					  
                     alert("Data " + data.accessToken.toString())
                  }
				
				
                )

				
				
				 // alert("Login was cancelled");
				
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
		  
		 
      </View>
    );
  }
};
const styles = StyleSheet.create({
	
	 maincontainer: {
    flex: 1,
    paddingTop:2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
	
	
  },
  label: {
    fontSize: 40,
    fontWeight: 'normal',
	 width:'100%', 
    textAlign:'center',
    alignItems: 'center',
	marginTop:0,
    marginBottom: 48,
	
	 backgroundColor: '#000',
	 color:'#FFF'
  },
  
});

module.exports = FBLoginButton;