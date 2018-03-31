import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { sendbirdLogin } from '../actions';
import { FormLabel, FormInput, FormValidationMessage, Button } from '../components';
import LinearGradient from 'react-native-linear-gradient';

class Login extends Component {
    static navigationOptions = {
        title: 'LOGIN'
    }

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: ''
        }
    }

    componentWillReceiveProps(props) {
        const { user, error } = props;
        if (user) {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    this.props.navigation.navigate({ routeName: 'FanMap' })
                ]
            })
            this.setState({ userId: '', password: '' }, () => {
                this.props.navigation.dispatch(resetAction);
            })
        }
    }

    _userIdChanged = (userId) => {
        this.setState({ userId });
    }

    _passwordChanged = (password) => {
        this.setState({ password });
    }

    _onButtonPress = () => {
        const { userId, password } = this.state;
        this.props.sendbirdLogin({ userId, password });
    }

    render() {
        return (
            <View style={{backgroundColor: '#fff', flex: 1}}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../images/logo.png')} />

                </View>
                <View style={styles.containerStyle}>
                    <FormLabel>User ID</FormLabel>
                    <FormInput
                        value={this.state.userId}
                        onChangeText={this._userIdChanged}
                    />
                </View>
                <View style={styles.containerStyle}>
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        value={this.state.password}
                        onChangeText={this._passwordChanged}
                    />
                </View>
                <View style={styles.containerStyle}>
                    <Button
                        buttonStyle={{backgroundColor: '#01bacc'}}
                        title='Connect' 
                        onPress={this._onButtonPress}
                    />
                </View>
                <View style={styles.containerStyle}>
                    <FormValidationMessage>{this.props.error}</FormValidationMessage>
                </View>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        marginTop: 10
    }, 
    logoContainer: {
        marginTop: 50,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    logo: {
        width: 300,
        height: 70
    }
}

function mapStateToProps({ login }) {
    const { error, user } = login;
    return { error, user };
};

export default connect(mapStateToProps, { sendbirdLogin })(Login);
