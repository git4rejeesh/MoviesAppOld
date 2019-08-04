import React, {Component} from 'react';
import { StyleSheet, ScrollView, Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

const {height,width} = Dimensions.get('window');

export default class MovieDetail extends Component {
  
  static navigationOptions = {
    title: 'Movie Details',
    headerStyle: {
      backgroundColor: '#D32F2E',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {movieDetails: this.props.navigation.getParam('movie_details', "test")};
  }

  componentDidMount() {
    console.log(this.state.movieDetails);
  }

  render() {
    
    return (
      <View style={styles.container}>
          
          {/* Scroll View  */}
          <ScrollView style={styles.scrollViewContainer} >
            <Image  source={this.state.movieDetails && this.state.movieDetails.Poster != '' ? {uri: this.state.movieDetails.Poster} : require('../images/empty_project.png') }   style={{ width:"100%", height:400}}></Image>            
            <Text style={{width:"100%", marginTop:8, marginLeft:8, color:'white', fontSize:15, fontWeight:"400"}}>{this.state.movieDetails.Title}</Text>
            <Text style={{width:"100%", marginTop:8, marginLeft:8, color:'white', fontSize:15, fontWeight:"400"}}>Year : {this.state.movieDetails.Year}</Text>
          </ScrollView>

        </View> 
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: "#303030",
    // alignItems: "center",
    // justifyContent: "flex-start"
  },

 
  scrollViewContainer: {
    width: "100%",
    //backgroundColor:"#fff",
    // marginTop:10, 
    //backgroundColor:"#fff",
    // borderTopColor:"#fff",
  },
  
});
