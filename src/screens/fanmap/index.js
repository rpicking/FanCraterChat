import React, { Component, Platform } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Permissions from "react-native-permissions";
import MapView from "react-native-maps";
import { Content, Icon, Button, Container } from "native-base";

import styles from "./style";

export default class FanMap extends Component {
    state = {
        location: null,
        errorMessage: null, 
        longitude: null, 
        latitude: null
    };

    constructor(props) {
        super(props);

        this.state = { isLoading: true };
        this.state = {
            markers: []
        };
    }

    componentDidMount() {
        fetch("https://5a5d22fad6221a0012962d50.mockapi.io/test/user/")
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        isLoading: false,
                        markers: responseJson
                    },
                    function() {}
                );
            })
            .catch(error => {
                console.error(error);
            })
            .done();

        this.initRequestionLocation();
        this._getLocationAsync();
    }

    initRequestionLocation = () => {
        Permissions.check("location", "always").then(async res => {
            if (!res === "authorized") {
                this.locationPermission = await Permissions.request(
                    "location",
                    "always"
                );
                console.log("permission: ", this.locationPermission);
            }
        });
    };

    getUpdatedUsers() {
        fetch("https://5a5d22fad6221a0012962d50.mockapi.io/test/user/")
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        isLoading: false,
                        markers: responseJson
                    },
                    function() {}
                );
            })
            .catch(error => {
                console.error(error);
            })
            .done();
    }
    
    updateLocation(newLongitude, newLatitude) {
        fetch('https://5a5d22fad6221a0012962d50.mockapi.io/test/user/2', {  
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            longitude: newLongitude,
            latitude: newLatitude, 
        })
        })
    }

    calculateDistance = (lat1, lon1, lat2, lon2) => {
        if (lat1 == null || lon1 == null)
            return 0;
        const toRadians = (angle)=>{
            return angle * Math.PI / 180;
        }
        
        var R = 6371e3; // metres
        var phi1 = toRadians(lat1)
        var phi2 = toRadians(lat2)
        var deltaPhi = toRadians((lat2-lat1))
        var deltaLambda = toRadians((lon2-lon1))
        
        var a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
                Math.cos(phi1) * Math.cos(phi2) *
                Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        var d = R * c;
        return d;
    }

    onMarkerPress = (fname, image) => {
        
            return (
                    <Text>Dialog box</Text>
            );
    }

    _getLocationAsync() {
        navigator.geolocation.watchPosition(
            position => {
                    region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.00922 * 1.5,
                        longitudeDelta: 0.00421 * 1.5
                    }
                
                    if (this.calculateDistance(this.state.latitude, this.state.longitude, region.latitude, region.longitude) >= 0.003048) {
                        this.updateLocation(region.longitude, region.latitude);
                        this.getUpdatedUsers();
                    } 

                    this.setState({location: region, latitude: region.latitude, longitude: region.longitude})
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
        );
        
        
    }

    render() {
        return (
            <Container>
                <Content>
                    <MapView
                        style={styles.map}
                        region={this.state.location}
                        followUserLocation={true}
                        zoomEnabled={true}
                    >
                        {this.state.markers.map((marker, index) => (
                            <MapView.Marker
                                data={this.state.dataSource}
                                key={index}
                                coordinate={{
                                    latitude: marker.latitude,
                                    longitude: marker.longitude
                                }}
                                
                                
                                //image={marker.image}
                                //onPress={() => { this.onMarkerPress(marker.nickname, marker.image) }}
                            >
                            <MapView.Callout style={{padding: 5, height: 200, width: 200, overflow: "visible"}}>
                                <View style={{flex: 1, flexDirection: "row", alignContent: "flex-start"}}>
                                <View style={{paddingRight: 5}}>
                                <Button onPress={ () =>this.props.navigation.navigate("DrawerOpen")}>
                                <Image style={{width: 50, height: 50}} source={{uri: marker.image}}/>
                                </Button>
                                </View>
                                </View>
                                <View style={{flex: 1, flexDirection: "row", alignContent: "flex-start"}}>
                                <View style={{}}>
                                    <Text style={{color: "#1f56af", fontSize: 40}}>{marker.nickname}</Text>
                                </View>
                                </View>
                                <View style={{flex: 1, flexDirection: "row", alignContent: "flex-start"}}>
                                <View style={{}}>
                                    <Text>Notable: <Text style={{color: "#fa0058"}}>{marker.notable}</Text></Text>
                                </View>
                                </View>
                                <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
                                <View style={{alignItems: "center"}}>
                                <Button onPress={ () =>this.props.navigation.navigate("DrawerOpen")}>
                                    <Text style={{marginLeft: 50, marginRight: 50 }}>Chat</Text>
                                </Button>
                                </View>
                                </View>
                            </MapView.Callout>
                            </MapView.Marker>
                        ))}
                    </MapView>
                    <Button
                        transparent
                        large
                        style={styles.button}
                        onPress={() =>
                            this.props.navigation.navigate("DrawerOpen")
                        }
                    >
                        <Icon
                            name={"menu"}
                            type={"Entypo"}
                            style={{
                                color: "#777",
                                fontSize: 32,
                                width: 30
                            }}
                        />
                    </Button>
                </Content>
            </Container>
        );
    }
}
