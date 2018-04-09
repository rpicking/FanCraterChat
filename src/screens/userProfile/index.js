import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
//import Auth0 from "react-native-auth0";
import { View, Text, Image, AsyncStorage, StyleSheet } from "react-native";
//import { initProfile, getCurrentUserInfo, updateProfile } from "../actions";
import {
    Container,
    Header,
    Content,
    Thumbnail,
    Button,
    FormLabel,
    FormInput,
    FormValidationMessage
} from "native-base";
//import LinearGradient from "react-native-linear-gradient";

export default class UserProfile extends Component {
    /*
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: "USERPROFILE",
            headerRight: (
                <Button
                    containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
                    buttonStyle={{ paddingRight: 14 }}
                    color={"#7d62d9"}
                    title="save"
                    backgroundColor="transparent"
                    onPress={() => {
                        logout(this.props.navigation);
                    }}
                />
            )
        };
    };*/

    constructor(props) {
        super(props);
        this.state = {
            profileUrl: "",
            userId: "",
            location: "",
            notables: ""
        };
    }

    /*getPlace = async() => {
        //send lat and log??
        location.setState
 
      }
      getPlace();*/

    componentDidMount() {
        //this.props.navigation.setParams({ handleSave: this._onSaveButtonPress });
        //this.props.initProfile();
        //this.props.getCurrentUserInfo();
    }

    componentWillReceiveProps(props) {
        //const { userInfo, isSaved } = props;

        const { profileUrl, userID, location, notables } = props;
        console.log(props);
        console.log(profileUrl);
        this.setState({ profileUrl, userID, location, notables });
    }
    /*
    render() {
        return (
            <Container>
                <Text>Welcome to React Native!</Text>
                <Text>To get started, edit App.js</Text>
            </Container>
        );
    }*/
    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require("../../../assets/logo.png")}
                        />
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            flexDirection: "row",
                            marginTop: 20,
                            marginBottom: 50
                        }}
                    >
                        <Thumbnail
                            large
                            source={{
                                uri:
                                    "https://i.pinimg.com/originals/be/dc/bf/bedcbfe81a37428c0ce5532ec1dc1f10.jpg"
                            }}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
    /*
    render() {
        return (
            <Container>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri:
                                "https://i.pinimg.com/originals/be/dc/bf/bedcbfe81a37428c0ce5532ec1dc1f10.jpg"
                        }}
                    />
                </View>
                <View
                    style={{
                        justifyContent: "center",
                        flexDirection: "row",
                        marginTop: 20,
                        marginBottom: 50
                    }}
                >
                    <Avatar large rounded source={{ uri: this.state.profileUrl }} />
                </View>
                <View style={styles.containerStyle}>
                    <FormLabel>Name:</FormLabel>
                    <FormLabel value={this.props.navigation.setState} />
                </View>
                <View style={styles.containerStyle}>
                    <FormLabel>Location:</FormLabel>
                    <FormLabel value={this.state.location} />
                </View>
                <View style={styles.containerStyle}>
                    <FormLabel>Notables:</FormLabel>
                    <FormLabel value={this.state.notables} />
                </View>
                <View style={styles.containerStyle}>
                    <Button
                        buttonStyle={{ backgroundColor: "#01bacc", marginTop: 40 }}
                        title="Log Out"
                        onPress={this._onButtonPress}
                    />
                </View>
                <View style={styles.containerStyle}>
                    <FormValidationMessage>{this.props.error}</FormValidationMessage>
                </View>
            </Container>
        );
    }*/
}

const styles = StyleSheet.create({
    containerStyle: {
        marginTop: 10
    },
    logoContainer: {
        marginTop: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        width: 300,
        height: 70
    },
    textstyle: {
        flex: 1
    }
});
