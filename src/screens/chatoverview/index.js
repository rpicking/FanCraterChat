import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { TouchableOpacity } from "react-native";
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Thumbnail,
    Text,
    Button,
    Icon,
    Title
} from "native-base";

import styles from "./styles";

export default class ChatOverview extends Component {
    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back());
    };

    goToMessage = sendbird_id => {
        console.log(sendbird_id);
    };

    goToProfile = api_id => {
        console.log(api_id);
    };

    render() {
        var datas = [
            {
                name: "Kumar Pratik",
                lastMsg:
                    "Doing what you like will always keep you happy Doing what you like will",
                lastTime: "3:43 pm",
                image:
                    "https://lh3.googleusercontent.com/VT-PqxMMsA2wPy7kzmuKGDIzaA3AGuXKExqnfOfwTEy5AvLIMTranbfNGheRr457RD4=w300",
                sendbird_id: "sendbird here1",
                api_id: "api id 1"
            },
            {
                name: "Kumar Pratik",
                lastMsg:
                    "Doing what you like will always keep you happy Doing what you like will",
                lastTime: "3:43 pm",
                image:
                    "https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/react-native/react-native.png",
                sendbird_id: "sendbird here1",
                api_id: "api id 1"
            },
            {
                name: "Kumar Pratik",
                lastMsg:
                    "Doing what you like will always keep you happy Doing what you like will",
                lastTime: "3:43 pm",
                image:
                    "https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/react-native/react-native.png",
                sendbird_id: "sendbird here1",
                api_id: "api id 1"
            },
            {
                name: "Kumar Pratik",
                lastMsg:
                    "Doing what you like will always keep you happy Doing what you like will",
                lastTime: "3:43 pm",
                image:
                    "https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/react-native/react-native.png",
                sendbird_id: "sendbird here1",
                api_id: "api id 1"
            },
            {
                name: "Kumar Pratik",
                lastMsg:
                    "Doing what you like will always keep you happy Doing what you like will",
                lastTime: "3:43 pm",
                image:
                    "https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/react-native/react-native.png",
                sendbird_id: "sendbird here1",
                api_id: "api id 1"
            },
            {
                name: "Kumar Pratik",
                lastMsg:
                    "Doing what you like will always keep you happy Doing what you like will",
                lastTime: "3:43 pm",
                image:
                    "https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/react-native/react-native.png",
                sendbird_id: "sendbird here1",
                api_id: "api id 1"
            },
            {
                name: "Kumar Pratik",
                lastMsg:
                    "Doing what you like will always keep you happy Doing what you like will",
                lastTime: "3:43 pm",
                image:
                    "https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/react-native/react-native.png",
                sendbird_id: "sendbird here1",
                api_id: "api id 1"
            }
        ];
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                this.goBack();
                            }}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Messages</Title>
                    </Body>
                </Header>
                <Content>
                    <List
                        dataArray={datas}
                        renderRow={data => (
                            <ListItem
                                avatar
                                button
                                onPress={() => this.goToMessage(data.sendbird_id)}
                                style={{ height: 75 }}
                            >
                                <Left>
                                    <TouchableOpacity
                                        onPress={() => this.goToProfile(data.api_id)}
                                    >
                                        <Thumbnail
                                            style={{ height: 50 }}
                                            source={{
                                                uri: data.image
                                            }}
                                        />
                                    </TouchableOpacity>
                                </Left>
                                <Body style={{ marginRight: 10 }}>
                                    <Text style={{ color: "#212121", fontSize: 15 }}>
                                        {data.name}
                                    </Text>
                                    <Text
                                        style={{ color: "#424242", fontSize: 14 }}
                                        numberOfLines={1}
                                    >
                                        {data.lastMsg}
                                    </Text>
                                    <Text note>{data.lastTime}</Text>
                                </Body>
                            </ListItem>
                        )}
                    />
                </Content>
            </Container>
        );
    }
}
