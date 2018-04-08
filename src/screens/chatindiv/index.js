import React, { Component } from "react";
import { View, DeviceEventEmitter } from "react-native";
import { NavigationActions } from "react-navigation";
import { GiftedChat } from "react-native-gifted-chat";
import { Container, Header, Left, Button, Body, Icon, Title, Right } from "native-base";

import {
    getChannelByURL,
    getPreviousMessages,
    isCurrentUser,
    getCurrentUser,
    getchannelHandler,
    getOtherUserNickname,
    sendMessage,
    isCurrentChannel
} from "../../actions/sendbirdActions";

export default class ChatIndiv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otherUser: "",
            messages: []
        };
    }

    async componentDidMount() {
        this.props = {
            ...this.props,
            ...this.props.navigation.state.params
        };

        // passed prop test
        console.log(this.props.channelId);

        await getChannelByURL(this.props.channelId);
        this.setState({ otherUser: getOtherUserNickname() });

        let sendBirdMessages = await getPreviousMessages();
        let messages = [];
        sendBirdMessages.forEach((msg, index) => {
            messages.push(this._convertMessage(msg, index));
        });

        this.setState({ messages: messages });

        let ChannelHandler = getchannelHandler();

        ChannelHandler.onMessageReceived = (channel, message) => {
            console.log(channel, message);
            if (isCurrentChannel(channel)) {
                let temp = this._convertMessage(message, this.state.messages.length);
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, [temp])
                }));
            }
        };
    }

    _convertMessage = (msg, index) => {
        let temp = {};

        temp._id = index;
        temp.user = {
            _id: msg.sender.userId,
            name: msg.sender.nickname,
            avatar: msg.sender.profileUrl
        };

        temp.text = msg.message;
        temp.createdAt = msg.createdAt;
        return temp;
    };

    onSend = messages => {
        console.log(messages);
        messages.forEach(message => {
            sendMessage(message.text);
        });
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
    };

    render() {
        const { goBack } = this.props.navigation;
        return (
            <Container style={{ flex: 1, backgroundColor: "white" }}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                DeviceEventEmitter.emit("refreshChannels", {});
                                this.props.navigation.goBack(null);
                            }}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.state.otherUser}</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => {
                                this.props.navigation.navigate("DrawerOpen");
                            }}
                        >
                            <Icon name="menu" />
                        </Button>
                    </Right>
                </Header>

                <GiftedChat
                    style={{ flex: 1, backgroundColor: "white" }}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: getCurrentUser()
                    }}
                    keyboardShouldPersistTaps={"handled"}
                />
            </Container>
        );
    }
}
