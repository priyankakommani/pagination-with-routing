// import Album from './Components/Album';
// import Post from './Components/Post';
// import Todos from './Components/Todos';

// function App() {
//   const location = window.location.pathname;
//   console.log(location);

//   return (
//     <div className="App">
//       {location === "/Post" && <Post />}
//       {location === "/Todos" && <Todos />}
//       {location === "/Album" && <Album />}
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Album from './Components/Album';   
import Post from './Components/Post';
import Todos from './Components/Todos'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/post" element={<Post />} /> 
        <Route path="/album" element={<Album />} />
        <Route path="/todos" element={<Todos />} /> 
        <Route path="/" element={<Todos />} /> 
      </Routes>
    </Router>
  );
}

export default App;