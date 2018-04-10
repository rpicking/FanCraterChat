import React, { Component, Platform } from "react";
import { Text, View, StyleSheet, Image, AsyncStorage } from "react-native";
import Permissions from "react-native-permissions";
import MapView from "react-native-maps";
import { Content, Icon, Button, Container } from "native-base";
import { updateApiUser, getRelatedUsers, getNotable } from "../../actions/apiActions";
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

    componentDidMount() {
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

    getMarkers = async () => {
        var notable = await getNotable();
        markers = await getRelatedUsers(notable);
        this.setState({
            markers: markers
        });
    };

    renderChatButton(userid, chat_id) {
        if (userid == this.state.user_id) return null;
        else {
            return (
                <Button
                    style={{ backgroundColor: "#000" }}
                    onPress={() => {
                        console.log("press");
                        this.props.navigation.navigate("ChatIndiv", {
                            channelId: chat_id
                        });
                    }}
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
                    ) >= 0.003048
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
            error => this.setState({ error: error.message }),
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
                                    onPress={() => console.log("butts")}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            alignContent: "flex-start"
                                        }}
                                    >
                                        <View style={{ paddingRight: 5 }}>
                                            <Button
                                                onPress={() =>
                                                    this.props.navigation.navigate(
                                                        "DrawerOpen"
                                                    )
                                                }
                                            >
                                                <Image
                                                    style={{ width: 50, height: 50 }}
                                                    source={{ uri: marker.image }}
                                                />
                                            </Button>
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
                                    >
                                        <View style={{ alignItems: "center" }}>
                                            {this.renderChatButton(
                                                marker.id,
                                                marker.chat_id
                                            )}
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
