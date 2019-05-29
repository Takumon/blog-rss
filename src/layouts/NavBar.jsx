import React from 'react';
import { Link } from 'gatsby';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Headroom from 'react-headroom';
import theme from '../../config/theme';
import logo from '../../static/logo/header-logo.png';
import LogoWhite from '../../static/logo/header-logo-white.png';


const StyledLink = styled(Link)`
  display: flex;
  font-weight: 700;
  align-items: center;

  img {
    margin: 1rem 0 1rem;
    height: 2rem;
    transition: ${theme.transitions.default};
    &:hover {
      opacity: 0.7;
    }

    @media (max-width: ${theme.breakpoints.s}) {
      margin: 5px;
    }
  }

  svg {
    margin: 1.5rem 0 1rem;
    height: 1.5rem;
    transition: ${theme.transitions.default};
    &:hover {
      opacity: 0.7;
    }

    @media (min-width: 769px) {
      g {
        fill: ${theme.colors.black.base};

        path {
          fill: ${theme.colors.black.base} !important;
        }
      }
    }

    @media (max-width: ${theme.breakpoints.s}) {
      margin: 5px;
    }
  }
`;

const navStyles = css`
  display: flex;
  justify-content: flex-end;
  font-weight: 700;
  align-items: center;
  margin-top: 0.5rem;
  margin-right: 0.75rem;

  @media (max-width: ${theme.breakpoints.s}) {
    display: none;
    margin-top: 0;
    margin-right: 0;
  }

  a {
    color: ${theme.colors.black.base};
    margin-left: 2rem;
    transition: all ${theme.transitions.default.duration};
    text-transform: uppercase;
    letter-spacing: ${theme.letterSpacing.medium};
    font-size: ${theme.fontSize.small};
    font-family: ${theme.fontFamily.heading};

    &:hover {
      color: ${theme.colors.white.grey};
    }
  }
`;

const showMenuStyles = css`
  @media (max-width: ${theme.breakpoints.s}) {
    display: block;
    position: fixed;
    padding: 1rem 0;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: ${theme.colors.white.base};
    animation: anime 0.3s ease;

    a {
      display: block;
      padding: 1rem 2rem;
      margin: 0;
    }

    @keyframes anime {
      0% {
        opacity: 0;
        transform: translateY(-10px);
      }
      100% {
        opacity: 100%;
        transform: translateY(0px);
      }
    }
  }
`;

const IconLink = styled.div`
  display: none;

  @media (max-width: ${theme.breakpoints.s}) {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 100;
  }

  span {
    margin: 1.5rem 0 1rem;
    color: ${props => props.headerWhite ? theme.colors.white.base : theme.colors.black.base};

    @media (max-width: ${theme.breakpoints.s}) {
      margin: 0;
    }
  }
`;
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: false };
  }

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }

  render() {
    const { showMenu } = this.state;
    const { headerWhite } = this.props;
    return (
      <Headroom calcHeightOnResize disableInlineStyles>
        <StyledLink to="/">
          {headerWhite ? <LogoWhite /> : <img src={logo} alt="Logo" />}
        </StyledLink>

        <nav css={[navStyles, showMenu && showMenuStyles]}>
          <Link to="/">Post</Link>
          <Link to="/member">Member</Link>
        </nav>
        <IconLink onClick={this.toggleMenu} headerWhite={headerWhite}>
          {showMenu ? <span className="material-icons">close</span> : <span className="material-icons">menu</span>}
        </IconLink>
      </Headroom>
    );
  }
}
