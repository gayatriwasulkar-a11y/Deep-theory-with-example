# API calls in React Native:
APIs are the backbone of modern web and mobile applications. They allow us to connect our apps to external services, databases, and other data sources to retrieve and send 
information in real-time. In React Native, making API calls is a fundamental aspect of building dynamic, data-driven mobile applications.
API calls in React Native are used to fetch or send data between your mobile app and a backend server (like Node.js, Firebase, etc.). Let’s break it down in a simple and practical way.
Example: API Call
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}


#  Axios + React Query for mobile:
Axios is a lightweight and feature-rich JavaScript library for making HTTP requests. It simplifies API interactions with features like interceptors, 
request cancellation, and response transformation.
Axios is a popular JavaScript library used for making HTTP requests from the browser or Node.js. It supports Promise-based API, which makes it easy 
to handle asynchronous requests. Axios provides a simple and consistent API for making GET, POST, PUT, DELETE, and other types of HTTP requests.

React Query is a state management library designed for handling server state in React. It automates data fetching, caching, and synchronization, making it 
easier to manage and display API data efficiently.
React Query is a library for managing, caching, and syncing asynchronous data in React applications. It provides a set of hooks that simplify data fetching, 
caching, and updating. React Query takes care of many common data-fetching tasks, such as caching, refetching, and error handling, allowing developers to focus on building the user interface.
example:
//App.js
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeScreen from "./HomeScreen";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  );
}

//HomeScreen.js
import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// API function
const fetchUsers = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
};

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error loading data</Text>;

  return (
    <View>
      <Text>User List</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
}


# AsyncStorage for offline storage:
AsyncStorage is a simple local storage system in React Native that lets your app save data on the user’s device so it can be used even without internet.
AsyncStorage is a simple, asynchronous, and persistent key-value storage system available in React Native. It allows developers to store simple data, 
such as user preferences, small amounts of app state, or cached API responses. AsyncStorage is easy to use and provides a lightweight solution for basic offline needs.
AsyncStorage is ideal for scenarios where you need to save small amounts of data that don’t require complex querying or relational structures. However, it’s not suitable 
for large datasets, as performance may degrade with larger data sizes.
AsyncStorage is a key-value local storage system in React Native used to persist data on the device for offline access and better performance.
example:
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [name, setName] = useState("");

  // Save data
  const saveData = async () => {
    await AsyncStorage.setItem("username", "Gayatri");
  };

  // Load data
  const loadData = async () => {
    const value = await AsyncStorage.getItem("username");
    setName(value);
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Button title="Save Name" onPress={saveData} />
      <Button title="Load Name" onPress={loadData} />

      <Text style={{ fontSize: 20 }}>
        Name: {name}
      </Text>
    </View>
  );
}


# Handling network loss gracefully:
Handling network loss gracefully in React Native means your app should not crash, should inform the user, and should still work (offline mode) when internet is unavailable.
Exception handling allows systems to degrade gracefully when they encounter problems. Instead of failing completely, the system can switch to a reduced functionality mode, 
ensuring that users still get some level of service.
Handle network loss by detecting connection + showing message + using cached data + retrying API.
example:
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function App() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      {isOnline ? (
        <Text>Online ✅</Text>
      ) : (
        <Text>No Internet ❌</Text>
      )}
    </View>
  );
}


# JWT authentication in mobile apps:
As mobile applications continue to proliferate, ensuring secure authentication and authorization mechanisms is paramount. 
JSON Web Tokens (JWT) have emerged as a popular solution for managing authentication and authorization in web and mobile applications due to 
their simplicity, flexibility, and security.
When a user logs in to the mobile app, the server validates the user's credentials. Upon successful validation, the server generates a JWT containing 
relevant user information (claims) such as user ID and roles.
JSON Web Tokens (JWTs) are a common tool in modern mobile app development, but are you using them correctly? These tokens handle sensitive user data, so understanding 
their role and potential pitfalls is critical for developers.
JWTs are a standard for securely transmitting information as a JSON object. They're composed of three parts:
Header: Specifies the algorithm used for signing.
Payload: Contains the claims or data being transmitted.
Signature: Ensures the token's integrity and verifies the sender.
A JSON Web Token (JWT) is a compact, URL-safe string used to represent claims between two parties (e.g., a mobile app and a server). It’s often used for authentication: 
after a user logs in, the server issues a JWT, which the app includes in subsequent API requests to prove the user’s identity.

Access Tokens:
Purpose: Grant temporary access to protected APIs (e.g., "get user profile," "post a comment").
Lifetime: Short (e.g., 15–30 minutes) for security. If an access token is stolen, the attacker has limited time to misuse it.
Usage: Included in the Authorization: Bearer <token> header of API requests.

Refresh Tokens:
Purpose: Obtain new access tokens without re-authenticating the user.
Lifetime: Longer (e.g., days or weeks), but still revocable by the server.
Usage: Sent to a dedicated "refresh" endpoint (e.g., /api/refresh-token) when the access token expires.


# API service layer:
//App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

//api/client.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const client = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 5000,
});

client.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

//api/authService.js
import client from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email, password) => {
  const res = await client.post("/login", { email, password });

  const token = res.data.token;

  await AsyncStorage.setItem("token", token);

  return res.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem("token");
};

//api/orderService.js
import client from "./client";

export const getOrders = async () => {
  const res = await client.get("/users?page=1");
  return res.data.data; 
};

//api/index.js
export * from "./authService";
export * from "./orderService";

//screens/LoginScreen.js
import React from "react";
import { View, Button, Alert } from "react-native";
import { login } from "../api";

export default function LoginScreen({ navigation }) {

  const handleLogin = async () => {
    try {
      await login("eve.holt@reqres.in", "cityslicka");
      Alert.alert("Login Success");
      navigation.replace("Orders");
    } catch (error) {
      Alert.alert("Login Failed");
    }
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

//src/screens/OrdersScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { getOrders, logout } from "../api";

export default function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Text>Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.first_name}</Text>
        )}
      />

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

//src/navigation/AppNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import OrdersScreen from "../screens/OrdersScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
    </Stack.Navigator>
  );
}


# Implement offline caching using AsyncStorage:
//App.js
import React from "react";
import PostScreen from "./src/screens/PostScreen";

export default function App() {
  return
    <PostScreen />;
}

//src/utils/storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

// Save data
export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log("Save error");
  }
};

// Get data
export const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.log("Get error");
    return null;
  }
};

//src/api/postService.js
import axios from "axios";

export const fetchPosts = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
};

//src/screens/PostScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Button } from "react-native";
import NetInfo from "@react-native-community/netinfo";

import { fetchPosts } from "../api/postService";
import { saveData, getData } from "../utils/storage";

export default function PostScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    checkNetworkAndFetch();
  }, []);

  const checkNetworkAndFetch = async () => {
    const state = await NetInfo.fetch();

    if (state.isConnected) {
      loadOnlineData();
    } else {
      loadOfflineData();
    }
  };

  const loadOnlineData = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);

      // Save for offline
      await saveData("posts", data);

      setOffline(false);
    } catch (error) {
      loadOfflineData();
    } finally {
      setLoading(false);
    }
  };

  const loadOfflineData = async () => {
    const data = await getData("posts");

    if (data) {
      setPosts(data);
      setOffline(true);
    }

    setLoading(false);
  };

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={{ marginTop: 50 }}>
      
      {offline && (
        <Text style={{ color: "red" }}>
          Offline Mode - Showing saved data
        </Text>
      )}

      <Button title="Refresh" onPress={checkNetworkAndFetch} />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
         <Text>{item.title}</Text>
        )}
      />
    </View>
  );
}


# Add login persistence using tokens:
//App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

//src/utils/storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token) => {
  await AsyncStorage.setItem("token", token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("token");
};

//src/api/authService.js
import axios from "axios";
import { saveToken } from "../utils/storage";

export const loginUser = async (email, password) => {
  const res = await axios.post("https://reqres.in/api/login", {
    email,
    password,
  });

  const token = res.data.token;

  // Save token
  await saveToken(token);

  return token;
};

//src/screens/LoginScreen.js
import React from "react";
import { View, Button, Alert } from "react-native";
import { loginUser } from "../api/authService";

export default function LoginScreen({ navigation }) {
  const handleLogin = async () => {
    try {
      await loginUser("eve.holt@reqres.in", "cityslicka");
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Login Failed");
    }
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

//src/screens/HomeScreen.js
import React from "react";
import { View, Text, Button } from "react-native";
import { removeToken } from "../utils/storage";

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await removeToken();
    navigation.replace("Login");
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Text>Welcome User</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

//src/navigation/AppNavigator.js
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import { getToken } from "../utils/storage";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await getToken();

    if (token) {
      setIsLoggedIn(true);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ marginTop: 50 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}


