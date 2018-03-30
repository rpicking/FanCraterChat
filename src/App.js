import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import SideBar from "./screens/sidebar";
import Home from "./screens/home";
import FanMap from "./screens/fanmap";

const Drawer = DrawerNavigator(
    {
        Home: { screen: Home },
        FanMap: { screen: FanMap }
    },
    {
        initialRouteName: "Home",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }
);
const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer }
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none"
    }
);

export default () => (
    <Root>
        <AppNavigator />
    </Root>
);
