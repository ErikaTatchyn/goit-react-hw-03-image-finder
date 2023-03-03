import React, { Component } from 'react';
import axios from 'axios';

import Modal from './Modal/Modal';

import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    error: null,
    selectedImage: null,
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
    const API_KEY = '33063582-bd88d5aaf715a71a39133f1fd';
    const BASE_URL = 'https://pixabay.com/api/';
    const URL = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&page=${currentPage}&per_page=12`;

    this.setState({ isLoading: true });

    axios
      .get(URL)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          currentPage: prevState.currentPage + 1,
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
    const { images, isLoading, error, selectedImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onChangeQuery} />

        {error && <p>Oops! Something went wrong. Please try again later.</p>}

        {images.length > 0 && (
          <ImageGallery images={images} onSelect={this.handleSelectImage} />
        )}

        {isLoading && <Loader />}

        {images.length > 0 && !isLoading && (
          <Button onClick={this.fetchImages} />
        )}

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
