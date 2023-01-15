import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';

function App() {
  return (
    <Routes>
      <Route path="/meme/:id" element={<PostPage />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
