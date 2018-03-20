import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Marker } from 'react-native-maps';
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
        this.state ={ isLoading: true}
        this.state = {
            markers: []
        }
    }
    
    componentDidMount(){
      return fetch('https://5a5d22fad6221a0012962d50.mockapi.io/test/user/')
        .then((response) => response.json())
        .then((responseJson) => {
    
          this.setState({
            isLoading: false,
            markers: responseJson,
          }, function(){
    
          });
    
        })
        .catch((error) =>{
          console.error(error);
        });
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
                <MapView style={styles.map}
                    region={this.state.location}
                    style={styles.map}
    
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
    map: {
        ...StyleSheet.absoluteFillObject,
      }, 
      marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
      },
});

function mapStateToProps() {
    return { };
};

export default connect(mapStateToProps, { })(Map);