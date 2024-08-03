import React from 'react';
import VideoList from './components/VideoList';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Movie Listing</h1>
      <VideoList />
    </div>
  );
};

export default App;
