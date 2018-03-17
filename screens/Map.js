import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { Constants, Location, Permissions } from 'expo';
import MapView from 'react-native-maps';

class Map extends Component {
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
            <MapView style = {{ flex: 1 }}
                region = {this.state.location}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
});

function mapStateToProps() {
    return { };
};

export default connect(mapStateToProps, { })(Map);