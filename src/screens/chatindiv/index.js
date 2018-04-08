import React, { Component } from "react";
import { View } from "react-native";
import { NavigationActions } from "react-navigation";
import { GiftedChat } from "react-native-gifted-chat";
import { Container, Header, Left, Button, Body, Icon, Title, Right } from "native-base";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentWillMount() {
        this.props = {
            ...this.props,
            ...this.props.navigation.state.params
        };

        // passed prop test
        console.log(this.props.test);

        this.setState({
            messages: [
                {
                    _id: 2,
                    text: "Hello developer",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "React Native",
                        avatar:
                            "https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/react-native/react-native.png"
                    }
                },
                {
                    _id: 1,
                    text: "test",
                    createdAt: new Date(),
                    user: {
                        _id: 1
                    }
                }
            ]
        });
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
    }

    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back());
    };

    render() {
        return (
            <Container style={{ flex: 1 }}>
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
                    <Right>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon name="menu" />
                        </Button>
                    </Right>
                </Header>

                <GiftedChat
                    style={{ flex: 1 }}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1
                    }}
                />
            </Container>
        );
    }
}
