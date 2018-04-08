import React, { Component } from "react";
import { TouchableOpacity, AsyncStorage, DeviceEventEmitter } from "react-native";
import { NavigationActions } from "react-navigation";
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

        DeviceEventEmitter.addListener("refreshChannels", async e => {
            await this.loadChannels();
        });
    }

    async componentDidMount() {
        await this.loadChannels();
    }

    loadChannels = async () => {
        this.setState({ channels: [] });
        let list = await getChannelList();

        list.forEach(function(channel) {
            for (let i = 0; i < channel.members.length; ++i) {
                if (!isCurrentUser(channel.members[i].userId)) {
                    channel.otherUserId = channel.members[i].userId;
                    channel.otherNickname = channel.members[i].nickname;
                    channel.otherProfilUrl = channel.members[i].profileUrl;
                    break;
                }
            }
            channel.members.forEach(member => {});
        });
        this.setState({ channels: list });
    };

    goToMessage = channel_id => {
        this.props.navigation.navigate("ChatIndiv", {
            channelId: channel_id
        });
    };

    goToProfile = api_id => {
        console.log(api_id);
    };

    _convertTime = lastMessage => {
        if (!lastMessage) return "";

        let timestamp = lastMessage.createdAt;
        const time = new Date(timestamp);

        const today = new Date();
        var lastWeek = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 7
        ).getTime();

        // older than 1 week
        if (lastWeek > timestamp) {
            return time.getMonth() + 1 + "/" + time.getDate();
        } else if (time.toDateString() !== today.toDateString()) {
            // younger than a week not today
            return time.toLocaleString("en-us", { weekday: "short" });
        }
        let minutes = today - time;
        if (minutes < 60 * 60 * 1000) {
            minutes = Math.floor(minutes / 60 / 1000);
            if (minutes === 0) return "Now";
            if (minutes === 1) return minutes + " min";
            return minutes + " mins";
        }
        // Will display time in 10:30 PM format
        return time.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
        });
    };

    _convertMessage = lastMessage => {
        if (!lastMessage) return "";
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
                                this.props.navigation.pop();

                                this.props.navigation.goBack(null);
                            }}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Messages</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon name="menu" />
                        </Button>
                    </Right>
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
                                        onPress={() => this.goToProfile(data.otherUserId)}
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
                                        {this._convertTime(data.lastMessage)}
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
