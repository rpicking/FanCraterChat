import React, { Component } from "react";
import {
    Image,
    ImageBackground,
    View,
    StatusBar,
    AsyncStorage
} from "react-native";
import { NavigationActions } from "react-navigation";
import { Container, Spinner, Button, Text, Content, Toast } from "native-base";
import { launchLogin, getMetadata } from "../../actions/auth0Actions";

import styles from "./styles";

const launchscreenBg = require("../../../assets/splashscreen.png");
const launchscreenLogo = require("../../../assets/logo.png");

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = { loggedIn: true };
    }

    componentDidMount() {
        this.init_user();
    }

    init_user = async () => {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (accessToken) {
            await getMetadata();
            setTimeout(this.openFanMap, 1500);
        } else {
            this.setState({ loggedIn: false });
        }
    };

    openFanMap = () => {
        // remove splash screen from history then navigate to first item in drawer (FanMap)
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Drawer" })]
        });

        this.props.navigation.dispatch(resetAction);
    };

    _onLoginPress = async () => {
        this.setState({ loggedIn: true });
        const status = await launchLogin();
        if (status) {
            this.openFanMap();
        } else {
            this.setState({ loggedIn: false });
            Toast.show({
                text: "Login cancelled",
                position: "bottom",
                buttonText: "Okay"
            });
        }
    };

    render() {
        const loginButton = (
            <Button block success onPress={this._onLoginPress}>
                <Text>Log In</Text>
            </Button>
        );

        return (
            <Container>
                <StatusBar barStyle="light-content" />
                <ImageBackground
                    source={launchscreenBg}
                    style={styles.imageContainer}
                >
                    <View style={styles.logoContainer}>
                        <Image source={launchscreenLogo} style={styles.logo} />
                    </View>
                    <View style={styles.buttonView}>
                        {this.state.loggedIn ? <Spinner /> : loginButton}
                    </View>
                </ImageBackground>
            </Container>
        );
    }
}
