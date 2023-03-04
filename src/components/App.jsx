import React, { Component } from 'react';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { fetchImages } from '../Api';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    error: null,
    selectedImage: null,
    totalPages: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;

    this.setState({ isLoading: true });

    fetchImages(searchQuery, currentPage)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          currentPage: prevState.currentPage + 1,
          totalPages: Math.ceil(response.totalHits / 12),
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSelectImage = image => {
    this.setState({ selectedImage: image });
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, isLoading, error, selectedImage, currentPage, totalPages } =
      this.state;

    const showLoadMore = currentPage <= totalPages && images.length > 0;

    return (
      <div>
        <Searchbar onSubmit={this.onChangeQuery} />

        {error && <p>Oops! Something went wrong. Please try again later.</p>}

        {images.length > 0 && (
          <ImageGallery images={images} onSelect={this.handleSelectImage} />
        )}

        {isLoading && <Loader />}

        {showLoadMore && <Button onClick={this.fetchImages} />}

        {selectedImage && (
          <Modal onClose={this.handleModalClose}>
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
