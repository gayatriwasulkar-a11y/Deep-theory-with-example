1.SPA vs MPA:-
-Single-Page application refers to a type of application that entirely runs within the web browser and does not require the entire page to be reloaded during use. 
The goal is faster transitions that make the website feel more like a native mobile app.
This approach provides a more responsive and seamless user experience, as the page doesn’t need to be reloaded entirely for every interaction. SPAs are commonly used to 
create interactive and fast web applications using technologies like Angular, React.js, and Vue.js.
If you are looking to build a web application that is fast, responsive, easy to develop and maintain, then a single-page application is a good option to consider.
Common examples of single-page apps are Gmail, Google Maps, Paypal, and Airbnb.
Moreover, if you want to know more about SPA then you can learn more with our post defining single-page application. In this article, we have covered everything about how SPA works 
and its advantages which will help you understand the concept precisely.
SPA Loads content dynamically within a single page. As SPA does not require the browser to reload the entire page, SPA offers a more seamless and interactive experience.

-Multi-Page application is a web application that loads a new page for each action that the user takes. A multi-page app consists of multiple static pages that load a new page for 
the server and then update the content of that page as needed.
Multi-Page application (MPA) is often used when an application needs to have different pages with different purposes. For example, an MPA has a homepage, a product catalog, a contact 
form, and a user profile. Each page would have its own layout and functionality, depending on its purpose.
Common examples of multi-page applications are eBay, Amazon, Facebook, and Twitter.
MPA requires a full page reload for each new page. MPA results in slower page transitions and perceived delays as it requires the complete page to reload every time.

2.React Router v6 deep architecture:-
React Router v6 is one of the biggest rewrites in the router’s history. It’s smaller, faster, more powerful, and built for the modern React world.
React Router v6 introduces a ranking-based matching algorithm, eliminating the need for exact or manually ordering routes.
React Router v6 simplifies the: element={<Component />}.
React Router v6 is a complete rewrite with better tree-shaking and modern architecture.
Many apps see bundle size reductions of 50–60%.
Nothing to change — just enjoy the faster loads.

3.Nested routes & layout routes:-
Nested routes are a core feature of React Router that allow you to define child routes inside parent routes. This hierarchical structure reflects the relationship between different 
parts of your application and enables you to build more modular and organized route configurations.
For example, if you have a dashboard with multiple subsections, such as "Profile", "Settings", and "Analytics", these sections can be treated as child routes of the main "Dashboard" route. 
This approach allows you to share a common layout (like a sidebar or header) among all child routes while still rendering unique components for each sub-route.

Layout routes are one of the most important architectural concepts in React Router v6. They allow you to share UI structure across multiple routes using nested routing.
Instead of repeating headers, sidebars, or wrappers in every page, you define them once in a layout route.
A layout route is a parent <Route> that:
Renders shared UI (header, sidebar, navbar, etc.)
Uses <Outlet /> to render its child routes

4.Protected route implementation:-
React Router offers a simple method to create protected routes that demand authentication for access. By default, these routes are treated as public routes and anyone can access them. 
Following React routing best practices, you can create a more secure and structured navigation experience by restricting access to sensitive routes.
To create a protected route, you need to use the React Router Route component and specify the route path provider component that you want to protect. Next, you can utilize the render prop 
function to selectively render the component you wish to protect - a common React Router best practice.
This is a component that you would usually use whenever you want to protect certain pages or routes in your React application, and only allow a signed-in user to access them. This is 
common in a lot of React applications that have authentication.
If you have authenticated users, you often want to protect certain parts,  private routes, of your application and only make sure that signed-in users can access them. React uses a 
very popular client-side routing library, React Router DOM. React Router DOM, if you're not aware of this library, you can use it to implement routing in your React application.
example:-
import { Navigate, Outlet, useLocation } from "react-router-dom";
function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}

5.Dynamic and optional route params:-
Dynamic params use :paramName syntax to capture URL segments and are accessed via useParams() or loader params. 
example:-
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./User";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

User.js
import { useParams } from "react-router-dom";
function User() {
  const { id } = useParams();

  return <h1>User ID is: {id}</h1>;
}
export default User;

Optional params aren’t supported directly in v6, so we model them using separate routes or nested index routes.
example:-
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersList from "./UsersList";
import User from "./User";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}
//User.jsx
import { useParams } from "react-router-dom";
function User() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}
//userList.jsx
function UsersList() {
  return <h1>All Users</h1>;
}


6.Create nested dashboard routes:-
//App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import DashboardLayout from "./DashboardLayout";
import DashboardHome from "./DashboardHome";
import Users from "./Users";
import Settings from "./Settings";
function App() {
  return (
    <>
      <nav className="top-nav">
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Dashboard parent route */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
//main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
//DashboardLayout.jsx
import { Outlet, Link } from "react-router-dom";
function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3>Dashboard</h3>
        <Link to="">Overview</Link>
        <Link to="users">Users</Link>
        <Link to="settings">Settings</Link>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
export default DashboardLayout;
//Home.jsx
function Home() {
  return <h2>Home Page</h2>;
}
export default Home;
//DashboardHome.jsx
function DashboardHome() {
  return <h2>Dashboard Overview</h2>;
}
export default DashboardHome;
//User.jsx
function Users() {
  return <h2>Users Page</h2>;
}
export default Users;
//Settings.jsx
function Settings() {
  return <h2>Settings Page</h2>;
}
export default Settings;
//App.css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
.top-nav {
  background-color: #333;
  color: #fff;
  padding: 10px;
}
.top-nav a {
  color: white;
  text-decoration: none;
  margin-right: 10px;
}
.top-nav a:hover {
  text-decoration: underline;
}
.dashboard-container {
  display: flex;
  min-height: 80vh;
}
.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sidebar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.sidebar a:hover {
  color: #007bff;
}
.dashboard-content {
  flex: 1;
  padding: 20px;
}

7.Build PrivateRoute component/Implement auth-based routing:-
App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "./DashboardLayout";
import DashboardHome from "./DashboardHome";
import Users from "./Users";
import Settings from "./Settings";
function App() {
  return (
    <>
      <nav className="top-nav">
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
//Login.jsx
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
export default Login;
//PrivateRoute.js
import { Navigate, Outlet } from "react-router-dom";
const isAuthenticated = () => {
  return localStorage.getItem("auth") === "true";
};

function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;


8.Implement auth-based routing:-
//App.jsx
import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Login from "./Login";
import DashboardLayout from "./DashboardLayout";
import DashboardHome from "./DashboardHome";
import Users from "./Users";
import Settings from "./Settings";

function App() {
  return (
    <AuthProvider>
      <nav style={{ padding: "10px", background: "#333" }}>
        <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>Home</Link>
        <Link to="/dashboard" style={{ color: "#fff" }}>Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
export default App;
//main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
//AuthProvider.jsx
import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const login = (username) => {
    const userData = { name: username };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
//PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

function PrivateRoute() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoute;
//Login.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    login("Gayatri wasulkar"); 
    navigate("/dashboard");
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
export default Login;
//DashboardLayout.jsx
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

function DashboardLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px", padding: "15px", background: "#f4f4f4" }}>
        <h3>Dashboard</h3>
        <p>Welcome, {user?.name}</p>
        <Link to="">Overview</Link><br />
        <Link to="users">Users</Link><br />
        <Link to="settings">Settings</Link><br />
        <button onClick={handleLogout}>Logout</button>
      </aside>
      <main style={{ padding: "20px", flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
export default DashboardLayout;
//Home.jsx
function Home() {
  return <h2>Home Page (Public)</h2>;
}
export default Home;
//DashboardHome.js
function DashboardHome() {
  return <h2>Dashboard Overview</h2>;
}
export default DashboardHome;
//Users.jsx
function Users() {
  return <h2>Users Page</h2>;
}
export default Users;
//Settings.jsx
function Settings() {
  return <h2>Settings Page</h2>;
}
export default Settings;

