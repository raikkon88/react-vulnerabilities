import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
} from 'react-native';
import axios from 'axios';
class VideoList extends Component {

    componentDidMount(){
        axios.get("/").then(res => {
            console.log(res)
        })
    }

    render(){
        return(
            <Text>Home component successfully loaded</Text>
        )
    }
}
export default VideoList;