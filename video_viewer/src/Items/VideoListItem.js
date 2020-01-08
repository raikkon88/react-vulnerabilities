import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
  } from 'react-native';
import axios from 'axios';
class VideoListItem extends Component {


    render(){
        return(
            <TouchableOpacity
                onPress={() => {
                    if(this.props.video.type==="f"){
                        console.log("this is a file")
                        this.props.history.push("/video" + this.props.video.path)
                    }
                    else {
                        console.log("this is a directory")
                        this.props.history.push("/" + this.props.video.path)
                    }
                }}
                >
                <Text>{this.props.video.name}</Text>
            </TouchableOpacity>
        );
    }
}
export default VideoListItem;