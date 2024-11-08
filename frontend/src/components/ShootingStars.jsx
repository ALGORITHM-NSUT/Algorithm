import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for the animation
const move = keyframes`
    100% {
        transform: translate3d(0, 0, 1px) rotate(360deg);
    }
`;

// Styled component for the background container
const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #1a1c41;
  overflow: hidden;
`;

// Styled component for the span elements
const Span = styled.span`
  width: 20vmin;
  height: 20vmin;
  border-radius: 20vmin;
  backface-visibility: hidden;
  position: absolute;
  animation: ${move} 45s linear infinite;
  color: #3b56e2;
`;

const BackgroundAnimation = () => {

  useEffect(() => {
    // Any logic related to animation can be added here if needed
  }, []);

  return (
    <Background>
      <Span style={{ top: '32%', left: '19%', animationDuration: '39s', animationDelay: '-39s', transformOrigin: '20vw -12vh', boxShadow: '-40vmin 0 5.26158161376809vmin currentColor' }} />
      <Span style={{ top: '37%', left: '65%', animationDuration: '35s', animationDelay: '-22s', transformOrigin: '-1vw 16vh', boxShadow: '40vmin 0 5.838378242886056vmin currentColor' }} />
      <Span style={{ top: '73%', left: '95%', animationDuration: '7s', animationDelay: '-11s', transformOrigin: '-23vw -14vh', boxShadow: '-40vmin 0 5.493842634057567vmin currentColor' }} />
      <Span style={{ top: '91%', left: '17%', animationDuration: '15s', animationDelay: '-48s', transformOrigin: '16vw 25vh', boxShadow: '40vmin 0 5.021850846458694vmin currentColor' }} />
      <Span style={{ top: '20%', left: '2%', animationDuration: '13s', animationDelay: '-40s', transformOrigin: '-2vw -21vh', boxShadow: '-40vmin 0 5.637209267696471vmin currentColor' }} />
      <Span style={{ top: '76%', left: '64%', animationDuration: '33s', animationDelay: '-6s', transformOrigin: '10vw 21vh', boxShadow: '-40vmin 0 5.178394971003764vmin currentColor' }} />
      <Span style={{ top: '97%', left: '76%', animationDuration: '22s', animationDelay: '-34s', transformOrigin: '16vw 24vh', boxShadow: '-40vmin 0 5.15562522498357vmin currentColor' }} />
      <Span style={{ top: '25%', left: '69%', animationDuration: '49s', animationDelay: '-19s', transformOrigin: '1vw 21vh', boxShadow: '-40vmin 0 5.4914840560577005vmin currentColor' }} />
      <Span style={{ top: '77%', left: '74%', animationDuration: '43s', animationDelay: '-7s', transformOrigin: '1vw 9vh', boxShadow: '40vmin 0 5.667022765877631vmin currentColor' }} />
      <Span style={{ top: '23%', left: '15%', animationDuration: '16s', animationDelay: '-47s', transformOrigin: '-21vw -24vh', boxShadow: '-40vmin 0 5.716188516832082vmin currentColor' }} />
      <Span style={{ top: '11%', left: '13%', animationDuration: '22s', animationDelay: '-7s', transformOrigin: '6vw -17vh', boxShadow: '-40vmin 0 5.969147357204657vmin currentColor' }} />
      <Span style={{ top: '18%', left: '47%', animationDuration: '31s', animationDelay: '-32s', transformOrigin: '-3vw -21vh', boxShadow: '-40vmin 0 5.661889293473944vmin currentColor' }} />
      <Span style={{ top: '29%', left: '94%', animationDuration: '16s', animationDelay: '-9s', transformOrigin: '24vw -4vh', boxShadow: '-40vmin 0 5.54481555283728vmin currentColor' }} />
    </Background>
  );
};

export default BackgroundAnimation;
