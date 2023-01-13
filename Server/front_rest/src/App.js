import './App.css';
import React from "react";
import Layout from "./components/layout/Layout.js";
import Routes from "./routes";
function App() {
  return (
    <div className="App">
        <Layout>
          <Routes/>
        </Layout>
    </div>
  );
}

export default App;
