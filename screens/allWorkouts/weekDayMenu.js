//import * as React from 'react';
//import pageTitle from './screens/WorkOutScreen';
import {StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { collection,collectionGroup, query, where, getDocs, getDoc, doc ,updateDoc, setDoc} from "firebase/firestore";
import { auth, db } from '../../firebase';
import React, { useState, useEffect } from "react";
//import chestIcon from 'assets/muscleIcons/chestIcon.png'
import chestIcon from '../../assets/muscleIcons/chestIcon.png';

export default function weekDayMenu() {

  const navigation = useNavigation();
  
  const [selectDay, setSelectDay] = useState('');

  const getItems = () =>{
    const auth = getAuth();
    const user = auth.currentUser;
    var docData;
    const docSnap = getDoc(doc(db, "userWorkoutSet", user.email))
    docSnap.then(doc => {
      if (doc.exists) {
        console.log('Document retrieved successfully. ' + doc.id);
        if (doc.data() == null ){

        }
      else{
        setSelectDay(doc.get('userSelect')); 
      }
      }
      return;
    });
  }
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      getItems()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  /*
  8888
  
  8888
  const getItems = () => {
    console.log("Get Items");
    const auth = getAuth();
    const user = auth.currentUser;
    var docdata;
    getDocs(collection(db, "agenda", user.email, "dates")).then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
          console.log("Doc id: " + doc.id + " data:" + doc.data().itemcount + "\n")
          var temparray = []
          if (doc.data().itemcount != null){
            docdata = doc.data()
            for(let i = 1; i <= doc.data().itemcount; i++){
              var tempobj= {time: null, description: null, location: null, marked: null};
              tempobj.time = docdata[i].time
              tempobj.description = docdata[i].description
              tempobj.location = docdata[i].location

              temparray.push(tempobj)
            }
            temparray.sort((a, b) => {
              return a.time > b.time ? 1:-1
            })
            useritems[doc.id.toString()] = temparray;
          }
      });
      return;
    })

    setModalVisible(false);
  }
  test git
  useEffect(() => {
    getItems();
  }, []);
  */
  return (
    <>
      <View style={styles.mainView}>        
        <View style={styles.basicView}>
          <TouchableOpacity
            style={styles.backButton} 
            onPress={() => navigation.push("Workout")}>
            <Text style={styles.basicText}>
             &lt;Back d
            </Text>        
          </TouchableOpacity>
          <Text style={styles.PageTitle} >{selectDay}</Text>
        </View>
        <TouchableOpacity
          
        >
          <img scr={chestIcon} />
        </TouchableOpacity>              
                 
      </View></>
       
  )}

  const styles = StyleSheet.create({
    mainView:{
        //flex:1,
        //paddingTop:50,
        backgroundColor: '#81B29A',
        //height: '100%',
        //height: '100vh',
        //alignSelf: 'stretch',
        alignItems:'center', //center x axis
        //justifyContent:'center', //center y axis 
      },
      basicView:{
        backgroundColor:'#3D405B',
        width:'100%',        
        marginBottom:5
      },
      basicText:{
        fontSize:20,
        color: 'white',
        textAlign:'center',
        padding:20
      },      
      PageTitle:{
        fontSize: 40,
        color: 'white',
        paddingTop: 50,
        paddingBottom: 10,
        fontWeight: '400',
        textAlign:'center',
        alignItems:'center' //center x axis
        //justifyContent:'flex-start' //center y axis    
      },
      buttonText:{
        fontSize: '300%',
        fontWeight: 700,
        marginTop: 10,
        marginBottom: 10,
        //borderColor: 'black',
        //textShadowColor: 'red',
        color: 'white'
      },
      buttonStyle:{
        textAlign:'center',
        alignItems:'center',
        borderRadius: 1000,
        borderWidth: 1,
        width: '70%',
        //marginBottom: 10,
        //padding: '100, 7px 10px 7px',
        //paddingRight: '50%',
        //paddingLeft: 70,
        //flex: 1,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 5,
        backgroundColor:'#3D405B',
        color: 'white'
      },
      AddedToWorkout:{
        textAlign:'center',
        alignItems:'center',
        borderRadius: 1000,
        borderWidth: 1,
        width: '70%',
        //marginBottom: 10,
        //padding: '100, 7px 10px 7px',
        //paddingRight: '50%',
        //paddingLeft: 70,
        //flex: 1,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 5,
        backgroundColor:'red',
        color: 'red'
      },
      iconStyle:{
        zIndex: 1
      }
})
