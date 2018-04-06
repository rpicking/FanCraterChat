import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import SideBar from "./screens/sidebar";
import Splash from "./screens/splash";
import FanMap from "./screens/fanmap";
import ChatOverview from "./screens/chatoverview";

const Drawer = DrawerNavigator(
    {
        FanMap: { screen: FanMap },
        ChatOverview: { screen: ChatOverview }
    },
    {
        initialRouteName: "FanMap",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }
);
const AppNavigator = StackNavigator(
    {
        Splash: {
            screen: Splash,
            navigationOptions: ({ navigation }) => ({
                drawerLockMode: "locked-closed"
            })
        },
        Drawer: { screen: Drawer },
        FanMap: { screen: FanMap }
    },
    {
        initialRouteName: "Splash",
        headerMode: "none"
    }
);

console.disableYellowBox = true;
export default () => (
    <Root>
        <AppNavigator />
    </Root>
);
