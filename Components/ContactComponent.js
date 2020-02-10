import { Component } from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-native';
import { Card } from 'react-native-elements';


class Contact extends Component {

    static navigationOptions = {
        title: "Contact"
    };

    render() {
        return (
            <ScrollView>
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
            </ScrollView>
        );
    };
}


export default Contact;