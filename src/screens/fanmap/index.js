import React, { Component, Platform } from "react";
import { Text, View, StyleSheet } from "react-native";
import Permissions from "react-native-permissions";
import MapView from "react-native-maps";
import { Content, Icon, Button, Container } from "native-base";

import styles from "./style";

export default class FanMap extends Component {
    state = {
        location: null,
        errorMessage: null
    };

    constructor(props) {
        super(props);

        this.state = { isLoading: true };
        this.state = {
            markers: []
        };
    }

    componentDidMount() {
        fetch("http://5a5d22fad6221a0012962d50.mockapi.io/test/user/")
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

    _getLocationAsync() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    location: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.00922 * 1.5,
                        longitudeDelta: 0.00421 * 1.5
                    }
                });
            },
            error => console.log(error),
            { timeout: 20000, maximumAge: 1000 }
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
                                title={marker.email}
                            />
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
