import React, { Component } from "react";
import { Image } from "react-native";
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Text,
    Body,
    View
} from "native-base";

const superFan = require("../../../assets/superfan.png");

export default class About extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text>FanCrater Chat</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Image
                                source={{
                                    uri:
                                        "https://pbs.twimg.com/media/DEq4CVhWsAEnhnc.png:large"
                                }}
                                style={{ height: 200, width: null, flex: 1 }}
                            />
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    You have your notables now, so lets find others that
                                    enjoy your notables as much as you. Check out the map
                                    to find other SuperFans around your area so you can
                                    chat with our new chat feature!!!
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Text>Get Chatting!!!!!!!</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
