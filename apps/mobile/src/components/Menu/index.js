import React from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  DeviceEventEmitter,
} from 'react-native';
import FastStorage from 'react-native-fast-storage';
import Icon from 'react-native-vector-icons/Feather';
import {
  ACCENT,
  COLOR_SCHEME,
  COLOR_SCHEME_DARK,
  COLOR_SCHEME_LIGHT,
  opacity,
  pv,
  setColorScheme,
  SIZE,
  WEIGHT,
} from '../../common/common';
import {ACTIONS, useTracked} from '../../provider';
import NavigationService from '../../services/NavigationService';
import {AnimatedSafeAreaView} from '../../views/Home';

export const Menu = ({close = () => {}, hide, update = () => {}}) => {
  const [state, dispatch] = useTracked();
  const {colors} = state;

  // todo

  let overlayRef;

  function changeColorScheme(colors = COLOR_SCHEME, accent = ACCENT) {
    let newColors = setColorScheme(colors, accent);
    StatusBar.setBarStyle(newColors.night ? 'light-content' : 'dark-content');

    dispatch({type: ACTIONS.THEME, colors: newColors});
  }

  const listItems = [
    {
      name: 'Home',
      icon: 'home',
      func: () => NavigationService.navigate('Home'),
      close: true,
    },

    {
      name: 'Notebooks',
      icon: 'book',
      func: () =>
        NavigationService.navigate('Folders', {
          title: 'Notebooks',
          canGoBack: false,
        }),
      close: true,
    },
    {
      name: 'Lists',
      icon: 'list',
      func: () => NavigationService.navigate('Lists'),
      close: true,
    },
    {
      name: 'Favorites',
      icon: 'star',
      func: () => NavigationService.navigate('Favorites'),
      close: true,
    },

    {
      name: 'Dark Mode',
      icon: 'moon',
      func: () => {
        if (!colors.night) {
          FastStorage.setItem('theme', JSON.stringify({night: true}));
          changeColorScheme(COLOR_SCHEME_DARK);
        } else {
          FastStorage.setItem('theme', JSON.stringify({night: false}));

          changeColorScheme(COLOR_SCHEME_LIGHT);
        }
      },
      switch: true,
      on: colors.night ? true : false,
      close: false,
    },
    {
      name: 'Trash',
      icon: 'trash',
      func: () => NavigationService.navigate('Trash'),
      close: true,
    },
    {
      name: 'Settings',
      icon: 'settings',
      func: () => NavigationService.navigate('Settings'),
      close: true,
    },
  ];

  return (
    <AnimatedSafeAreaView
      transition="backgroundColor"
      duration={400}
      style={{
        height: '100%',
        opacity: hide ? 0 : 1,
        backgroundColor: colors.shade,
      }}>
      <View
        style={{
          height: 2,
          width: '100%',
          marginBottom: 5,
          marginTop: Platform.OS == 'ios' ? 0 : StatusBar.currentHeight - 10,
        }}
      />
      <View
        ref={ref => (overlayRef = ref)}
        onLayout={() => {
          DeviceEventEmitter.emit('sendOverlayViewRef', {ref: overlayRef});
        }}
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          zIndex: 999,
          backgroundColor: colors.bg,
        }}
      />

      <ScrollView
        contentContainerStyle={{minHeight: '80%'}}
        showsVerticalScrollIndicator={false}>
        <View>
          <View>
            {listItems.map(item => (
              <TouchableOpacity
                key={item.name}
                activeOpacity={opacity / 2}
                onPress={() => {
                  item.close === false ? null : close();

                  item.func();
                }}
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: '5%',
                  paddingVertical: pv + 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon
                    style={{
                      width: 30,
                    }}
                    name={item.icon}
                    color={colors.pri}
                    size={SIZE.md}
                  />
                  <Text
                    style={{
                      fontFamily: WEIGHT.regular,
                      fontSize: SIZE.sm,
                      color: colors.pri,
                    }}>
                    {item.name}
                  </Text>
                </View>
                {item.switch ? (
                  <Icon
                    size={SIZE.lg}
                    color={item.on ? colors.accent : colors.icon}
                    name={item.on ? 'toggle-right' : 'toggle-left'}
                  />
                ) : (
                  undefined
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={opacity / 2}
            onPress={() => {
              close();
              NavigationService.navigate('Tags');
            }}
            style={{
              width: '100%',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingHorizontal: '5%',
              marginTop: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Icon
                style={{
                  width: 30,
                }}
                name="tag"
                color={colors.pri}
                size={SIZE.md}
              />
              <Text
                style={{
                  fontFamily: WEIGHT.regular,
                  fontSize: SIZE.sm,
                  color: colors.pri,
                }}>
                Tags
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: '5%',
              marginBottom: 0,
            }}>
            {[
              'home',
              'office',
              'work',
              'book_notes',
              'poem',
              'lists',
              'water',
            ].map(item => (
              <TouchableOpacity
                key={item}
                activeOpacity={opacity / 2}
                onPress={() => {
                  close();
                  NavigationService.navigate('Notes', {
                    heading: item,
                  });
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  padding: 7,
                  paddingLeft: 3.5,
                }}>
                <Text
                  style={{
                    fontFamily: WEIGHT.regular,
                    fontSize: SIZE.xs + 1,
                    color: colors.icon,
                  }}>
                  #{item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: '5%',
              marginBottom: 15,
            }}>
            {['red', 'yellow', 'green', 'blue', 'purple', 'orange', 'gray'].map(
              item => (
                <TouchableOpacity
                  key={item}
                  activeOpacity={opacity / 2}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    margin: 5,
                  }}>
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: item,
                      borderRadius: 100,
                    }}
                  />
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>

        {/*  <View
          style={{
            backgroundColor: '#F3A712',
            width: '90%',
            alignSelf: 'center',
            borderRadius: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 40,
            paddingHorizontal: ph,
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontFamily: WEIGHT.medium,
              color: 'white',
            }}>
            Upgrade to Pro
          </Text>

          <View
            style={{
              ...getElevation(5),
              paddingHorizontal: ph,
              backgroundColor: 'white',
              paddingVertical: pv - 8,
              borderRadius: 5,
            }}>
            <Icon name="star" color="#FCBA04" size={SIZE.lg} />
          </View>
        </View> */}
      </ScrollView>
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'center',
          marginBottom: 20,
          flexDirection: 'row',
          backgroundColor: colors.bg,
        }}>
        <TouchableOpacity
          onPress={() => {
            close();

            NavigationService.navigate('Login');
          }}
          activeOpacity={opacity / 2}
          style={{
            paddingVertical: pv + 5,
            paddingHorizontal: '5%',
            backgroundColor: colors.shade,
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Icon name="log-in" color={colors.accent} size={SIZE.lg} />

          <Text
            style={{
              fontFamily: WEIGHT.regular,
              color: colors.accent,
              fontSize: SIZE.md,
            }}>
            {'  '}Login
          </Text>
        </TouchableOpacity>

        {/* <Text
        style={{
          fontFamily: WEIGHT.semibold,
          color: colors.accent,
          fontSize: SIZE.md,
          marginTop: 10,
        }}>
        Hi, Ammar!
      </Text>

      <Text
        style={{
          fontFamily: WEIGHT.regular,
          color: colors.accent,
          fontSize: SIZE.xs,
          marginTop: 10,
        }}>
        80.45/100 MB
      </Text> */}

        {/*  <View
        style={{
          borderRadius: 2.5,
          backgroundColor: colors.accent,
          marginTop: 10,
          paddingHorizontal: 5,
          paddingVertical: 2,
        }}>
        <Text
          style={{
            fontFamily: WEIGHT.bold,
            fontSize: SIZE.xxs,
            color: 'white',
          }}>
          Basic User
        </Text>
      </View> */}
      </View>
    </AnimatedSafeAreaView>
  );
};
