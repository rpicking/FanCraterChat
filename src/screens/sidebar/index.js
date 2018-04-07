import React, { Component } from "react";
import { Image } from "react-native";
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge
} from "native-base";
import styles from "./style";

import { logout } from "../../actions/auth0Actions";

const drawerCover = require("../../../assets/drawer-cover.png");
const drawerImage = require("../../../assets/logo.png");
const datas = [
    {
        name: "Map",
        route: "FanMap",
        icon: "map",
        bg: "#C5F442"
    },
    {
        name: "Chat",
        route: "ChatOverview",
        type: "Entypo",
        icon: "chat",
        bg: "#C5F442"
    }
];

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4
        };
    }

    render() {
        return (
            <Container>
                <Content
                    bounces={false}
                    style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
                >
                    <Image source={drawerCover} style={styles.drawerCover} />
                    <Image square style={styles.drawerImage} source={drawerImage} />

                    <List
                        dataArray={datas}
                        renderRow={data => (
                            <ListItem
                                button
                                noBorder
                                onPress={() => this.props.navigation.navigate(data.route)}
                            >
                                <Left>
                                    <Icon
                                        active
                                        name={data.icon}
                                        type={data.type}
                                        style={{
                                            color: "#777",
                                            fontSize: 26,
                                            width: 30
                                        }}
                                    />
                                    <Text style={styles.text}>{data.name}</Text>
                                </Left>
                                {data.types && (
                                    <Right style={{ flex: 1 }}>
                                        <Badge
                                            style={{
                                                borderRadius: 3,
                                                height: 25,
                                                width: 72,
                                                backgroundColor: data.bg
                                            }}
                                        >
                                            <Text style={styles.badgeText}>{`${
                                                data.types
                                            } Types`}</Text>
                                        </Badge>
                                    </Right>
                                )}
                            </ListItem>
                        )}
                    />
                    <ListItem
                        button
                        noBorder
                        onPress={() => logout(this.props.navigation)}
                    >
                        <Left>
                            <Icon
                                active
                                name="logout"
                                type="MaterialCommunityIcons"
                                style={{
                                    color: "#777",
                                    fontSize: 26,
                                    width: 30
                                }}
                            />
                            <Text style={styles.text}>Logout</Text>
                        </Left>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}