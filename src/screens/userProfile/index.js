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
    Input
} from "native-base";

import { logout } from "../../actions/auth0Actions";
import { logoutSendBird } from "../../actions/sendbirdActions";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            location: "",
            notables: "",
            blurb: "",
            profileUrl: undefined,
            chat_id: ""
        };
    }

    async componentDidMount() {
        this.props = {
            ...this.props,
            ...this.props.navigation.state.params
        };

        this.setState({
            nickname: this.props.nickname,
            notables: this.props.notables,
            blurb: this.props.blurb,
            profileUrl: this.props.profileUrl,
            chat_id: this.props.chat_id
        });

        this.setState({
            location: await this.convertLatLong(this.props.lat, this.props.long)
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

    _openChat = async () => {
        this.props.navigation.navigate("ChatIndiv", {
            channelUser: this.state.chat_id,
            otherUser: this.state.nickname
        });
    };

    render() {
        return (
            <Container>
                <Content>
                    <View
                        style={{
                            justifyContent: "center",
                            flexDirection: "row",
                            marginTop: 20,
                            marginBottom: 10
                        }}
                    >
                        <Thumbnail
                            style={{ width: 150, height: 150 }}
                            large
                            source={{ uri: this.state.profileUrl }}
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={styles.titleText}>{this.state.nickname}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text note>{this.state.location}</Text>
                    </View>
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
                        <Button block onPress={() => this._openChat()}>
                            <Text>Chat</Text>
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
    }
};
