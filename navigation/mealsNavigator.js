import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'

import Colors from '../constants/Colors';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen'

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
  },
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
  MealDetail: MealDetailScreen
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTintColor: 
      Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen'
  }
}
);

const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTintColor: 
      Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  }
}
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator, navigationOptions: {
      tabBarLabel: 'Meals',
      tabBarColor: 'blue',
      tabBarIcon: ({ tintColor }) => (<Ionicons name='ios-restaurant'
        size={30}
        color='white'
      />),
    }
  },
  Favorites: {
    screen: FavNavigator, navigationOptions: {
      tabBarLabel: 'Favorites',
      tabBarColor: 'green',
      tabBarIcon: ({ tintColor }) => (<Ionicons name='ios-star'
        size={30}
        color='white'
      />)
    }
  }
};

const MealsFavTabNavigator = Platform.OS === 'android' ?
  createMaterialBottomTabNavigator(tabScreenConfig, { activeColor: Colors.accentColor, shifting: true }) :

  createBottomTabNavigator(tabScreenConfig,
    {
      tabBarOptions: {
        activeTintColor: Colors.accentColor
      }
    });

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
  },{
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
      },
      headerTintColor: 
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    }
});

const MainNavigator = createDrawerNavigator({
  MealsFav: {screen: MealsFavTabNavigator,
            navigationOptions: {
              drawerLabel: 'Meals'
                                }
            },
  Filters: FiltersNavigator
},{
  contentOptions:{
    activeTintColor: Colors.accentColor,
    labelStyle: {
        fontFamily: 'open-sans-bold'
    }
  }
});

export default createAppContainer(MainNavigator);
