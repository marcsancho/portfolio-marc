import React from 'react';
import { HeaderContainer, LogoLink, Logo, TitleContainer, Name, Subtitle } from './Header.styles';
import icon from '../../../assets/images/icon.png';

const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <HeaderContainer>
      <LogoLink onClick={scrollToTop}>
        <Logo src={icon} alt="Marc Sancho Logo" />
        <TitleContainer>
          <Name>Marc Sancho</Name>
          <Subtitle>Frontend Developer</Subtitle>
        </TitleContainer>
      </LogoLink>
    </HeaderContainer>
  );
};

export default Header;
