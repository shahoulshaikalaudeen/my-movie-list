import React from 'react';
import { Movie } from '../types';
import { FaThumbsUp, FaThumbsDown, FaTrash } from 'react-icons/fa';

interface VideoCardProps {
  movie: Movie;
  onRemove: (id: number) => void;
  onLikeToggle: (id: number) => void;
  isLiked: boolean;
  categories: Record<number, string>;
}

const VideoCard: React.FC<VideoCardProps> = ({ movie, onRemove, onLikeToggle, isLiked, categories }) => {
  const handleLikeToggle = () => {
    onLikeToggle(movie.id);
  };

  const handleRemove = () => {
    onRemove(movie.id);
  };

  const genreNames = movie.genre_ids.map(id => categories[id]).join(', ');

  return (
    <div className="relative bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-full h-72 object-cover" />
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition"
        >
          <FaTrash />
        </button>
      </div>
      <div className="p-4 flex flex-col h-48">
        <h3 className="text-lg font-bold mb-2 truncate">{movie.title}</h3>
        <p className="text-sm text-gray-400 mb-2">{genreNames}</p>
        <div className="flex items-center mt-auto space-x-3">
          <button
            onClick={handleLikeToggle}
            className={`p-2 rounded-full ${isLiked ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-blue-700 transition`}
          >
            {isLiked ? <FaThumbsDown /> : <FaThumbsUp />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
