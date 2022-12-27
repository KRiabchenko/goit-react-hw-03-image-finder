import PropTypes from 'prop-types';

import { ButtonEl, ButtonBox } from './Button.styled';

export const Button = ({ onClick }) => {
    return (
        <ButtonBox>
            <ButtonEl onClick={onClick}>Load More</ButtonEl>
        </ButtonBox>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};
