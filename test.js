import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  WebView,
  Dimensions,
  Modal,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import {FBLogin, LoginButton,AccessToken } from 'react-native-fbsdk';
import FBLoginButton from './FBLoginButton.js';
import Information from './Information.js';
import {createNavigationContainer, createStackNavigator } from 'react-navigation';


export default class Test extends Component {
  constructor(props)
  {
    super(props);
    this.state =
    {
      componentSelected: 'FacebookLogin',
	  uname:'',
	  
    }
  }
  
    componentDidMount() {
	
	
	 
	 
	 AsyncStorage.getItem("uname").then((value) => {
	
		 
        this.setState({"uname": value});
		
    }).done();
	 
  Alert.alert(this.state.uname+'ffff');
 

}

 componentWillUnMount() {
	
	
	 
	 
	 AsyncStorage.getItem("uname").then((value) => {
	
		 
        this.setState({"uname": value});
		
    }).done();
	 
  Alert.alert(this.state.uname+'ccc');
 

}

  changeComponent = (component) =>{
    this.setState({componentSelected: component});
	 
  }

  renderComponent(component) {
        if(component == 'FacebookLogin') {
        return <FacebookLogin changeComponent={this.changeComponent} />
      } else if(component == 'Info') {
        return <Info changeComponent={this.changeComponent} />
      } 
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderComponent(this.state.componentSelected)}
      </View>
    );
  }
}

class FacebookLogin extends Component {
	

    render() {
    return (
     
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
				  
				 
              AccessToken.getCurrentAccessToken().then(
                  (data) => {
					  
					var api = 'https://graph.facebook.com/v2.8/me?fields=name,email&access_token=' +data.accessToken.toString();
           fetch(api)
      .then((response) => response.json())
      .then( (responseData) => {
		  var email=responseData.email;
		   var name=responseData.name;
		
		
			 
        this.setState({"uname": name});
	 
 //this.props.navigation.navigate("Information");
		   
		 
		 
      })
      .done();   
					  
					  
                    
                  }
				
				
                )

			alert(this.state.uname+'eee')
				
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
		  
		 
		 
		 
		 
		 
      </View>
   
      
    )
  }
}

class Info extends Component {
	

  

    render() {
    return (
        <View style={styles.container}>
        <Text style={{color: 'black', marginBottom:150, fontSize:20}}>Hello From Component Two</Text>
        <TouchableHighlight onPress={() => this.props.changeComponent('FacebookLogin') } style={styles.button}><Text>One</Text></TouchableHighlight>
      </View>
    )
  }
}




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
  
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
	
	
  },
  
});

