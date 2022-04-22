//import * as React from 'react';
//import pageTitle from './screens/WorkOutScreen';
import {StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { collection,collectionGroup, query, where, getDocs, getDoc, doc ,updateDoc, setDoc} from "firebase/firestore";
import { db } from '../../firebase';
import React, { useState, useEffect } from "react";
//import chestIcon from 'assets/muscleIcons/chestIcon.png'
import chestIcon from '../../assets/muscleIcons/chestIconbackground.jpg';
import absIcon from '../../assets/muscleIcons/absIcon.jpg';
import backIcon from '../../assets/muscleIcons/backIcon.jpg';
import legIcon from '../../assets/muscleIcons/legIcon.jpg';
import shoulderIcon from '../../assets/muscleIcons/shouldersIcon.jpg';
import armIcon from '../../assets/muscleIcons/armIcon.jpg';


export default function weekDayMenu() {

  const navigation = useNavigation();
  
  const [selectDay, setSelectDay] = useState('');
  const [selectGroup, setSelectGroup] = useState('');
  const [selectmuscleGroup, setSelectmuscleGroup] = useState('');
  let muscleGroup = '';

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

  const workoutData = (muscleGroup) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const docSnap = getDoc(doc(db, 'userWorkoutSet', user.email, selectGroup))
    docSnap.then(doc => {
      if(doc.exists){
        console.log('Document exists, id: '+doc.id);        
        updateDoc(doc.ref,{
          userMuscle : muscleGroup,           
        })        
      }
      //navigation.push("WorkoutSelect");      
    })    
  }
  return (
    <>
      <View style={styles.mainView}>        
        <View style={styles.basicView}>
          <TouchableOpacity
            style={styles.backButton} 
            onPress={() => navigation.push("WorkoutPlanMain")}
            //onPress={() => navigation.push("WorkoutSelect")}
            >            
            <Text style={styles.basicText}>
             &lt;Back 
            </Text>        
          </TouchableOpacity>
          <Text style={styles.PageTitle} >{selectDay}</Text>
        </View>        
        <TouchableOpacity 
          style={styles.iconStyle}
          onPress={
            () => { muscleGroup = 'Chest'; workoutData(muscleGroup); }
          }
        >
          <img src={chestIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconStyle}
          onPress={() => navigation.push("WorkoutPlanMain")}
        >
          <img src={absIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconStyle}
          onPress={() => navigation.push("WorkoutPlanMain")}
        >
          <img src={chestIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconStyle}
          onPress={() => navigation.push("WorkoutPlanMain")}
        >
          <img src={chestIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconStyle}
          onPress={() => navigation.push("WorkoutPlanMain")}
        >
          <img src={chestIcon} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconStyle}
          onPress={() => navigation.push("WorkoutPlanMain")}
        >
          <img src={chestIcon} />
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
      iconRow:{
        width: '50%',
        alignItems: 'center',
      },
      iconColumn:{
        width: 200,
      },
      iconStyle:{
        height: 200,
        width: 200,
        "&:hover": {
          backgroundColor: "#15e577",
          borderColor:"#564345"
        },
      },
})
