import React, { Component } from 'react'
import { Thumbnail, View, Icon, Text } from "native-base"
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator, createMaterialTopTabNavigator, TabBarBottom } from 'react-navigation-tabs'
import LoginScreen from './Src/LoginScreen'
import AuthLoadingScreen from './Src/AuthLoadingScreen'
import SignUpScreen from './Src/SignupScreen'
import ProfileScreen from './Src/ProfileScreen'
import AboutScreen from './Src/About'
import OngoingCampaignScreen from './Src/OngoingCampaignScreen'

import NotificationTabBarIcon from './Src/Components/NotiTabBarIcon'
import NotificationScreen from './Src/NotificationScreens'

import SocialScreen from './Src/SocialScreen'
import SocialDetailScreen from './Src/SocialScreen/SocialDetailContainer'

const  bellIcon = require("./Src/Assets/bell.png")

const BottomTabsNavigator = createBottomTabNavigator({    
    
    Campaign: {
      screen: OngoingCampaignScreen,
      navigationOptions: {
        title: 'Products',        
      }        
    },
   
   Social: {
      screen: SocialScreen,
      navigationOptions: {
        title: "Forum"
      }
   },

   Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        title: 'Notifications',
        tabBarIcon: ({ tintColor }) => (
          <View >     
            <Thumbnail resizeMode="contain" square source={bellIcon} style={{ height: 40, width: 40, tintColor: tintColor }} />      
            <NotificationTabBarIcon />
          </View>
        )
      }
    },

    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
      }
    } 
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Campaign') {
          iconName = require("./Src/Assets/Office-55.png")
        } else if (routeName === 'Started') {
          iconName = require("./Src/Assets/Buildings-05.png")
        } else if (routeName === 'Social') {
            iconName = require("./Src/Assets/Buildings-05.png")
        } else if (routeName === 'Notification') {
            iconName = require("./Src/Assets/bell.png")
        } else if (routeName === "Profile") {
          iconName = require("./Src/Assets/profile.png")
        }
  
        // You can return any component that you like here!
        // return <IconComponent name={iconName} size={25} color={tintColor} type="Feather" />;
        return <Thumbnail resizeMode="contain" square source={iconName} style={{ height: 25, width: 25, tintColor: tintColor }} />
      },
    }),
    tabBarOptions: {
      activeTintColor: '#2e4342',      
      inactiveTintColor: 'grey',
      activeBackgroundColor: '#fff',
      inactiveBackgroundColor: '#fff',
    }
  }
);

export const AppNavigator = createStackNavigator(
  {
    AuthLoading : {
      screen: AuthLoadingScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
    
    Tabs: {
      screen: BottomTabsNavigator,
    },

    SocialDetailScreen: {
      screen: SocialDetailScreen,
    }, 

  
    About: {
      screen: AboutScreen,
    }   
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
      cardStyle: { backgroundColor: '#FF0000' },
    },
    initialRouteName: 'AuthLoading',
    headerMode: 'none'
  },
);
  