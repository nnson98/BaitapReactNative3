import React ,{Component} from 'react';
import {StyleSheet,FlatList,View,ActivityIndicator,TouchableNativeFeedback,Keyboard} from 'react-native';
import {  Item, Input, Icon, Button,  Container, Header,
   Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import _ from 'lodash';
export default class Home extends Component{
  constructor(props){
    super(props)
    this.state={
      data: [],
      fulldata: [],
      page: 1,
      allowLoadMore: false,
      isLoading: false,
      error: null,
      query: "",
      refreshing: false
      
    }
  }
  componentDidMount(){
    this.getData();
    
  }
  
  getData = () =>{
    this.setState({isLoading:true})
    const { page} = this.state;
    const api = "https://reqres.in/api/users?page="+page;
    fetch(api).then((res) => res.json())
    .then((resJson)=>{
      this.setState({
        isLoading:false,
        data:this.state.data.concat(resJson.data),
        fulldata:this.state.data.concat(resJson.data),
        refreshing : false
        },);
        resJson.data.length == 6
          ? this.setState({ allowLoadMore: true })
          : this.setState({ allowLoadMore: false });
    }).catch(error =>{
      this.setState({error,isLoading:false,refreshing:false})
    })
  }

  handleLoadMore = () => {
    if (this.state.allowLoadMore == true) {
      this.setState(
        {
          page: this.state.page + 1
          
        },
        () => this.getData()
      );
    }
    
    
  
    
  }
  renderSeparator = () => {
    return (
      <View
        style={
          styles.viewSeparator
        }
      />
    );
  };
  renderFooter=()=>{
    if(!this.state.isLoading) return null
    return(
      <View style={styles.viewFooter}>
          <ActivityIndicator animating size="large"/>
      </View>
    )
  }
  renderHeader = () => {
    return <Header searchBar rounded>
    <Item>
      <Icon name="ios-search" />
      <Input placeholder="Search" onChangeText={this.handleSreach}/>
    </Item>

  </Header> ;
  };
  handleRefresh = () => {
    this.setState(
      {
        data: [],
        fulldata: [],
        page: 1,
        refreshing: true
      },
      () => {
        this.getData();
      }
    );
  };
  
  
  handleSreach = (text) =>{
      
        const formatQuery=text.toLowerCase()
      const data=_.filter(this.state.fulldata, data =>{
        if(data.email.includes(formatQuery)){
          return true
        }else 
          false
      })
      this.setState ({data,query:text})
  }
  
  

  render(){
    const {navigation} = this.props;
    return(
      
      <Container>
        
        <List >
        <FlatList 
      data={this.state.data}
      renderItem={({item})=>(
        <ListItem avatar >
        <Left>
          <Thumbnail source={{ uri: item.avatar }} />
        </Left>
        <Body>
        <Text>{item.first_name} {item.last_name}</Text>
      <Text >{item.email}</Text>
        </Body>
        <Right>
                <Icon name="arrow-forward" onPress={()=>navigation.navigate('ReviewDetails',item)}/>
              </Right>
      </ListItem>
      )}
      keyExtractor={(item)=>item.email}
      ItemSeparatorComponent={this.renderSeparator}
      ListHeaderComponent={this.renderHeader}
      ListFooterComponent={this.renderFooter}
     refreshing={this.state.refreshing}
     onRefresh={this.handleRefresh}
     onEndReachedThreshold={1}
     onEndReached={this.handleLoadMore}
     
     
    
     
      
      /> 
           
          </List>
         
      </Container>
      
      )}
}

const styles = StyleSheet.create({
  viewSeparator:{
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%"
  },
  viewFooter:{
    paddingVertical:20,borderTopWidth:1,borderColor:'#CED0CE'
  }
});

