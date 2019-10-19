/* Core */
import React, {Component} from 'react';

/* Presentational */
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('window');

export default class User extends Component {
  state = {
    offset: new Animated.ValueXY({x: 0, y: 50}),
    opacity: new Animated.Value(0),
  };

  constructor() {
    super();
    this._panResponder = PanResponder.create({
      onPanResponderTerminationRequest: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.offset.x,
        },
      ]),
      onPanResponderRelease: () => {
        if (this.state.offset.x._value < -200) {
          Alert.alert('Deleted!');
        }

        Animated.spring(this.state.offset.x, {
          toValue: 0,
          bounciness: 10,
        }).start();
      },
      onPanResponderTerminate: () => {
        Animated.spring(this.state.offset.x, {
          toValue: 0,
          bounciness: 10,
        }).start();
      },
    });
  }

  componentDidMount() {
    Animated.parallel([
      Animated.spring(this.state.offset.y, {
        toValue: 0,
        speed: 5,
        bounciness: 20,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
      }),
    ]).start();
  }

  render() {
    const {user} = this.props;

    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={[
          {
            transform: [
              ...this.state.offset.getTranslateTransform(),
              {
                rotateZ: this.state.offset.x.interpolate({
                  inputRange: [width * -1, width],
                  outputRange: ['-10deg', '10deg'],
                }),
              },
            ],
          },
          {opacity: this.state.opacity},
        ]}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={styles.userContainer}>
            <Image style={styles.thumbnail} source={{uri: user.thumbnail}} />
            <View style={styles.containerAvatar}>
              <Image style={styles.avatar} source={{uri: user.avatar}} />
              <View style={styles.containerTextAvatar}>
                <Text style={styles.textNameAvatar}>{user.name}</Text>
                <Text style={styles.textOnlineAvatar}>2 hours ago</Text>
              </View>
            </View>
            <View style={[styles.infoContainer]}>
              <View style={styles.bioContainer}>
                <Text style={styles.name}>{user.name.toUpperCase()}</Text>
                <Text style={styles.description}>{user.food}</Text>
              </View>
              <View style={styles.likesContainer}>
                <Icon name="heart" size={12} color="#9999" />
                <Text style={styles.likes}>{user.likes}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  userContainer: {
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'column',
    marginHorizontal: 15,
  },

  containerAvatar: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    margin: 10,
    borderRadius: 40,
    alignContent: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 5,
    width: '50%',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    alignSelf: 'center',
  },

  containerTextAvatar: {
    flexDirection: 'column',
    marginLeft: 10,
  },

  textNameAvatar: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textOnlineAvatar: {
    color: '#ffff',
    fontSize: 12,
  },

  thumbnail: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },

  infoContainer: {
    backgroundColor: '#ffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 1,
    borderRadius: 10,
    height: 60,
  },

  bioContainer: {
    flex: 1,
    color: '#9999',
  },

  name: {
    color: '#9999',
    fontWeight: '900',
    fontSize: 10,
  },

  description: {
    color: '#999',
    fontSize: 13,
    marginTop: 2,
  },

  likesContainer: {
    flexDirection: 'row',
    // backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
  },

  likes: {
    color: '#999',
    fontSize: 12,
    marginLeft: 5,
  },
});
