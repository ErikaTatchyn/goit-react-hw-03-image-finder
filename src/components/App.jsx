import React, { useState, useEffect } from 'react';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { fetchImages } from '../Api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    if (searchQuery !== '') {
      fetchImages(searchQuery, currentPage)
        .then(response => {
          setImages(prevImages => [...prevImages, ...response.hits]);
          setCurrentPage(prevPage => prevPage + 1);
          setTotalPages(Math.ceil(response.totalHits / 12));
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(false));
    }
  }, [searchQuery, currentPage]);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  };

  const handleSelectImage = image => {
    setSelectedImage(image);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  const showLoadMore = currentPage <= totalPages && images.length > 0;

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />

      {error && <p>Oops! Something went wrong. Please try again later.</p>}

      {images.length > 0 && (
        <ImageGallery images={images} onSelect={handleSelectImage} />
      )}

      {isLoading && <Loader />}

      {showLoadMore && (
        <Button onClick={() => setCurrentPage(prevPage => prevPage + 1)} />
      )}

      {selectedImage && (
        <Modal onClose={handleModalClose}>
          <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
        </Modal>
      )}
    </div>
  );
}

export default App;
