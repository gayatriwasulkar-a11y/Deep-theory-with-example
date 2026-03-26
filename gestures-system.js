# Mobile gestures system:
A mobile gestures system refers to how users interact with a mobile app using touch-based actions instead of traditional mouse/keyboard input. 
It’s a core part of mobile UX design (especially in frameworks like React Native, Flutter, or native Android/iOS).
1. Tap (Click)
Action: Single touch on screen
Use case: Buttons, links, selecting items
Example: Opening an app or pressing "Login"
2. Double Tap
Action: Two quick taps
Use case: Zoom in/out, like a post
Example: Double-tap to like in Instagram
3. Swipe
Action: Move finger across screen
Types: Left, Right, Up, Down
Use case: Navigation, deleting items
Example: Swipe cards in Tinder
4. Long Press (Hold)
Action: Press and hold for a few seconds
Use case: Show options, drag items
Example: Long press an app icon to uninstall


# TouchableOpacity, Pressable, GestureHandler:
-TouchableOpacity:
A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.
Opacity is controlled by wrapping the children in an Animated.View, which is added to the view hierarchy. Be aware that this can affect layout.
example:
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.countContainer}>
          <Text>Count: {count}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Press Here</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default App;

- Pressable:
Pressable is a Core Component wrapper that can detect various stages of press interactions on any of its defined children.
Pressable is a React Native component used to detect and handle different types of press interactions on UI elements. It provides more control and flexibility compared to other touchable components.
Detects press events like onPress, onLongPress, onPressIn, and onPressOut.
Allows custom styling based on press state.
Used to create interactive buttons and touchable UI elements.
example:
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onPress';
  } else if (timesPressed > 0) {
    textLog = 'onPress';
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Pressable
          onPress={() => {
            setTimesPressed(current => current + 1);
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.wrapperCustom,
          ]}>
          {({pressed}) => (
            <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
          )}
        </Pressable>
        <View style={styles.logBox}>
          <Text testID="pressable_press_console">{textLog}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});

export default App;

-GestureHandler:
React Native Gesture Handler provides native-driven gesture management APIs for building best possible touch-based experiences in React Native.
With this library gestures are no longer controlled by the JS responder system, but instead are recognized and tracked in the UI thread. It makes 
touch interactions and gesture tracking not only smooth, but also dependable and deterministic.
-Installation
Check getting started section of our docs for the detailed installation instructions.
-Documentation
Check out our dedicated documentation page for info about this library, API reference and more: https://docs.swmansion.com/react-native-gesture-handler/docs/
-Examples
If you want to play with the API but don't feel like trying it on a real app, you can run the example project. Clone the repo, go to the example folder and run:
| yarn install |
Run yarn start to start the metro bundler
Run yarn android or yarn ios (depending on which platform you want to run the example app on).
You will need to have an Android or iOS device or emulator connected.


# ScrollView vs FlatList performance:
-ScrollView:
ScrollView is a general-purpose component for scrolling. It’s suitable when you have a small, finite list of items that you want to display on a screen. 
It’s not ideal for very long lists or dynamic data, as it renders all the items at once.
-Advantages:
1.Simplicity and Ease of Use: ScrollView is easy to set up and use, providing a straightforward solution for creating scrollable views.
2.Flexibility and Customization: It offers flexibility in handling various types of content and allows customization in terms of styling, layout, and content arrangement.
3.Suitability for Small or Fixed Lists: ScrollView is well-suited for scenarios with a limited number of items or fixed content, providing smooth scrolling and avoiding 
the virtualization overhead seen in specialized components.
4.No Virtualization Overhead: Unlike specialized components like FlatList which use virtualization to render only the items visible on the screen, ScrollView renders all 
child components at once. In some scenarios, this lack of virtualization may be an advantage, especially when dealing with a small and static list of items.
-Disadvantages:
1.Rendering All Items at Once: ScrollView renders all its child components at once. This can be inefficient and lead to performance issues when dealing with a large number 
of items. For long lists, it might cause slower initial rendering times and increased memory consumption.
2.Performance with Large Datasets: When dealing with a large dataset, the performance of ScrollView might degrade compared to more specialized components like FlatList. 
Since FlatList loads items dynamically, it is better optimized for rendering long lists without consuming excessive resources.
3.Lack of Virtualization: Unlike FlatList, ScrollView lacks the built-in virtualization mechanism. Virtualization is crucial for optimizing memory usage and rendering only 
the visible items on the screen. Without virtualization, ScrollView can be less efficient for long lists.
4.Limited Built-in Features: ScrollView has fewer built-in features for handling common list functionalities. For example, it does not provide features like pull-to-refresh 
or automatically handling item separators. These features are available out-of-the-box in components like FlatList.
5.Less Optimal for Dynamic Data: If your data is dynamic and frequently changing, ScrollView may not be the most optimal choice. Components like FlatList are designed to 
efficiently handle dynamic datasets, reusing and recycling components as needed.
6.Potential Memory Issues: Since ScrollView renders all its items simultaneously, it may lead to increased memory usage, especially when dealing with a large number of complex 
components. This can impact the overall performance of your application.

-FlatList:
FlatList is specifically designed for efficiently rendering long lists of data. It’s a more performant option for large datasets or dynamic content. It only renders the 
items that are currently visible on the screen, making it more memory-efficient.
-Advantages:
1.Efficient Rendering for Large Datasets: FlatList is optimized for efficiently rendering long lists of data by loading and unloading items dynamically. This leads to improved 
performance and reduced memory consumption when dealing with large datasets.
2.Virtualization for Memory Optimization: It incorporates the concept of virtualization, rendering only the items that are currently visible on the screen. This helps optimize 
memory usage and ensures that the application remains responsive, even with extensive lists.
3.Component Reusability: FlatList automatically recycles and reuses list item components, minimizing the number of components created and destroyed. This enhances performance, 
especially in scenarios where items share similar structures.
4.Lazy Loading: The lazy loading mechanism ensures that items are loaded only when they come into the view, reducing the initial rendering time and providing a smoother user experience.
5.Built-in Features: FlatList comes with built-in features such as pull-to-refresh, making it easier to implement common functionalities without additional coding effort.
6.Scrolling Performance: Due to its optimized rendering strategy, FlatList generally offers better scrolling performance compared to rendering all items at once, as in the case of ScrollView.
7.Handling Dynamic Data: It is well-suited for scenarios with dynamic and frequently changing datasets, offering a more efficient solution compared to components like ScrollView 
when dealing with evolving content.
-Disadvantages
1.Complexity for Small Lists: For small datasets or a fixed number of items, using FlatList might introduce unnecessary complexity. Its optimizations for large datasets may not be 
fully utilized in scenarios where the list size is limited.
2.Learning Curve: Understanding and configuring FlatList might have a steeper learning curve compared to simpler components like ScrollView. Beginners may find it initially 
challenging to grasp the concepts of virtualization and component recycling.
3.Initial Setup Overhead: Setting up FlatList with all its props and configurations may require more initial setup compared to a basic ScrollView. This could be considered a 
disadvantage in scenarios where a quick and simple implementation is sufficient.
4.Rendering Customization Challenges: While FlatList provides built-in features, customizing the appearance of the list items might be more challenging compared to a general-purpose 
component like ScrollView. Customizing the rendering logic can sometimes require more advanced techniques.
5.Dependency on Key Extractors: FlatList requires a unique keyExtractor prop to efficiently identify and track each item. Managing key extraction might be considered an additional 
overhead, especially when dealing with complex data structures.
6.Performance Trade-offs on Older Devices: On older devices or those with limited resources, the benefits of virtualization may not be as pronounced, and the performance gains might 
not be as significant as on newer, more powerful devices.
7.Potential Bugs and Issues: While rare, there could be potential bugs or issues related to the virtualization and recycling mechanisms of FlatList. Debugging such issues may require 
a deeper understanding of the inner workings of the component.


# Rendering large lists efficiently:
Rendering large lists efficiently is critical in React Native—especially when you’re dealing with hundreds or thousands of items. If done wrong, your app will lag, freeze, or crash.
Rendering large lists means displaying hundreds or thousands of items (e.g., users, products, messages) in a mobile app.
Example:
Chat messages
Product lists
Social media feeds
-Key Component: FlatList
FlatList is used instead of ScrollView
-Important Optimization Techniques
1. Limit Initial Rendering
Render only a few items at first
Improves startup performance
2. Batch Rendering
Load items in small groups
Avoid UI freezing
3. Windowing
Keep only nearby items in memory
Remove far-away items
4. Key Extraction
Each item must have a unique key
Helps React track changes efficiently
5. Avoid Re-rendering
Prevent unnecessary updates
Use memoization


# Image caching and performance in RN:
-Image Performance is Important:
Problems without optimization
Slow loading
App lag while scrolling
High data usage
Poor user experience
-Image Caching:
Image caching = storing images locally after first load
First time → download from server
Next time → load from cache (no download)
example:
import React from 'react';
import { FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';

const DATA = [
  { id: '1', image: 'https://example.com/img1.jpg' },
];

export default function App() {
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <FastImage
          style={{ width: 100, height: 100 }}
          source={{
            uri: item.image,
            cache: FastImage.cacheControl.immutable,
          }}
        />
      )}
    />
  );
}


# Build a FlatList-based patient list:
//App.js
import React from 'react';
import { SafeAreaView } from 'react-native';
import PatientListScreen from './screens/PatientListScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PatientListScreen />
    </SafeAreaView>
  );
}

//data/patients.js
export const PATIENTS = Array.from({ length: 100 }, (_, i) => ({
  id: i.toString(),
  name: `Patient ${i + 1}`,
  age: 20 + (i % 50),
  disease: ["Flu", "Diabetes", "Covid", "Fever"][i % 4],
}));

//components/PatientItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PatientItem = React.memo(({ patient }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{patient.name}</Text>
      <Text>Age: {patient.age}</Text>
      <Text>Disease: {patient.disease}</Text>
    </View>
  );
});

export default PatientItem;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    backgroundColor: '#f9f9f9',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

//screens/PatientListScreen.js
import React, { useState } from 'react';
import { View, FlatList, TextInput } from 'react-native';
import { PATIENTS } from '../data/patients';
import PatientItem from '../components/PatientItem';

export default function PatientListScreen() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(PATIENTS.slice(0, 20));

  const loadMore = () => {
    const more = PATIENTS.slice(data.length, data.length + 20);
    setData([...data, ...more]);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Search patient..."
        value={search}
        onChangeText={setSearch}
        style={{
          padding: 10,
          borderWidth: 1,
          margin: 10,
          borderRadius: 5,
        }}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PatientItem patient={item} />}

        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}

        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}

        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

//styles/styles.js 
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


# Add pull-to-refresh & infinite scroll:
//App.js
import React from 'react';
import { SafeAreaView } from 'react-native';
import PatientListScreen from './screens/PatientListScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PatientListScreen />
    </SafeAreaView>
  );
}

//data/patients.js
export const PATIENTS = Array.from({ length: 200 }, (_, i) => ({
  id: i.toString(),
  name: `Patient ${i + 1}`,
  age: 20 + (i % 50),
  disease: ["Flu", "Diabetes", "Covid", "Fever"][i % 4],
}));

//components/PatientItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PatientItem = React.memo(({ patient }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{patient.name}</Text>
      <Text>Age: {patient.age}</Text>
      <Text>Disease: {patient.disease}</Text>
    </View>
  );
});

export default PatientItem;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    backgroundColor: '#f9f9f9',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

//screens/PatientListScreen.js
import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { PATIENTS } from '../data/patients';
import PatientItem from '../components/PatientItem';

export default function PatientListScreen() {
  const [data, setData] = useState(PATIENTS.slice(0, 20));
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Pull to Refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setData(PATIENTS.slice(0, 20)); // reset data
      setRefreshing(false);
    }, 1000);
  }, []);

  //  Infinite Scroll
  const loadMore = () => {
    if (loadingMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const more = PATIENTS.slice(data.length, data.length + 20);
      setData((prev) => [...prev, ...more]);
      setLoadingMore(false);
    }, 1000);
  };

  //  Search Filter
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Search */}
      <TextInput
        placeholder="Search patient..."
        value={search}
        onChangeText={setSearch}
        style={{
          padding: 10,
          borderWidth: 1,
          margin: 10,
          borderRadius: 5,
        }}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PatientItem patient={item} />}

        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}

        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}

        // Pull-to-refresh
        refreshing={refreshing}
        onRefresh={onRefresh}

        // Infinite scroll
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}

        // Footer Loader
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  );
}


# Implement gesture-based buttons:
//App.js
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeScreen />
    </GestureHandlerRootView>
  );
}

//components/GestureButton.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  TapGestureHandler,
  LongPressGestureHandler,
} from 'react-native-gesture-handler';

export default function GestureButton() {
  const onTap = () => {
    alert('Tapped!');
  };

  const onLongPress = () => {
    alert('Long Pressed!');
  };

  return (
    <LongPressGestureHandler onActivated={onLongPress}>
      <TapGestureHandler onActivated={onTap}>
        <Text style={styles.button}>Tap / Long Press</Text>
      </TapGestureHandler>
    </LongPressGestureHandler>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    color: 'white',
    textAlign: 'center',
    margin: 10,
    borderRadius: 5,
  },
});

//components/SwipeButton.js 
import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

export default function SwipeButton() {
  const [message, setMessage] = useState('Swipe Me');

  const handleSwipe = (event) => {
    if (event.nativeEvent.translationX > 100) {
      setMessage('Swiped Right 👉');
    } else if (event.nativeEvent.translationX < -100) {
      setMessage('Swiped Left 👈');
    }
  };

  return (
    <PanGestureHandler onEnded={handleSwipe}>
      <Text style={styles.button}>{message}</Text>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    color: 'white',
    textAlign: 'center',
    margin: 10,
    borderRadius: 5,
  },
});

//screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GestureButton from '../components/GestureButton';
import SwipeButton from '../components/SwipeButton';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gesture-Based Buttons</Text>

      <GestureButton />
      <SwipeButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
});



