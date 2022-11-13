import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Dot = styled.div`
  color: white;
  background-color: red;
  padding: 0.3rem 0.4rem;
  border-radius: 50%;
  line-height: 100%;
  margin-left: 0.3rem;
  font-size: 0.9rem;
  @media (max-width: 500px) {
    position: absolute;
    font-size: 0.7rem;
    margin-left: 0;
    padding: 0.2rem;
  }
`;

const AnimaionStyles = styled.span`
  position: relative;
  @media (max-width: 500px) {
    margin-left: -7px;
  }
  .count {
    display: block;
    position: relative;
    transition: transform 0.4s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    background-color: pink;
    transform: scale(4) rotateX(0.5turn);
  }
`;

const CartDot = ({ count }) => {
  if (!count || count === 0) return null;

  return (
    <AnimaionStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          className="count"
          classNames="count"
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimaionStyles>
  );
};

CartDot.propTypes = {
  count: PropTypes.number,
};

export default CartDot;
