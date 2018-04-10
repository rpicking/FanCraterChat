import React from "react";
import { AsyncStorage } from "react-native";
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Body,
    Text,
    Form,
    Item,
    Input,
    Picker
} from "native-base";

export default class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zipSelected: false,
            selected: undefined
        };
    }

    onValueChange(value) {
        this.setState({ selected: value });
        if (value === "key0") {
            this.setState({ zipSelected: false });
        } else this.setState({ zipSelected: true });
    }

    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: "#e5e5e5" }}>
                    <Card>
                        <Text style={{ margin: 15 }}>
                            How would you like to find people?
                        </Text>
                        <Form style={{ marginLeft: 10, marginRight: 15 }}>
                            <Picker
                                iosHeader="Select one"
                                mode="dropdown"
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Item label="Current Location" value="key0" />
                                <Item label="Zip Code" value="key1" />
                            </Picker>
                            {this.state.zipSelected ? (
                                <Input
                                    value={this.state.text}
                                    maxLength={5}
                                    keyboardType="numeric"
                                    onEndEditing={async text => {
                                        await AsyncStorage.setItem("zipCodeMode", text);
                                    }}
                                />
                            ) : (
                                undefined
                            )}
                        </Form>
                    </Card>
                </Content>
            </Container>
        );
    }
}
