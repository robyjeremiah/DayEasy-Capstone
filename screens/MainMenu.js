import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {StyleSheet, Text, View, Button } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
   

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const navigation = useNavigation();

  const LogOut = () => {
    const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
          });
      }
    
      const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '325201293658-0b5v1iqfstvgbqkh5bdmt76j5n9j3ode.apps.googleusercontent.com',
        iosClientId: '325201293658-0b5v1iqfstvgbqkh5bdmt76j5n9j3ode.apps.googleusercontent.com',
        androidClientId: '325201293658-0b5v1iqfstvgbqkh5bdmt76j5n9j3ode.apps.googleusercontent.com',
        webClientId: '325201293658-0b5v1iqfstvgbqkh5bdmt76j5n9j3ode.apps.googleusercontent.com',
      });
    
      React.useEffect(() => {
        if (response?.type === 'success') {
          const { authentication } = response;
          }
      }, [response]);

  return ( 
    <>
      <View style={styles.mainView}>
        <View style={styles.basicView}>
          <Text style={styles.PageTitle}>DayEasy Main Menu</Text>
        </View>
        <Button onClick={sayHello} title="Calendar">
          <Text style={styles.basicText}>
             The calendar</Text>
        </Button>
        <Button onPress={() => navigation.push("Workout")} title="Workout Plan">
          <Text style={styles.basicText}>
            workout plan
          </Text>        
        </Button>
        <Button onClick={sayHello} title="Muscle Index">
          <Text style={styles.basicText}>
            Muscle index
          </Text>        
        </Button>
        <Button onClick={sayHello} title="Meal Plan">
          <Text style={styles.basicText}>
            Meal plan
          </Text>        
        </Button>
        <Button onPress={() => navigation.push("WaterIntake")} title="WaterIntake">
          <Text style={styles.basicText}>
             Water Intake
          </Text>        
        </Button>
        <Button onClick={sayHello} title="Fasting Timer">
          <Text style={styles.basicText}>
            Fasting timer
          </Text>        
        </Button>
        <Button onPress={() => navigation.push("CalorieIntake")} title="CalorieIntake">
          <Text style={styles.basicText}>
            Calorie Intake
          </Text>        
        </Button>
        <Button onClick={sayHello} title="Pedometer">
          <Text style={styles.basicText}>
            Pedomter
          </Text>        
        </Button>
        <Button buttonStyle={styles.loginButton} onPress={() => LogOut()} title="Log Out" />        
      </View></>
  )}

const styles = StyleSheet.create({
  mainView:{
    flex:1,
    //paddingTop:50,
    backgroundColor: '#81B29A',
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
    //color:'#F4F1DE',
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
  buttonStyle:{
    textAlign:'center',
    alignItems:'center'
  }
})
function sayHello() {
  alert('create me');
}
// export default App;