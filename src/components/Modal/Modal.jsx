import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    };

    render() {
        const { imageUrl, imageTags } = this.props;
        return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
                <ModalWindow>
                    <img src={imageUrl} alt={imageTags} />
                </ModalWindow>
            </Overlay>,
            modalRoot
        );
    }
}

Modal.propTypes = {
    imageTags: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};
