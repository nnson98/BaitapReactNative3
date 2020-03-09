import React from 'react';
import { createStackNavigator,TransitionPresets,CardStyleInterpolators} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/home';
import ReviewDetails from '../screens/detail';
import { Easing } from 'react-native';

const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeConfig={
  animation:'timing',
  config:{
    duration:500,
    easing:Easing.linear
  }
}
export default  Navigator =() =>{
  return (
      <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          gestureEnabled:true,
          gestureDirection:'horizontal',
          cardStyleInterpolator:CardStyleInterpolators
          .forHorizontalIOS,
          transitionSpec:{
            open:config,
            close:closeConfig,
          }
        }}
        headerMod="float"
        animation="fade"
      >
        <Stack.Screen name='Home' component={Home} options={{ title: 'User'}} />
        
        <Stack.Screen 
 name='ReviewDetails' component={ReviewDetails} options={{ title: 'UserDetails'}} />

      </Stack.Navigator>
      </NavigationContainer>
  )
}