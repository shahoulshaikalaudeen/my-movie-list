import React, { useState, useEffect } from 'react';
import { fetchMovies, fetchCategories } from '../api';
import { Movie, Category } from '../types';
import VideoCard from './VideoCard';
import Pagination from './Pagination';
import CategoryFilter from './CategoryFilter';

const VideoList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [likedMovies, setLikedMovies] = useState<Set<number>>(new Set());
  const [allSelected, setAllSelected] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    fetchMovies(currentPage, itemsPerPage).then(response => {
      setMovies(response.data.results);
      setFilteredMovies(response.data.results);
    });

    fetchCategories().then(response => {
      setCategories(response.data.genres);
    });
  }, [currentPage, itemsPerPage]);

  const handleRemove = (id: number) => {
    setMovies(movies.filter(movie => movie.id !== id));
    setFilteredMovies(filteredMovies.filter(movie => movie.id !== id));
  };

  const handleLikeToggle = (id: number) => {
    setLikedMovies(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(id)) {
        newLikes.delete(id);
      } else {
        newLikes.add(id);
      }
      return newLikes;
    });
  };

  const handleFilterChange = (selectedCategories: number[]) => {
    if (allSelected) {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter(movie => 
        selectedCategories.length === 0 || selectedCategories.some(cat => movie.genre_ids.includes(cat))
      ));
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories(prev => {
      const newSelected = [...prev];
      if (newSelected.includes(categoryId)) {
        newSelected.splice(newSelected.indexOf(categoryId), 1);
      } else {
        newSelected.push(categoryId);
      }
      return newSelected;
    });
  };

  const handleAllToggle = () => {
    if (allSelected) {
      setAllSelected(false);
      setSelectedCategories([]);
      setFilteredMovies(movies);
    } else {
      setAllSelected(true);
      setSelectedCategories([]);
      setFilteredMovies(movies);
    }
  };

  useEffect(() => {
    handleFilterChange(selectedCategories);
  }, [selectedCategories, allSelected]);

  const activeCategories = categories.filter(category =>
    movies.some(movie => movie.genre_ids.includes(category.id))
  );

  const categoryMap = Object.fromEntries(activeCategories.map(cat => [cat.id, cat.name]));

  return (
    <div className="container mx-auto p-4">
      <CategoryFilter 
        categories={activeCategories} 
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        allSelected={allSelected} 
        onAllToggle={handleAllToggle} 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map(movie => (
          <VideoCard
            key={movie.id}
            movie={movie}
            onRemove={handleRemove}
            onLikeToggle={handleLikeToggle}
            isLiked={likedMovies.has(movie.id)}
            categories={categoryMap}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        totalItems={movies.length}
      />
    </div>
  );
};

export default VideoList;
