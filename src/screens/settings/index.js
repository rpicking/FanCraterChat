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
    Right,
    Card,
    CardItem,
    Image
} from "native-base";
import About from "./about";
//import AppLocation from "./screens/AppLocation";

export default class Settings extends Component {
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
                            color: "#777",
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
                    />
                    <Tab
                        heading={
                            <TabHeading>
                                <Icon name="settings-cell" type="MaterialIcons" />
                                <Text>Options</Text>
                            </TabHeading>
                        }
                    />
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
