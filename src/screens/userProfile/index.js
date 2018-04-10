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
            lat: "",
            long: "",
            notables: "",
            blurb: "",
            profileUrl: ""
        };
    }

    componentDidMount() {
        this.props = {
            ...this.props,
            ...this.props.navigation.state.params
        };

        this.setState({
            nickname: this.props.nickname,
            lat: this.props.lat,
            long: this.props.long,
            notables: this.props.notables,
            blurb: this.props.blurb,
            profileUrl: this.props.profileUrl
        });
        /*
        this.setState({
            nickname: "Mike",
            location: "Ypsi, Mi",
            notables:
                "Beyonce, ICP, Elvis, Sammy Davis Jr, Pikachu, Rocky, Chewbacca, R2D2",
            blurb:
                "Hello World how are you today I hope you are good. I am doing good too",
            profileUrl:
                "https://static.boredpanda.com/blog/wp-content/uploads/2015/09/post-the-happiest-dogs-who-show-the-best-smiles-18__700.jpg"
        });*/
    }

    _logout = async () => {
        await logoutSendBird();
        await logout(this.props.navigation);
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
                        <Button block onPress={() => this._logout()}>
                            <Text>Log Out</Text>
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
