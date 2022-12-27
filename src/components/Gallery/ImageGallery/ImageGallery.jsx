import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { Button } from '../../Button/Button';

function smoothScroll() {
  const cardHeight = document
    .querySelector('ul')
    .firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export class ImageGallery extends Component {
  state = {
    query: '',
    images: [],
    totalHits: 0,
    isLoading: false,
    page: 1,
    error: false,
    visibleBtn: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.formQuery;
    const nextQuery = this.props.formQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const { images, visibleBtn, totalHits, query } = this.state;
    const prevStateQuery = prevState.query;

    if (prevQuery !== nextQuery) {
      this.setState(prev => ({
        ...prev,
        images: [],
        page: 1,
        query: this.props.formQuery,
      }));
    }

    if (prevStateQuery !== query || (prevPage !== nextPage && nextPage !== 1)) {
      try {
        this.setState({ isLoading: true });
        console.log('query -', nextQuery, '   page - ', nextPage);
        const imageList = await getImages(nextQuery, nextPage);
        if (imageList.totalHits === 0) {
          alert('Images not found');
        }
        this.setState(
          state => ({
            images: [...state.images, ...imageList.hits],
            isLoading: false,
            totalHits: imageList.totalHits,
          }),
          () => {
            if (nextPage !== 1) {
              smoothScroll();
            }
          }
        );
      } catch (error) {
        this.setState({ error: true, isLoading: false });
        console.log(error);
      }
    }

    if (images.length !== 0 && !visibleBtn && images.length < totalHits) {
      this.setState({ visibleBtn: true });
    } else if (images.length >= totalHits && visibleBtn) {
      this.setState({ visibleBtn: false });
    }
  }

  onClickLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, visibleBtn } = this.state;

    return (
      <>
        <ImageGalleryList>
          {images.map(image => (
            <ImageGalleryItem image={image} key={image.id} />
          ))}
        </ImageGalleryList>
        {isLoading && <Loader />}
        {visibleBtn && <Button onClick={this.onClickLoadMoreBtn} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  formQuery: PropTypes.string.isRequired,
};
