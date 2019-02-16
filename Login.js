import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import {FBLogin, LoginButton,AccessToken } from 'react-native-fbsdk';

var FBLoginButton = require('./FBLoginButton');

export default class Login extends  Component {
  render() {
    return (
	  <View >
	 
      <View style={styles.container}>
        
        <LoginButton
         readPermissions={["public_profile","email"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + error.message);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
             /*   AccessToken.getCurrentAccessToken().then(
                  (data) => {
					  
					var api = 'https://graph.facebook.com/v2.8/me?fields=name,email&access_token=' +data.accessToken.toString();
           fetch(api)
      .then((response) => response.json())
      .then( (responseData) => {
           alert("Data " + responseData.email)
      })
      .done();   
					  
					  
                     alert("Data " + data.accessToken.toString())
                  }
				
				
                )

				*/
				
				  alert("Login was cancelled");
				
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
		  
		 
      </View>
     
	  </View>
    );
  }
}

const styles = StyleSheet.create({
	
	
  container: {
    flex: 1,
    flexDirection: 'column',
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
