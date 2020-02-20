import { Component } from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';


class Contact extends Component {

    static navigationOptions = {
        title: "Contact"
    };

    render() {
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                <Card>
                    <Text  style={{ margin: 20 }}>
                Contact Information
                    </Text>
                    <Text>1 Nucamp Way</Text>
                    <Text>Seatle, WA 98001</Text>
                    <Text  style={{ margin: 20 }}>U.S.A.</Text>
                    <Text>Phone: 1-206-555-1234</Text>
                    <Text  style={{ margin: 10 }}>Email: campsites@nucamp.co</Text>
                </Card>
                </Animatable.View>
            </ScrollView>
        );
    };
}


export default Contact;