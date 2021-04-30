import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Alert, ScrollView, Image } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import db from '../config'
import firebase from 'firebase'

export default class WelcomeScreen extends Component{
    constructor(){
        super();
        this.state={
            emailId: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            contact: "",
            confirmPassword: "",
            isModalVisible: "false"
        }
    }

    userLogin = (emailId, password) => {
      firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(() => {
          this.props.navigation.navigate("AddTodo");
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    };
      userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              email_id:this.state.emailId,
              address:this.state.address
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
      }

      showModal = () => {
        return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible}
          >
            <ScrollView style={styles.scrollview}>
              <View style={styles.signupView}>
                <Text style={styles.signupText}> SIGN UP </Text>
              </View>
              <View style={{ flex: 0.95, backgroundColor:"#eae2d6" }}>
                <Text style={styles.label}>First Name </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"First Name"}
                  maxLength={12}
                  onChangeText={text => {
                    this.setState({
                      firstName: text
                    });
                  }}
                />
    
                <Text style={styles.label}>Last Name </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Last Name"}
                  maxLength={12}
                  onChangeText={text => {
                    this.setState({
                      lastName: text
                    });
                  }}
                />
    
                <Text style={styles.label}>Contact </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Contact"}
                  maxLength={10}
                  keyboardType={"numeric"}
                  onChangeText={text => {
                    this.setState({
                      contact: text
                    });
                  }}
                />
    
                <Text style={styles.label}> Address </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Address"}
                  multiline={true}
                  onChangeText={text => {
                    this.setState({
                      address: text
                    });
                  }}
                />
    
                <Text style={styles.label}>Email </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Email"}
                  keyboardType={"email-address"}
                  onChangeText={text => {
                    this.setState({
                      emailId: text
                    });
                  }}
                />
    
                <Text style={styles.label}> Password </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  onChangeText={text => {
                    this.setState({
                      password: text
                    });
                  }}
                />
    
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Confrim Password"}
                  secureTextEntry={true}
                  onChangeText={text => {
                    this.setState({
                      confirmPassword: text
                    });
                  }}
                />
              </View>
    
              <View style={{ flex: 0.2, alignItems: "center", backgroundColor:"#f5f5f5" }}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() =>
                    this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    )
                  }
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
                <Text
                  style={styles.cancelButtonText}
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}
                >
                  Cancel
                </Text>
              </View>
            </ScrollView>
          </Modal>
        );
      };
    render(){
        return(
          <View style={styles.container}>
          {this.showModal()}
          <View style={{ flex: 1 }}>
              <View style = {styles.profileContainer}>
                  <Text style = {styles.title}>Todo App</Text>
              </View>
              <Image
                source={require("../assets/todo.png")}
                style={styles.Image}
              />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.TextInput}>
              <TextInput
                style={styles.loginBox}
                placeholder="abc@xyz.com"
                placeholderTextColor="#ffff"
                keyboardType='email-address'
                onChangeText={(text)=>{
                    this.setState({
                        emailId:text
                    })
                  }}
              />

              <TextInput
                style={styles.loginBox}
                secureTextEntry={true}
                placeholder="password"
                placeholderTextColor="#ffff"
                onChangeText={(text)=>{
                    this.setState({
                        password:text
                    })
                  }}
             />

            </View>
            <View style={{ flex: 0.5, alignItems: "center" }}>
              <TouchableOpacity
                style={[styles.button,{marginBottom:20,marginTop:20}]}
                onPress={() => {
                  this.userLogin(this.state.emailId, this.state.password);
                }}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.setState({ isModalVisible: true })}
              >
                <Text style={styles.buttonText}>SignUp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#003b46',
      borderWidth:7,
      borderColor:"#c4dfe6"
    },
    title:{
      fontSize:60,
      fontWeight:'300',
      textAlign:'center',
      paddingBottom:10,
      color : '#fb6542'
    },
    loginBox: {
      width: "80%",
      height: RFValue(50),
      borderWidth: 1.5,
      borderColor: "#ffffff",
      fontSize: RFValue(20),
      paddingLeft: RFValue(10)
    },
      button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#07575b",
        shadowColor: "#98dbc6",
        bottom:20,
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
      },
    buttonText:{
      color:'#ffff',
      fontWeight:'200',
      fontSize:20
    },
    label: {
      fontSize: RFValue(13),
      color: "#5c777f",
      fontWeight: "bold",
      paddingLeft: RFValue(10),
      marginLeft: RFValue(20)
    },
    formInput: {
      width: "90%",
      height: RFValue(45),
      padding: RFValue(10),
      borderWidth: 1,
      borderRadius: 2,
      borderColor: "#FFD700",
      paddingBottom: RFValue(10),
      marginLeft: RFValue(20),
      marginBottom: RFValue(14)
    },
    registerButton: {
      width: "75%",
      height: RFValue(50),
      marginTop: RFValue(20),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(3),
      backgroundColor: "#f77604",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop: RFValue(10)
    },
    registerButtonText: {
      fontSize: RFValue(23),
      fontWeight: "bold",
      color: "#fff"
    },
    cancelButtonText: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      color: "#867666",
      marginTop: RFValue(10)
    },
    scrollview: {
      flex: 1,
      backgroundColor: "#fff"
    },
    signupView: {
      flex: 0.05,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f56c57"
    },
    signupText: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      color: "#231b12"
    },
    TextInput: {
      flex: 0.5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:"#66a5ad"
    },
    Image: {
      width: "50%",
      height: RFValue(220),
      left: 100,
      bottom: 1
    },
  });