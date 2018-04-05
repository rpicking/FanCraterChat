import React, { Component } from 'react';
import { Container, Header, Content, ListItem, Text, Radio, Right } from 'native-base';
export default class AppLocation extends Component {

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <ListItem>
            <Text>Current Location</Text>
            <Right>
              <Radio selected={true} />
            </Right>
          </ListItem>
          <ListItem>
            <Text>Zip Code</Text>
            <Right>
              <Radio selected={false} />
            </Right>
          </ListItem>
          <ListItem>
            <Text>Disable Location</Text>
            <Right>
              <Radio selected={false} />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
