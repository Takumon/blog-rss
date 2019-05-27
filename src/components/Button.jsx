import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import theme from '../../config/theme';
const scrollToElement = require('scroll-to-element');

const ButtonLink = styled(Link)`
  color: ${theme.colors.primary.base};
  border: 2px solid ${theme.colors.primary.base};
  letter-spacing: ${theme.letterSpacing.medium};
  text-transform: uppercase;
  font-family: ${theme.fontFamily.heading};
  font-size: ${theme.fontSize.medium};
  display: inline-block;
  min-width: ${props => props.size === 'small' ? '10rem' : '18rem' };
  border-radius: 3px;
  padding: 1rem;
  text-align: center;
  position: relative;
  overflow:hidden;
  transition: ${theme.transitions.default};
  z-index: 1;

  &:before {
    position: absolute;
    transition: ${theme.transitions.default};
    content: '';
    width: 0;
    left: 50%;
    bottom: 0;
    height: 3px;
    background: ${theme.colors.primary.base};
    height: 120%;
    left: -10%;
    transform: skewX(15deg);
    z-index: -1;
  }

  &:hover {
    cursor: pointer;
    color: ${theme.colors.white.base};
    &:before {
      width: 100%;
      left: 0;
      left: -10%;
      width: 120%;
    }
  }
`;

const handleLinkClick = (e, target, handleClick) => {
  e.preventDefault();
  scrollToElement(target, {
    offset: -80,
    duration: 1000,
  });
  handleClick();
}

const Button = ({ title, to, size, handleClick }) => 
  to.slice(0, 1) === '#'
    ? <ButtonLink
        onClick={e => handleLinkClick(e, to, handleClick)}
        to={`/${to}`}
        size={size}>{title}</ButtonLink>
    : <ButtonLink
        onClick={handleClick}
        to={to}
        size={size}>{title}</ButtonLink>;

export default Button;

Button.propTypes = {
  key: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string,
};
