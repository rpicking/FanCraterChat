import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import store from './store';

import Login from './screens/Login'
import Menu from './screens/Menu'
import Map from './screens/Map'
import Profile from './screens/Profile'
import OpenChannel from './screens/OpenChannel'

const MainNavigator = StackNavigator({
    Login: { screen: Login },
    Menu: { screen: Menu },
    Map: { screen: Map },
    Profile: { screen : Profile },
    OpenChannel: { screen : OpenChannel }
});

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        )
    }
}

export default App; 