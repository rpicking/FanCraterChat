import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { Constants, Location, Permissions } from 'expo';
import MapView from 'react-native-maps';

import { Container,Button, Icon } from "native-base";

//const { StyleSheet, Dimensions } = React;
const { width, height } = Dimensions.get("window");

class FanMap extends Component {
    static navigationOptions = {
        title: 'MAP'
    }

    state = {
        location: null,
        errorMessage: null,
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._getLocationAsync();

    }

    componentWillReceiveProps(props) {
        
    }

    _getLocationAsync = async () => {
        let {
            status
        } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});

        let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5
        }

        this.setState({
            location: region
        });
    };

    render() {
        return ( 
            <View>
                <MapView style = {styles.map}
                    region = {this.state.location}
                    
                />
                <Button
                    transparent
                    large
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate("DrawerOpen")}
                    >
                    <Icon
                        name={"menu"}
                        type={"Entypo"}
                        style={{ color: "#777", fontSize: 32, width: 30 }}
                    />
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: width - 1,
        height: height,
        zIndex: -1
    },
    button: { 
        position: 'absolute',
        alignSelf: "flex-end",
        marginTop: 20,
        zIndex: 10
    }
});

function mapStateToProps() {
    return { };
};

export default connect(mapStateToProps, { })(FanMap);