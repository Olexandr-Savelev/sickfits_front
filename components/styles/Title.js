import styled from 'styled-components';

const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  transform: skew(-5deg) rotate(-1deg);
  margin-top: -3rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: var(--red);
    display: inline;
    line-height: 1.3;
    font-size: 4rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
    transition: box-shadow 0.3s ease-in-out;
    @media (max-width: 900px) {
      font-size: 3.5rem;
    }
    @media (max-width: 475px) {
      font-size: 2rem;
    }
    &:hover {
      box-shadow: var(--bs-title);
    }
  }
`;

export default Title;
