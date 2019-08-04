import React, {Component} from 'react';
import { StyleSheet, FlatList, Text, TouchableHighlight, Image, ScrollView, TextInput, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { List, ListItem, SearchBar, ActivityIndicator } from 'react-native-elements';

const {height,width} = Dimensions.get('window');

export default class MovieList extends Component {
  
  static navigationOptions = {
    title: 'Movies',
    headerStyle: {
      backgroundColor: '#D32F2E',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'left',
      flex:1,
    },
  };
  
  constructor(props) {
    super(props);
    this.state = {movieName: "" , movieData:[]};
  }

  componentDidMount() {
    //this.movieSearchHandler('Avengers');
  }

  movieNameChangedHandler = val => {
    
    this.setState({
      movieName: val
    });
  };

  movieSearchHandler = async (movieName) => {

    console.log("movieSearchHandler");

    var data = {};

    return fetch('http://www.omdbapi.com/?s='+ movieName + '&page=1&apikey=91cbc96c', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((responseJson) => {

        if("True" == responseJson.Response ) {

          try {
            if(responseJson.Search &&  '0' < responseJson.Search.length) {
              this.setState({ movieData: responseJson.Search});
              console.log(movieName);
              console.log(this.state.movieData);
            }

          } catch (error) {
            this.refs.toast.show('Oops! Something went wrong, Try again later.',1000);
          }
        }
        
      })
      .catch((error) =>{
        this.refs.toast.show('Oops! Something went wrong, Try again later.',3500);
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          
          {/* Search bar  */}
          <View style={styles.inputContainer}>        
            <TextInput
              placeholder="Enter movie name"
              value={this.state.movieName}
              onChangeText={this.movieNameChangedHandler}
              style={styles.movieInput}
            />        
            <TouchableOpacity activeOpacity={.6} onPress={() => {this.movieSearchHandler(this.state.movieName)}} 
                  style={styles.movieButton}>
                  <Text style={{color:'white', fontSize:15, fontWeight:'bold'}}>Search</Text>
            </TouchableOpacity>
          </View>

          {/* Scroll View  */}
          <ScrollView style={styles.scrollViewContainer}>
            {this.state.movieData &&  '0' < this.state.movieData.length ?  this.state.movieData.map((item,i) => (
              <View style={styles.movieListView} key={i}>
                <TouchableOpacity style={{ marginLeft:8, width:"35%", height:100, borderRadius:6, }} activeOpacity={.6} onPress={() => {this.props.navigation.navigate('MovieDetail', {"movie_details": item})}}>
                  <Image  source={item.Poster && item.Poster != '' ? {uri: item.Poster} : require('../images/empty_project.png') } resizeMode="contain"  style={{flex:1}}></Image>
                </TouchableOpacity>
                {/* source={require('../images/empty_project.png')} */}
                <Text style={{width:"60%", marginRight:8, color:'white', fontSize:15, fontWeight:"400"}}>{item.Title}</Text>
              </View>
            )):null}
          </ScrollView>

          {/* <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.movieData}
              renderItem={({ item }) => (
                <View style={styles.movieListView} >
                  <Image source={{uri: item.Poster}} style={{width:200,height:200,borderRadius:6, }}></Image>
                </View>
              )}
              keyExtractor={item => item.Title}
              refreshing={this.state.refreshing}
            />
          </List> */}
        </View> 
      </TouchableWithoutFeedback>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#303030",
    alignItems: "center",
    justifyContent: "flex-start"
  },

  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  movieInput: {
    width: "70%",
    height:40,
    color:'#fff',
  },
  movieButton: {
    width: "30%",
    height:40,
    alignItems:'center', 
    justifyContent:'center', 
    borderRadius:30, 
    backgroundColor:'#D32F2E',
  },
  scrollViewContainer: {
    width: "100%",
    marginTop:10, 
    //backgroundColor:"#fff",
    borderTopColor:"#fff",
  },
  movieListView: {
    width: "100%",
    height:150,
    flexDirection: 'row',
    //backgroundColor:"#434343",
    borderBottomColor:"#fff",
    justifyContent:"space-between",
    alignItems:'center',
  },
});
