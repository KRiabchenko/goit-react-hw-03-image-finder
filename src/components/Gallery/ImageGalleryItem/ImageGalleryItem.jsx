import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Li, Img } from './ImageGalleryItem.styled';
import { Modal } from '../../Modal/Modal';

export class ImageGalleryItem extends Component {
    state = {
        showModal: false,
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    };

    render() {
        const { webformatURL, tags, largeImageURL } = this.props.image;
        console.log();
        return (
            <Li>
                <Img src={webformatURL} alt={tags} onClick={this.toggleModal} />
                {this.state.showModal && (
                    <Modal
                        onClose={this.toggleModal}
                        imageUrl={largeImageURL}
                        imageTags={tags}
                    />
                )}
            </Li>
        );
    }
}

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }),
};
