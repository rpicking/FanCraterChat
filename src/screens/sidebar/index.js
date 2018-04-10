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

import { logout, setMetadata } from "../../actions/auth0Actions";
import { logoutSendBird } from "../../actions/sendbirdActions";

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
        route: "ChatNavigator",
        type: "Entypo",
        icon: "chat",
        bg: "#C5F442"
    },
    {
        name: "User Profile",
        route: "UserProfile",
        params: {
            nickname: "Mike",
            location: "Ypsi, Mi",
            notables:
                "Beyonce, ICP, Elvis, Sammy Davis Jr, Pikachu, Rocky, Chewbacca, R2D2",
            blurb:
                "Hello World how are you today I hope you are good. I am doing good too",
            profileUrl:
                "https://static.boredpanda.com/blog/wp-content/uploads/2015/09/post-the-happiest-dogs-who-show-the-best-smiles-18__700.jpg"
        },
        type: "FontAwesome",
        icon: "user",
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

    _logout = async () => {
        await logoutSendBird();
        await logout(this.props.navigation);
    };

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
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        data.route,
                                        data.params
                                    )
                                }
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
                    <ListItem button noBorder onPress={() => this._logout()}>
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
                    <ListItem
                        button
                        noBorder
                        onPress={() => {
                            const pic =
                                "https://i.pinimg.com/originals/be/dc/bf/bedcbfe81a37428c0ce5532ec1dc1f10.jpg";
                            setMetadata({ picture: pic });
                        }}
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
                            <Text style={styles.text}>Update</Text>
                        </Left>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}
