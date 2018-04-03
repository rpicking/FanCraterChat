import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import SideBar from "./screens/sidebar";
import Home from "./screens/home";
import FanMap from "./screens/fanmap";

const Drawer = DrawerNavigator(
    {
        FanMap: { screen: FanMap }
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
        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
                drawerLockMode: "locked-closed"
            })
        },
        Drawer: { screen: Drawer },
        FanMap: { screen: FanMap }
    },
    {
        initialRouteName: "Home",
        headerMode: "none"
    }
);

console.disableYellowBox = true;
export default () => (
    <Root>
        <AppNavigator />
    </Root>
);
