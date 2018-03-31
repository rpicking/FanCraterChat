import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';
import { Container,Button, Icon } from "native-base";

const { width, height } = Dimensions.get("window");

class FanMap extends Component {
    static navigationOptions = {
        title: 'FanMap'
    }
    
    state = {
        location: null,
        errorMessage: null, 
    };
    
    constructor(props) {
        super(props);
        this.state ={ isLoading: true}
        this.state = {
            markers: []
        }
    }
    
    componentDidMount(){
    
        return fetch('http://5a5d22fad6221a0012962d50.mockapi.io/test/user/')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    markers: responseJson,
                }, function(){ });

        
            })
            .catch((error) =>{
                console.error(error);
            })
            .done();
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
            location: region,
            
        })
    };
    
    
    render() {
        return ( 
            <View>
                <MapView style = {styles.map}
                    region = {this.state.location}
                    followUserLocation={true}
                    zoomEnabled={true}
                >
                {this.state.markers.map((marker, index) => ( 
                    <MapView.Marker 
                        data={this.state.dataSource} 
                        key={index} 
                        coordinate={{latitude: marker.latitude, longitude: marker.longitude}} title={marker.email} /> 
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
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
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