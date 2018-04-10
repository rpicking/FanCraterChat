import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import SideBar from "./screens/sidebar";
import Splash from "./screens/splash";
import FanMap from "./screens/fanmap";
import ChatOverview from "./screens/chatoverview";
import ChatIndiv from "./screens/chatindiv";
import UserProfile from "./screens/userProfile";
import Settings from "./screens/settings";

export const ChatNavigator = StackNavigator(
    {
        ChatOverview: { screen: ChatOverview },

        ChatIndiv: { screen: ChatIndiv }
    },
    {
        initialRouteName: "",
        headerMode: "none"
    }
);

const Drawer = DrawerNavigator(
    {
        FanMap: { screen: FanMap },
        ChatNavigator: { screen: ChatNavigator },
        Settings: { screen: Settings },
        UserProfile: { screen: UserProfile }
    },
    {
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
        Drawer: { screen: Drawer }
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
