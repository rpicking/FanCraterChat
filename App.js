<<<<<<< HEAD
import React, { Component } from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import { Provider } from "react-redux";
import store from "./store";

import Login from "./screens/Login";
import Menu from "./screens/Menu";
import FanMap from "./screens/FanMap";
import Profile from "./screens/Profile";
import OpenChannel from "./screens/OpenChannel";

import { Root } from "native-base";
import SideBar from "./screens/sidebar";

const Drawer = DrawerNavigator(
    {
        Login: { screen: Login },
        FanMap: { screen: FanMap },
        Profile: { screen: Profile },
        OpenChannel: { screen: OpenChannel },
        Menu: { screen: Menu }
    },
    {
        initialRouteName: "FanMap",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }
);

const MainNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
        OpenChannel: { screen: OpenChannel }
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none"
    }
);

class App extends Component {
    state = {
        fontLoaded: false
    };

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        if (!this.state.fontLoaded) {
            return <Expo.AppLoading />;
        }
        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        );
    }
}

export default App;
=======
import React from "react";
import Setup from "./src/boot/setup";

export default class App extends React.Component {
    render() {
        return <Setup />;
    }
}
>>>>>>> Refactoring
