'use strict';

const React = require('react-native');
//require('./app/config/polyfills.js');
//require('./app/config/process.polyfill.js');

const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  LinkingIOS,
  TouchableOpacity
} = React;

//let AnyDb = require('any-db-client');

//var ReactMotion = require('react-motion/native');
//var {
//  Motion,
//  spring
//} = ReactMotion;

let whuffie = require('./app/config/whuffie.js');
window.whuffie = whuffie;

// var WhuffieIdentity = require('./app/components/identity');
//var ShaderDemo = require('./app/components/glDemo');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      whuffie: whuffie
    };
  }

  componentDidMount() {
    (async () => {
      try {
        await whuffie.connect();
        this.setState({
          connected: true
        });
      } catch (err) {
        console.log('error in connecting', err);
      }
    })();
  }

  clickHandler(e) {
    (async () => {
      try {
        var something = await whuffie.auth.createNewUser('sunnyg' + Math.random() * 1000, 'helperpass', {});
        console.log('something from creating user', something);
      } catch (err) {
        console.log('error creating user');
      }
    })();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          WHUFFIE
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>

        {/* <ShaderDemo width={100} height={100} shader={'color'}/> */}
        {/* <WhuffieIdentity /> */}
        <TouchableOpacity onPress={this.clickHandler.bind(this)}>
          <Text>
            button
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent('whuffie', () => App);
