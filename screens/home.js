import React ,{Component} from 'react';
import {StyleSheet,FlatList,View,ActivityIndicator} from 'react-native';
import {  Item, Input, Icon, Button,  Container, Header,
   Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import _ from 'lodash';
export default class Home extends Component{
  constructor(props){
    super(props)
    this.state={
      data:[],
      fulldata:[],
      page:1,
      isLoading:false,
      error:null,
      query:""
    }
  }
  componentDidMount(){
    this.setState({isLoading:true},this.getData)
    
  }
  getData = _.debounce(() =>{
    const api = "https://reqres.in/api/users?page="+this.state.page;
    fetch(api).then((res) => res.json())
    .then((resJson)=>{
      this.setState({
        data:this.state.data.concat(resJson.data),
        fulldata:this.state.data.concat(resJson.data),
        isLoading:false
      })
    }).catch(error =>{
      this.setState({error,isLoading:false})
    })
  },250)

  handleLoadMore=()=>{
    this.setState ({page:this.state.page+1},this.getData)
  }
  renderFooter=()=>{
    if(!this.state.isLoading) return null
    return(
      <View style={{paddingVertical:20,borderTopWidth:1,borderColor:'#CED0CE'}}>
          <ActivityIndicator animating size="large"/>
      </View>
    )
  }
  
  handleSreach = (text) =>{
    const formattedQuery=text.toLowerCase()
    const data=_.filter(this.state.fulldata, data =>{
      if(data.email.includes(formattedQuery)){
        return true
      }else false
    })
    this.setState({data , query:text})
  }

  render(){
    const {navigation} = this.props;
    return(
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={this.handleSreach}/>
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
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
      keyExtractor={(item,index)=>index.toString()}
      onEndReached={this.handleLoadMore}
      onEndReachedThreshold={50}
      ListFooterComponent={this.renderFooter}
      /> 
           
          </List>
        
      </Container>
  
      )}
}

