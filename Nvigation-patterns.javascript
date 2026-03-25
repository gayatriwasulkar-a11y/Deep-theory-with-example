# Navigation patterns in mobile apps:
Navigation patterns in mobile apps define how users move between screens and features. Choosing the right pattern is important for usability, performance, and user experience.
There are so many ways to describe navigation in mobile apps and how important it is. The navigation is the way your users will get from point A to point B. 
It’s how they’ll discover the design and interact with the product. Designers and writers often compare navigation to the road 
system of an app, describing it as the highways users rely on to enjoy the product.
The navigation design of any product is crucial. While it’s tempting to think of the goal of the navigation as “getting from A to B in the least amount of time possible”, 
that would be a mistake. Your navigation isn’t about getting users there quickly – it’s about making the way there logical and easy.
1. Stack Navigation
Works like a stack (LIFO – Last In, First Out)
Each new screen is placed on top of the previous one
Users go back using a back button.
Example: Login → Home → Details → Back → Home
2. Tab Navigation (Bottom Tabs)
Displays tabs at the bottom of the screen
Each tab represents a main section.
Example: Home | Search | Notifications | Profile
3. Drawer Navigation (Side Menu)
Hidden menu that slides from the left or right side
Triggered by a hamburger icon ☰.
Example: Menu → Settings, Profile, Logout
4. Top Tab Navigation
Tabs displayed at the top of the screen
Often swipeable
Example: Chats | Status | Calls (like WhatsApp)
5. Modal Navigation
Opens a screen on top of current screen
Used for temporary interactions
Example: Popup forms, Image preview, Confirm actions


# React Navigation v6 deep architecture:
React Navigation v6 isn’t just a library—it’s a layered architecture that separates navigation logic, state management, and UI rendering. 
Understanding this “deep architecture” helps you build scalable apps and debug complex navigation flows.
Architecture Layers:
-NavigationContainer:	Root state manager. Manages the navigation state tree.
-State:	Current navigation tree. React Navigation stores navigation as a JSON-like state tree.
-Router:	Logic (state transitions). What happens when you call navigate(), goBack().
-Navigator:	UI + interaction
-Screen:	Actual content. Normal React components, Receive navigation props.
// ============================
// React Navigation v6 Project
// ============================
// 1. App.js
// ============================
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

// ============================
// 2. src/navigation/AppNavigator.js
// ============================
import React from 'react';
import RootStack from './RootStack';

export default function AppNavigator() {
  return <RootStack />;
}

// ============================
// 3. src/navigation/RootStack.js
// ============================
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// ============================
// 4. src/navigation/BottomTabs.js
// ============================
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from '../screens/Home/HomeStack';
import SearchScreen from '../screens/Search/SearchScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// ============================
// 5. src/screens/Home/HomeStack.js
// ============================
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// ============================
// 6. src/screens/Home/HomeScreen.js
// ============================
import React from 'react';
import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { id: 101 })}
      />
    </View>
  );
}

// ============================
// 7. src/screens/Home/DetailsScreen.js
// ============================
import React from 'react';
import { View, Text } from 'react-native';

export default function DetailsScreen({ route }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details ID: {route.params.id}</Text>
    </View>
  );
}

// ============================
// 8. src/screens/Search/SearchScreen.js
// ============================
import React from 'react';
import { View, Text } from 'react-native';

export default function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search Screen</Text>
    </View>
  );
}

// ============================
// 9. src/screens/Profile/ProfileScreen.js
// ============================
import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
}


# Stack, Tab, Drawer navigators:
StackNavigator
Let’s wire up the StackNavigator. I went into more detail about how to do this in my first post in this series, but the short version is that you’ll import { StackNavigator } 
from 'react-navigation' and then pass it a few config objects containing initialization options. 
After we do that, all of the screens that the navigator renders will get a navigation prop that we can use to go from screen to screen.
- example
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

TabNavigator
The main difference is that we’ll create an order property in our navigatorConfig object to tell the TabNavigator how to arrange the tabs from left to right. 
We’ll also set animationEnabled to true so we can see our tab transitions more clearly.
- example
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

DrawerNavigator
The DrawerNavigator has three routes: one named ‘Stack’, which holds our StackNavigator, one named ‘Tabs’, which holds our TabNavigator, and one named 
‘Plain’ that holds our plain old component.
- example
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

# Passing route params & reading state:
-Passing parameters between screens in React Navigation allows data to be shared from one screen to another. It helps in displaying dynamic content based on user actions.
Use navigation.navigate('ScreenName', { paramName: value }) to send data.
Access the data in the next screen using route.params.paramName.
Useful for passing user info, IDs, or form data between screens.
example: Passing Params (Send Data)
navigation.navigate('Details', 
{
  id: 101,
  name: 'Product A'
});

example: Receiving Params (Read Data)
function DetailsScreen({ route }) {
  const { id, name } = route.params;

  return <Text>{id} - {name}</Text>;
}

-The navigation state is the state where React Navigation stores the navigation structure and history of the app. It's useful to know about the structure of the navigation 
state if you need to do advanced operations such as resetting the state, providing a custom initial state etc.
navigation state object:
1.type - Type of the navigator that the state belongs to, e.g. stack, tab, drawer.
2.key - Unique key to identify the navigator.
3.routeNames - Name of the screens defined in the navigator. This is an unique array containing strings for each screen.
4.routes - List of route objects (screens) which are rendered in the navigator. It also represents the history in a stack navigator. There should be at least one item present in this array.
5.index - Index of the focused route object in the routes array.
6.history - An optional list of visited items. See History stack for more details.
7.stale - A navigation state is assumed to be stale unless the stale property is explicitly set to false. This means that the state object needs to be "rehydrated".


# Navigation lifecycle events:
The Angular Router emits navigation events that you can subscribe to in order to track the navigation lifecycle. These events are available through the Router.events observable. 
This section covers common routing lifecycle events for navigation and error tracking (in chronological order).
NavigationStart:	Occurs when navigation begins and contains the requested URL.
RoutesRecognized:	Occurs after the router determines which route matches the URL and contains the route state information.
GuardsCheckStart:	Begins the route guard phase. The router evaluates route guards like canActivate and canDeactivate.
GuardsCheckEnd:	Signals completion of guard evaluation. Contains the result (allowed/denied).
ResolveStart:	Begins the data resolution phase. Route resolvers start fetching data.
ResolveEnd:	Data resolution completes. All required data becomes available.
NavigationEnd:	Final event when navigation completes successfully. The router updates the URL.
NavigationSkipped:	Occurs when the router skips navigation (e.g., same URL navigation).
example:
import React, { useEffect } from 'react';
import { View, Button, Text } from 'react-native';

export default function HomeScreen({ navigation }) {

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      console.log('HomeScreen Focused');
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      console.log('HomeScreen Blurred');
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}


# Implement multi-screen navigation:
// =========================================
// Multi-Screen Navigation Example
// =========================================

// 1. package.json
{
  "name": "MultiScreenNavApp",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start"
  },
  "dependencies": {
    "expo": "~50.0.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "@react-navigation/native": "^6.x",
    "@react-navigation/native-stack": "^6.x",
    "@react-navigation/bottom-tabs": "^6.x",
    "@react-navigation/drawer": "^6.x",
    "react-native-screens": "^3.x",
    "react-native-safe-area-context": "^4.x",
    "react-native-gesture-handler": "^2.x",
    "react-native-reanimated": "^3.x"
  }
}

// =========================================
// 2. App.js
// =========================================
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

// =========================================
// 3. Drawer Navigator
// =========================================
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeTabs" component={BottomTabs} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

// =========================================
// 4. Bottom Tabs
// =========================================
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from '../screens/Home/HomeStack';
import SearchStack from '../screens/Search/SearchStack';
import ProfileStack from '../screens/Profile/ProfileStack';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

// =========================================
// 5. Home Stack
// =========================================
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// =========================================
// 6. Search Stack
// =========================================
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './SearchScreen';

const Stack = createNativeStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
}

// =========================================
// 7. Profile Stack
// =========================================
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

// =========================================
// 8. HomeScreen
// =========================================
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details', { id: 100 })} />
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
    </View>
  );
}

// =========================================
// 9. DetailsScreen
// =========================================
import React from 'react';
import { View, Text } from 'react-native';

export default function DetailsScreen({ route }) {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>ID: {route.params.id}</Text>
    </View>
  );
}

// =========================================
// 10. SearchScreen
// =========================================
import React from 'react';
import { View, Text } from 'react-native';

export default function SearchScreen() {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Search Screen</Text>
    </View>
  );
}

// =========================================
// 11. ProfileScreen
// =========================================
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Profile Screen</Text>
      <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
    </View>
  );
}

// =========================================
// 12. EditProfileScreen
// =========================================
import React from 'react';
import { View, Text } from 'react-native';

export default function EditProfileScreen() {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Edit Profile Screen</Text>
    </View>
  );
}

// =========================================
// 13. SettingsScreen
// =========================================
import React from 'react';
import { View, Text } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
}


# Add Tab + Stack hybrid navigation:
// =========================================
// Tab + Stack Hybrid Navigation 
// =========================================
// =========================================
// 1. package.json
// =========================================
{
  "name": "TabStackHybridApp",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start"
  },
  "dependencies": {
    "expo": "~50.0.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "@react-navigation/native": "^6.x",
    "@react-navigation/native-stack": "^6.x",
    "@react-navigation/bottom-tabs": "^6.x",
    "react-native-screens": "^3.x",
    "react-native-safe-area-context": "^4.x",
    "react-native-gesture-handler": "^2.x",
    "react-native-reanimated": "^3.x"
  }
};

// =========================================
// 2. index.tsx 
// =========================================
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);

// =========================================
// 3. App.js
// =========================================
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

// =========================================
// 4. src/navigation/TabNavigator.js
// =========================================
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from '../screens/Home/HomeStack';
import ProfileStack from '../screens/Profile/ProfileStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

// =========================================
// 5. src/screens/Home/HomeStack.js
// =========================================
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// =========================================
// 6. src/screens/Profile/ProfileStack.js
// =========================================
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

// =========================================
// 7. HomeScreen.js
// =========================================
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { id: 1 })}
      />
    </View>
  );
}

// =========================================
// 8. DetailsScreen.js
// =========================================
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const id = route?.params?.id ?? 0;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details ID: {id}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

// =========================================
// 9. ProfileScreen.js
// =========================================
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
      <Button
        title="Edit Profile"
        onPress={() => navigation.navigate('EditProfile')}
      />
    </View>
  );
}

// =========================================
// 10. EditProfileScreen.js
// =========================================
import React from 'react';
import { View, Text } from 'react-native';

export default function EditProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Edit Profile Screen</Text>
    </View>
  );
}


# Build reusable Navigation Header component:
// =========================================
// Tab + Stack Hybrid Navigation (Full Project -  REUSABLE HEADER FULL IMPLEMENTATION)
// =========================================
// =========================================
// 1. package.json
// =========================================
{
  "name": "TabStackHybridApp",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start"
  },
  "dependencies": {
    "expo": "~50.0.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "@react-navigation/native": "^6.x",
    "@react-navigation/native-stack": "^6.x",
    "@react-navigation/bottom-tabs": "^6.x",
    "react-native-screens": "^3.x",
    "react-native-safe-area-context": "^4.x",
    "react-native-gesture-handler": "^2.x",
    "react-native-reanimated": "^3.x"
  }
};

// =========================================
// 2. index.tsx 
// =========================================
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);

// =========================================
// 3. App.js
// =========================================
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

// =========================================
// 4. src/navigation/TabNavigator.js
// =========================================
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from '../screens/Home/HomeStack';
import ProfileStack from '../screens/Profile/ProfileStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

// =========================================
// 5. src/screens/Home/HomeStack.js
// =========================================
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// =========================================
// 6. src/screens/Profile/ProfileStack.js
// =========================================
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

// =========================================
// 7. HomeScreen.js
// =========================================
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { id: 1 })}
      />
    </View>
  );
}

// =========================================
// 8. DetailsScreen.js
// =========================================
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
  const id = route?.params?.id ?? 0;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details ID: {id}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

// =========================================
// 9. ProfileScreen.js
// =========================================
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
      <Button
        title="Edit Profile"
        onPress={() => navigation.navigate('EditProfile')}
      />
    </View>
  );
}

// =========================================
// 10. EditProfileScreen.js
// =========================================
import React from 'react';
import { View, Text } from 'react-native';

export default function EditProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Edit Profile Screen</Text>
    </View>
  );
}

// =========================================
// 11. Reusable Navigation Header Component 
// =========================================

// src/components/CustomHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CustomHeader({
  title = 'Title',
  navigation,
  showBack = false,
  rightComponent = null,
}) {
  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.left}>
        {showBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>◀</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.openDrawer?.()}>
            <Text style={styles.menu}>☰</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Title */}
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Section */}
      <View style={styles.right}>
        {rightComponent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6200ee',
    paddingHorizontal: 15,
  },
  left: {
    width: 50,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 50,
    alignItems: 'flex-end',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  back: {
    color: '#fff',
    fontSize: 20,
  },
  menu: {
    color: '#fff',
    fontSize: 20,
  },
});

// =========================================
// 12. USING HEADER IN STACK 
// =========================================

// src/screens/Home/HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import CustomHeader from '../../components/CustomHeader';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader title="Home" navigation={navigation} />
          ),
        })}
      />

      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader title="Details" navigation={navigation} showBack />
          ),
        })}
      />
    </Stack.Navigator>
  );
}


