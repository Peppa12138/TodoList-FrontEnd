// import React from 'react';
// import Login from './components/login';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Login />
//     </div>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import React from 'react';
// import Login from './components/login';
// import Register from './components/register';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/login" component={Login} />
//         <Route path="/register" component={Register} />
//         {/* 其他路由设置 */}
//       </Switch>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // 登录页面组件
import Register from './components/Register'; // 注册页面组件

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Routes>
    </Router>
  );
}

export default App;
