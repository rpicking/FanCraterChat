import React, { Component, Platform } from "react";
import { Text, View, StyleSheet, Image, AsyncStorage } from "react-native";
import Permissions from "react-native-permissions";
import MapView from "react-native-maps";
import { Content, Icon, Button, Container, Toast } from "native-base";
import {updateApiUser, getRelatedUsers, getNotable} from "../../actions/apiActions";
import { calculateDistance } from "../../helpers/helpers";

import styles from "./style";

export default class FanMap extends Component {
    state = {
        location: null,
        errorMessage: null,
        longitude: null,
        latitude: null,
        id: null
    };

    constructor(props) {
        super(props);

        this.state = { isLoading: true };
        this.state = {
            markers: []
        };
    }

    componentWillUnmount() {
        this.listener.remove();
    }

    componentDidMount() {
        this.listener = this.props.navigation.addListener("didFocus", () => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.00922 * 1.5,
                        longitudeDelta: 0.00421 * 1.5
                    };
                    this.setState({ location: region });
                },
                error => this.setState({ error: error.message })
            );
        });

        this.getUserId();
        this.getMarkers();
        this.initRequestionLocation();
        this._getLocationAsync();
    }

    initRequestionLocation = () => {
        Permissions.check("location", "always").then(async res => {
            if (!res === "authorized") {
                this.locationPermission = await Permissions.request("location", "always");
                console.log("permission: ", this.locationPermission);
            }
        });
    };

    getUserId = async () => {
        var id = await AsyncStorage.getItem("api_id");
        this.setState({
            user_id: id
        });
    };

    getUserId = async () => {
        var id = await AsyncStorage.getItem("api_id");
        this.setState ({
            user_id: id
        })
    };

    getMarkers = async () => {
        var notable = await getNotable();
        markers = await getRelatedUsers(notable);
        this.setState({
            markers: markers
        });
    };

    getCoordinates = async () => {
        var latitude = await AsyncStorage.getItem("latitude");
        var longitude = await AsyncStorage.getItem("longitude");
        coordinates = {
            latitude: latitude, 
            longitude: longitude
        };
        return coordinates;
    };

    renderChatButton(userid, chat_id) {
        if (userid == this.state.user_id) return null;
        else {
            return (
                <Button
                    style={{ backgroundColor: "#000" }}
                    onPress={() =>
                        this.props.navigation.navigate("ChatIndiv", {
                            channelId: chat_id
                        })
                    }
                >
                    <Text
                        style={{
                            marginLeft: 50,
                            marginRight: 50,
                            color: "#ffffff"
                        }}
                    >
                        Chat
                    </Text>
                </Button>
            );
        }
    }

    goToProfile(nickname, lat, long, blurb, notables, profileUrl, chatId) {
        this.props.navigation.navigate("UserProfile", {
            nickname: nickname,
            lat: lat,
            long: long,
            notables: notables,
            blurb: blurb,
            profileUrl: profileUrl,
            chat_id: chatId
        });
    }

    displayErrorAndSetLocation() {
        Toast.show({
            text: "Couldn't find current location",
            position: "bottom",
            buttonText: "Okay", 
            duration: 5000
        });
        navigator.geolocation.getCurrentPosition(
            position => {
                coordinates = this.getCoordinates();
                region = {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                    latitudeDelta: 0.00922 * 1.5,
                    longitudeDelta: 0.00421 * 1.5
                };
                this.setState({location: region});
            });  
    }


    _getLocationAsync() {
        navigator.geolocation.watchPosition(
            position => {
                region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.00922 * 1.5,
                    longitudeDelta: 0.00421 * 1.5
                };

                if (
                    calculateDistance(
                        this.state.latitude,
                        this.state.longitude,
                        region.latitude,
                        region.longitude
                    ) >= 0.01524
                ) {
                    updateApiUser({
                        latitude: region.latitude,
                        longitude: region.longitude
                    });
                    this.getMarkers();
                }

                this.setState({
                    location: region,
                    latitude: region.latitude,
                    longitude: region.longitude
                });
            },
            (error) => {
                coordinates = this.getCoordinates();
                if (coordinates.latitude == null || coordinates.longitude == null) {
                    Toast.show({
                        text: "Couldn't find current location",
                        position: "bottom",
                        buttonText: "Okay", 
                        duration: 5000
                    });
                }
                else {
                    this.displayErrorAndSetLocation();
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 10
            }
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
                            >
                                <MapView.Callout
                                    style={{ padding: 5, height: 200, width: 200 }}
                                    onPress={() => {
                                        this.goToProfile(
                                            marker.nickname,
                                            marker.latitude,
                                            marker.longitude,
                                            marker.blurb,
                                            marker.notable,
                                            marker.image,
                                            marker.chat_id
                                        );
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            alignContent: "flex-start"
                                        }}
                                    >
                                        <View style={{ paddingRight: 5 }}>
                                            <Image
                                                style={{ width: 50, height: 50 }}
                                                source={{ uri: marker.image }}
                                            />
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            alignContent: "flex-start"
                                        }}
                                    >
                                        <View>
                                            <Text
                                                style={{
                                                    color: "#00bcd4",
                                                    fontSize: 25
                                                }}
                                            >
                                                {marker.nickname}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            alignContent: "flex-start"
                                        }}
                                    >
                                        <View style={{}}>
                                            <Text>
                                                Notable:{" "}
                                                <Text style={{ color: "#fa0058" }}>
                                                    {marker.notable}
                                                </Text>
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "column",
                                            alignItems: "center"
                                        }}
                                    />
                                </MapView.Callout>
                            </MapView.Marker>
                        ))}
                    </MapView>
                    <Button
                        transparent
                        large
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("DrawerOpen")}
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
