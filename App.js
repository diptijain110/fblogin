import React, { Component } from 'react';
import { View,Text,AsyncStorage,StyleSheet,Alert,Button,FlatList ,ScrollView,TouchableOpacity} from 'react-native';
import { SearchBar,Card, Rating, Input,Tile } from "react-native-elements";
import {FBLogin, LoginButton,AccessToken } from 'react-native-fbsdk';
import {createNavigationContainer, createStackNavigator } from 'react-navigation';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import call from 'react-native-phone-call';



class FBLoginButton extends Component {
	constructor(props) {
    super(props);

    this.state = {
      uname: ""
	}
	}
	static navigationOptions =({
            title:' SUNTIST'
			
        });
	
  render() {
	  
	    
    return (
        <View style={styles.maincontainer}>
	
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
          
		   
		  
		   
		   
		    this.props.navigation.navigate('Information',{uid:responseData.name,uemail :responseData.email});
      })
      .done();   
					  
					  
                    
                  }
				
				
                )

				
				
				 // alert("Login was cancelled");
				
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
		 </View> 
		 
      </View>
    );
  }
}
class Information extends Component {
	constructor(props) {
    super(props);
	
	
    this.array = [
    ],

    this.state = 
	{
		
		 arrayHolder: [] ,
         user: this.props.navigation.state.params.uid,
		 email:this.props.navigation.state.params.uemail,
		 user1:"",
		 phone: "",
		 gender:"",
		 types1: [{label: 'Male', value: 'Male'}, {label: 'Female', value: 'Female'}],
		 value1: 'Male',
		 value1Index: 0,
	  
	}
	
	
	}
	componentDidMount() {

    //this.setState({ arrayHolder: [...this.array] })

                     }

	
			callNumber(num){
			//handler to make a call
			const args = {
			  number: num,
			  prompt: false,
			};
		 
			call(args).catch(console.error);
		                  }
	
	
	static navigationOptions =({
            title: 'SUNTIST '
			
        });
	

validate = (text) => {
console.log(text);
let reg =  /^[0-9]+$/;
if(reg.test(text) === false)
{
console.log("Number is not correct");

return false;
  }
else {
return true;
}
}	
	GetItem(item) {

    Alert.alert(item);

  }
	
		submitValues() {
		
	
	if(this.state.user1!="" && this.state.phone!="" && this.state.types1[this.state.value1Index].label!='')
	{
				 
		 if (this.validate(this.state.phone)===true ) 
		 {
					 
			this.setState({phone: this.state.phone});	
			this.setState({user1: this.state.user1});	
			this.setState({gender: this.state.types1[this.state.value1Index].label	});
            this.array.push({name : this.state.user1,phone:this.state.phone ,gender:this.state.types1[this.state.value1Index].label});
            this.setState({ arrayHolder: [...this.array] })	  
				
		} 
		else 
		{
			
		  this.setState({phone: ""});	
		  this.setState({user1: this.state.user1});	
		  this.setState({gender: this.state.types1[this.state.value1Index].label	});
			 
		  alert("Enter valid phone number");
		} 

 
	
	}
	else
	{
		
		  alert("Fill all data");
	}
	  this.resetForm();
	 
       
	}
		
		resetForm(){
			
	    this.setState({phone: ""});	
	    this.setState({user1: ""});	
		this.setState({gender: ""});
		this.textInput.clear();
		this.textInput1.clear()
			
		}
		
		FlatListItemSeparator = () => {
			return (
			  <View
				style={{
				  height: 1,
				  width: "100%",
				  backgroundColor: "#607D8B",
				}}
			  />
			);
                                     }

	
  render() {
	  
	  
    return (
	    <View style={{marginLeft:1,marginRight:1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#F5FCFF',}}>
	 <View style={styles.welcometext}>
	  <Text style={styles.label1}>Welcome</Text>
      <Text style={styles.label1}>{ this.props.navigation.state.params.uid} </Text>
      <Text style={styles.label1}>{ this.props.navigation.state.params.uemail} </Text>

	  </View>
         <View>  
		  <View style={styles.formData}>
		
		  
		    <Input
              placeholder="Enter your name"
              onChangeText={text => this.setState({ user1: text })}
              underlineColorAndroid='transparent'
			  style={{placeholderTextColor:'#ccc',color:'#000'}}
			  ref={input => { this.textInput1 = input }} 
            />
		   </View>  
		    
			    
			
			
			
			
		 <View style={styles.formElement}>
			  
			 <Input
              placeholder="Enter your number"
			  keyboardType={'numeric'}
			  underlineColorAndroid='transparent'
              style={{placeholderTextColor:'#ccc',color:'#000'}}
			  onChangeText={text => this.setState({ phone: text })}
             ref={input => { this.textInput = input }} 
           
            />
		</View>
			
		<View style={styles.formRadio}>
			  
			<RadioForm
             radio_props={this.state.types1}
             initial={'Male'}
             formHorizontal={true}
			 buttonWrapStyle={{width:100,height:40,background:'#fff',color:'#ccc',borderColor:'#ff0000',borderWidth:1,fontSize:12}}
			 buttonColor={'#ff0000'}
             selectedButtonColor={'#ff0000'}
             onPress={(value, index) => {this.setState({value1:value,value1Index:index})}}
           />




		</View>
		 
      </View>
			  <TouchableOpacity  onPress={() => {this.submitValues()}}>
			  
			  <View style={styles.formButton}
						onPress={() => {
						this.submitValues()
						}}
						>
						
					<Text style={{textAlign:'center',alignItems: 'center',  justifyContent: 'center',fontSize: 20,fontWeight: 'normal',color:'#fff' }}>
				   SUBMIT
				   </Text>
				  
			</View>
			</TouchableOpacity>	
					
			<View style={styles.tableHeader}>
			
			<Text style={{marginLeft:20, width:50,textAlign:'center',alignItems: 'center',  justifyContent: 'center',fontSize: 14,fontWeight:'bold',
			fontWeight: 'normal',color:'#333' }}>
			Name</Text>
			<Text style={{marginLeft:20,marginRight:20 , width:50, textAlign:'center',alignItems: 'center',  justifyContent: 'center', fontSize: 14,fontWeight:'bold',
			fontWeight: 'normal',color:'#333' }}>
			Tel
			</Text>
			<Text style={{marginRight:20 , width:50, textAlign:'center',alignItems: 'center',  justifyContent: 'center', fontSize: 14,fontWeight:'bold',
			fontWeight: 'normal',color:'#333' }}>
			Sex
			</Text>
			
			
			</View>		
			

      <View style={styles.tableData}>

	
			
	
	 <ScrollView>
	    <FlatList

          data={this.state.arrayHolder}

          width='100%'

          extraData={this.state.arrayHolder}

          keyExtractor={(index) => index.toString()}

          ItemSeparatorComponent={this.FlatListItemSeparator}

          renderItem={({ item }) =>
		  
		  <View style={{flexDirection: 'row',marginTop:5 , width:250, textAlign:'center',alignItems: 'center',  justifyContent: 'center', }}>
			  <Text style={{marginLeft:10, textAlign:'center',alignItems: 'center',  justifyContent: 'center',width:60, fontSize:12,fontWeight: 'normal',color:'#000' }}>{item.name}</Text>
			  <Text style={{marginLeft:10,marginRight:10 , textAlign:'center',alignItems: 'center',  justifyContent: 'center',width:60, fontSize:12,fontWeight: 'normal',color:'#000' }}  onPress={() => {this.callNumber(item.phone)}} >{item.phone}</Text>
			  <Text style={{marginRight:10 , marginRight:5 ,fontSize:12,textAlign:'center',alignItems: 'center',  justifyContent: 'center',width:60, fontWeight: 'normal',color:'#000' }}>{item.gender}</Text>
		
	     </View>
	
	                }
        />

	</ScrollView>
	</View>		
	  
	  
	  </View>
	  
	  
	  
    );
  }
}

export default App = createStackNavigator(
{
   FBLoginButton: { screen: FBLoginButton,navigationOptions: ({ navigation }) => ({
	 headerStyle: {
                backgroundColor: "#000"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff",
				fontSize: 40,
    fontWeight: 'normal',
	 width:'100%', 
    textAlign:'center',
    alignItems: 'center',
            },
			
        
		  
		   
			
          
            })  },
   
   Information: { screen: Information,navigationOptions: ({ navigation }) => ({
	 headerStyle: {
                backgroundColor: "#000"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff",
				fontSize: 40,
    fontWeight: 'normal',
	 width:'100%', 
    textAlign:'center',
    alignItems: 'center',
            },
			
        
		  
		   
			
          
            })  }

});

const styles = StyleSheet.create({
	
	 maincontainer: {
    flex: 1,
  marginLeft:1,
  marginRight:1,
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
  label1: {
    fontSize: 16,
    fontWeight: 'normal',
	 fontFamily:'Futura Md Bt',
    textAlign:'left',
    alignItems: 'flex-start',
	marginTop:0,
    marginBottom: 8,
	
	
	 color:'#fff'
  },
  container1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  
	
	
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  
	
	
  },
  welcometext:
  {flexDirection: 'column',width:'100%',height:90,backgroundColor:'#000',color:'#fff' },
  formData:
  {flexDirection: 'row', width:250,height:40, textAlign:'center',alignItems: 'center',marginBottom:10,borderBottomColor:'#ff0000',borderBottomWidth:3 },
  formElement:
  {flexDirection: 'row', width:250,height:40, textAlign:'center',alignItems: 'center',marginBottom:10,borderBottomColor:'#ff0000',borderBottomWidth:3 },
  formRadio:
  {flexDirection: 'row',marginBottom:10 , width:250, textAlign:'center',alignItems: 'center',  justifyContent: 'center', },
  formButton:
  {flexDirection: 'column', width:250,height:50, textAlign:'center',alignItems: 'center', backgroundColor: "#ccc", color:"#fff",borderColor: "transparent",borderWidth: 0,borderRadius: 5},
  tableHeader:
  {flexDirection: 'row',marginTop:10,width:250,  height:25,
    textAlign:'center',
    alignItems: 'flex-start',  justifyContent: 'flex-start',borderWidth:2 ,borderColor: "#ccc", backgroundColor: "#fff", color:"#000",borderRadius:5},
  tableData:
  {flexDirection: 'row', width:250, height:250,fontSize:12,
    textAlign:'center',
    alignItems: 'flex-start',  justifyContent: 'center',borderColor: "#ccc" ,borderWidth:2,backgroundColor: "#fff", color:"#000",borderRadius:5 },
  
});
