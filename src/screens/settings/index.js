import React, { Component } from "react";
import { AsyncStorage, StyleSheet, View } from "react-native";
import {
    Container,
    Header,
    Tab,
    Tabs,
    TabHeading,
    Icon,
    Text,
    Left,
    Body,
    Button,
    Title,
    List,
    Content,
    ListItem,
    Radio,
    Right
} from "native-base";

import Profile from "./profile";
import About from "./about";
import Options from "./options";

export default class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header hastabs>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack(null)}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Settings</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon
                                name={"menu"}
                                type={"Entypo"}
                                style={{
                                    fontSize: 32,
                                    width: 30
                                }}
                            />
                        </Button>
                    </Right>
                </Header>
                <Tabs>
                    <Tab
                        heading={
                            <TabHeading>
                                <Icon name="user" type="Entypo" />
                                <Text>Profile</Text>
                            </TabHeading>
                        }
                    >
                        <Profile />
                    </Tab>
                    <Tab
                        heading={
                            <TabHeading>
                                <Icon name="settings-cell" type="MaterialIcons" />
                                <Text>Options</Text>
                            </TabHeading>
                        }
                    >
                        <Options />
                    </Tab>
                    <Tab
                        heading={
                            <TabHeading>
                                <Icon name="info-with-circle" type="Entypo" />
                                <Text>About</Text>
                            </TabHeading>
                        }
                    >
                        <About />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
