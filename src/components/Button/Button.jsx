import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, isHidden = false }) => {
  return (
    <>
      {!isHidden && (
        <button type="button" className={styles.button} onClick={onClick}>
          Load more
        </button>
      )}
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isHidden: PropTypes.bool,
};

export default Button;
