import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import Card from '../shared/card';
export default function ReviewDetails({navigation,route}){
/*const pressHandler=()=>{
    navigation.goBack();
}*/
    const {email} = route.params;
    const {first_name} = route.params;
    const {last_name} = route.params;
    const {avatar} = route.params;
    

    return(
        <View style={styles.contaner} >
          <Card>
            <View style={styles.img}>
              <Image style={styles.avatar} source={{uri:avatar}} />
            </View>
            <Text style={styles.text}>Email : {email}</Text>
            <Text style={styles.text}>First Name : {first_name}</Text>
            <Text style={styles.text}>Last Name: {last_name}</Text>
            </Card>
          
        </View>
    )
}
const styles = StyleSheet.create({
  contaner:{
      flex:1,
      padding:10,
  },
  img:{
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:16,
    marginTop:16,
    borderTopWidth:1,
    borderTopColor:'#eee',
  },
  avatar:{
    width:200,
    height:200,
    borderRadius:200/2
  }
  ,
  text:{
    fontSize:18,
    textAlign:'center',
    margin:30
  }
})

