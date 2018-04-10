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
    Picker,
    Icon
} from "native-base";

export default class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zipSelected: false,
            selected: undefined,
            success: false,
            error: false,
            zip: "",
            icon: ""
        };
    }

    async componentDidMount() {
        const mode = await AsyncStorage.getItem("zipCodeMode");
        if (mode)
            this.setState({
                zip: mode,
                zipSelected: true,
                success: true,
                selected: "key1",
                icon: "checkmark-circle"
            });
    }

    async onValueChange(value) {
        this.setState({ selected: value });
        if (value === "key0") {
            this.setState({ zipSelected: false });
            //this.setState({ success: false });
            await AsyncStorage.setItem("zipCodeMode", "");
        } else {
            this.setState({ zipSelected: true });
            console.log(this.state.zip);
            //this.setState({ success: false });
        }
    }

    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: "#e5e5e5" }}>
                    <Card>
                        <Text style={{ margin: 15 }}>
                            How would you like to find people?
                        </Text>
                        <Form
                            style={{ marginLeft: 10, marginRight: 15, paddingBottom: 10 }}
                        >
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
                                <Item
                                    success={this.state.success}
                                    error={this.state.error}
                                >
                                    <Input
                                        value={this.state.zip}
                                        maxLength={5}
                                        style={{
                                            borderRadius: 4,
                                            borderWidth: 0.5,
                                            borderColor: "#d6d7da",
                                            margin: 10
                                        }}
                                        keyboardType="numeric"
                                        onChangeText={async text => {
                                            if (text.length === 5) {
                                                this.setState({
                                                    success: true,
                                                    error: false,
                                                    icon: "checkmark-circle"
                                                });
                                                console.log(this.state.zip);
                                                await AsyncStorage.setItem(
                                                    "zipCodeMode",
                                                    text
                                                );
                                            } else {
                                                this.setState({
                                                    success: false,
                                                    error: true
                                                });
                                                this.setState({ icon: "close-circle" });
                                            }
                                            this.setState({ zip: text });
                                        }}
                                    />
                                    <Icon name={this.state.icon} />
                                </Item>
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
