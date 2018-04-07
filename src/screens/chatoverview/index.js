import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { TouchableOpacity, AsyncStorage } from "react-native";
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

import {
    getChannelList,
    getChannelByID,
    sendMessage,
    isCurrentUser
} from "../../actions/sendbirdActions";

import styles from "./styles";

export default class ChatOverview extends Component {
    constructor(props) {
        super(props);
        this.state = { channels: [] };
    }

    loadChannels = async () => {
        let list = await getChannelList();

        list.forEach(function(channel) {
            for (let i = 0; i < channel.members.length; ++i) {
                if (!isCurrentUser(channel.members[i].userId)) {
                    channel.otherNickname = channel.members[i].nickname;
                    channel.otherProfilUrl = channel.members[i].profileUrl;
                    break;
                }
            }
            channel.members.forEach(member => {});
        });
        console.log(list);
        this.setState({ channels: list });
    };

    componentDidMount = async () => {
        let channel = await getChannelByID("auth0|5abdad7f3d8f01209c971091");
        //await sendMessage("hi there first msg");

        await this.loadChannels();
    };

    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back());
    };

    goToMessage = sendbird_id => {
        console.log(sendbird_id);
    };

    goToProfile = api_id => {
        console.log(api_id);
    };

    _convertTime = timestamp => {
        const time = new Date(timestamp);

        const today = new Date();
        var lastWeek = Date.parse(
            new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
        );
        // will display time as date ie 3/11

        // will display time as day of week

        // Will display time in 10:30 PM format
        return time.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
        });
    };

    _convertMessage = lastMessage => {
        if (isCurrentUser(lastMessage.sender.userId)) {
            return "You: " + lastMessage.message;
        }
        return lastMessage.message;
    };

    render() {
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
                        dataArray={this.state.channels}
                        renderRow={data => (
                            <ListItem
                                avatar
                                button
                                onPress={() => this.goToMessage(data.url)}
                                style={{ height: 75 }}
                            >
                                <Left>
                                    <TouchableOpacity
                                        onPress={() => this.goToProfile("FILL ME IN")}
                                    >
                                        <Thumbnail
                                            style={{ height: 50, width: 50 }}
                                            source={{
                                                uri: data.otherProfilUrl
                                            }}
                                        />
                                    </TouchableOpacity>
                                </Left>
                                <Body style={{ marginRight: 10 }}>
                                    <Text style={{ color: "#212121", fontSize: 16 }}>
                                        {data.otherNickname}
                                    </Text>
                                    <Text
                                        style={{ color: "#424242", fontSize: 14 }}
                                        numberOfLines={1}
                                    >
                                        {this._convertMessage(data.lastMessage)}
                                    </Text>
                                    <Text note>
                                        {this._convertTime(data.lastMessage.createdAt)}
                                    </Text>
                                </Body>
                            </ListItem>
                        )}
                    />
                </Content>
            </Container>
        );
    }
}
