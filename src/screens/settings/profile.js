import React, { Component } from "react";
import { View, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import {
    Container,
    Content,
    Header,
    Button,
    Text,
    Form,
    Label,
    Item,
    Thumbnail,
    Input,
    Icon,
    Right,
    Left,
    Body,
    Title,
    Card,
    CardItem
} from "native-base";

import { getUser } from "../../actions/apiActions";
import { logout } from "../../actions/auth0Actions";
import { logoutSendBird } from "../../actions/sendbirdActions";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        console.log("wha");
        this.state = {
            nickname: "",
            location: "",
            notables: "",
            blurb: "",
            profileUrl: undefined
        };
    }

    async componentDidMount() {
        const userInfo = await getUser();

        this.setState({
            nickname: userInfo.nickname,
            notables: userInfo.notable,
            blurb: userInfo.blurb,
            profileUrl: userInfo.image
        });

        this.setState({
            location: await this.convertLatLong(userInfo.latitude, userInfo.longitude)
        });
    }

    convertLatLong = (lat, long) => {
        const api = "***REMOVED***";

        return fetch(
            "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                lat +
                "," +
                long +
                "&key=" +
                api
        )
            .then(response => response.json())
            .then(responseJson => {
                const results = responseJson.results;
                for (let i = 0; i < results.length; ++i) {
                    let types = results[i].types;
                    if (types.includes("locality")) {
                        return results[i].formatted_address;
                    }
                }
            });
    };

    _logout = async () => {
        await logoutSendBird();
        await logout(this.props.navigation);
    };

    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: "#e5e5e5" }}>
                    <Card>
                        <CardItem>
                            <Body style={styles.centerItems}>
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 0
                                    }}
                                >
                                    <Thumbnail
                                        style={{
                                            width: 150,
                                            height: 150
                                        }}
                                        large
                                        source={{ uri: this.state.profileUrl }}
                                    />
                                    <Text style={styles.titleText}>
                                        {this.state.nickname}
                                    </Text>
                                    <Text note>{this.state.location}</Text>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>

                    <View style={styles.containerStyle}>
                        <Form>
                            <Item fixedLabel>
                                <Label>
                                    Notables:{" "}
                                    <Text numberOfLines={3}>{this.state.notables}</Text>
                                </Label>
                            </Item>
                        </Form>
                    </View>
                    <View style={styles.containerStyle}>
                        <Form>
                            <Item fixedLabel>
                                <Label>
                                    Blurb:{" "}
                                    <Text numberOfLines={3}>{this.state.blurb}</Text>
                                </Label>
                            </Item>
                        </Form>
                    </View>
                    <View style={styles.containerStyle}>
                        <Button
                            block
                            style={{ marginLeft: 10, marginRight: 10 }}
                            onPress={() => this._logout()}
                        >
                            <Text>Logout</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = {
    titleText: {
        fontSize: 20,
        color: "black"
    },

    containerStyle: {
        marginTop: 40
    },

    centerItems: {
        justifyContent: "center",
        flexDirection: "row"
    }
};
