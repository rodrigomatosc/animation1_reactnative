import React, {Component} from 'react';

import {
  View,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';

import User from './components/User';

const {width} = Dimensions.get('window');

export default class App extends Component {
  state = {
    scrollOffSet: new Animated.Value(0),
    listProgress: new Animated.Value(0),
    userInfoProgress: new Animated.Value(0),
    userSelected: null,
    userInfoVisible: false,
    users: [
      {
        id: 1,
        name: 'Rodrigo Matos',
        food: 'Vegetables',
        description: 'Head de programação!',
        avatar: 'https://avatars0.githubusercontent.com/u/22649983?v=4',
        thumbnail:
          'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        likes: 200,
        color: '#57BCBC',
      },
      {
        id: 2,
        name: 'Rodrigo Matos',
        food: 'Pizza',
        description: 'Head de empreendedorismo!',
        avatar: 'https://avatars0.githubusercontent.com/u/22649983?v=4',
        thumbnail:
          'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        likes: 350,
        color: '#E75A63',
      },
      {
        id: 3,
        name: 'Rodrigo Matos',
        food: 'Italian Hamburger',
        description: 'Head de mindset!',
        avatar: 'https://avatars0.githubusercontent.com/u/22649983?v=4',
        thumbnail:
          'https://images.unsplash.com/photo-1552718752-c682d315b136?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1090&q=80',
        likes: 250,
        color: '#2E93E5',
      },
      {
        id: 4,
        name: 'Rodrigo Matos',
        food: 'American Hamburger',
        description: 'Head de empreendedorismo!',
        avatar: 'https://avatars0.githubusercontent.com/u/22649983?v=4',
        thumbnail:
          'https://images.unsplash.com/photo-1477617722074-45613a51bf6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        likes: 350,
        color: '#E75A63',
      },
    ],
  };

  selectUser = user => {
    this.setState({userSelected: user});

    Animated.sequence([
      Animated.timing(this.state.listProgress, {
        toValue: 100,
        duration: 300,
      }),
      Animated.timing(this.state.scrollOffSet, {
        toValue: 0,
        duration: 100,
      }),
      Animated.timing(this.state.userInfoProgress, {
        toValue: 100,
        duration: 500,
      }),
    ]).start(() => {
      this.setState({userInfoVisible: true});
    });
  };

  renderDetail = () => (
    <View>
      <User user={this.state.userSelected} onPress={() => {}} />
    </View>
  );

  renderList = () => (
    <Animated.View
      style={[
        styles.containerList,
        {
          transform: [
            {
              translateX: this.state.listProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [0, width],
              }),
            },
          ],
        },
      ]}>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {y: this.state.scrollOffSet},
            },
          },
        ])}>
        {this.state.users.map(user => (
          <User
            key={user.id}
            user={user}
            onPress={() => this.selectUser(user)}
          />
        ))}
      </ScrollView>
    </Animated.View>
  );

  renderHeader() {
    const {userSelected} = this.state;

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.state.scrollOffSet.interpolate({
              inputRange: [0, 150],
              outputRange: [200, 70],
              extrapolate: 'clamp',
            }),
          },
        ]}>
        <Animated.Image
          style={[
            styles.headerImage,
            {
              opacity: this.state.userInfoProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 1],
              }),
            },
          ]}
          source={
            userSelected
              ? {uri: userSelected.thumbnail}
              : {
                  uri: null,
                }
          }
        />
        <Animated.Image
          style={[
            styles.headerImage,
            {
              opacity: this.state.userInfoProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
              }),
            },
          ]}
          source={{
            uri:
              'https://images.unsplash.com/photo-1557683304-673a23048d34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          }}
        />

        <Animated.Text
          style={[
            styles.headerText,
            {
              fontSize: this.state.scrollOffSet.interpolate({
                inputRange: [120, 140],
                outputRange: [24, 16],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateX: this.state.userInfoProgress.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, width],
                  }),
                },
              ],
            },
          ]}>
          Food Native
        </Animated.Text>

        <Animated.Text
          style={[
            styles.headerText,
            {
              transform: [
                {
                  translateX: this.state.userInfoProgress.interpolate({
                    inputRange: [0, 100],
                    outputRange: [width * -1, 0],
                  }),
                },
              ],
            },
          ]}>
          {userSelected ? userSelected.food : null}
        </Animated.Text>
      </Animated.View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {this.renderHeader()}
        {this.state.userInfoVisible ? this.renderDetail() : this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerList: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingHorizontal: 15,
    backgroundColor: '#2E93E5',
  },

  headerImage: {
    ...StyleSheet.absoluteFillObject,
  },

  headerText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFF',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    bottom: 20,
  },
});
