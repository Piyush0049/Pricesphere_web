import styled, { keyframes } from "styled-components";

const popIn = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  80% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
`;

const HoverCard = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 0.5rem;
  width: 20rem;
  background: linear-gradient(to right, #2d2d2d, #3e3e3e);
  border: 1px solid #3e3e3e;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 0.75rem;
  padding: 1.5rem;
  color: #fff;
  z-index: 20;
  transition: all 0.3s ease-in-out 0.1s;
  animation: ${popIn} 0.3s ease-in-out;
`;
