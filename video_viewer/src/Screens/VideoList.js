import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import axios from 'axios';
import VideoListItem from '../Items/VideoListItem'
class VideoList extends Component {

    state = {
        actualDir: "",
        folders: [],
        videos: []
    }

    componentDidMount(){
        let route = this.props.location.search 
        let query = route.replace("?path=", "")

        axios.get(query).then(res => {
            console.log(res.data)
            let folders = []
            let videos = []

            res.data.forEach(element => {
                if(route === "") {
                    element.path = "?path=" + element.name
                }
                else{
                    element.path = route + "/" + element.name
                }
                if(element.type === "d"){
                    folders.push(element)
                }
                else if( element.type === "f" ){
                    videos.push(element)
                }
            });

            this.setState({
                folders: folders,
                videos: videos
            })
        })
    }

    render(){
        return (
            <View>
                <Text>The video list</Text>
                <FlatList
                    data={this.state.videos}
                    renderItem={({item}) => (
                        <VideoListItem video={item} history={this.props.history}></VideoListItem>
                    )}>
                </FlatList>
                <FlatList
                    data={this.state.folders}
                    renderItem={({item}) => (
                        <VideoListItem video={item} history={this.props.history}></VideoListItem>
                    )}>
                </FlatList>
            </View>
        )
    }
}
export default VideoList;