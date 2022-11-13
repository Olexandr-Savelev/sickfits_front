import styled from 'styled-components';

const PaginationStyles = styled.div`
  margin: 1rem auto;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  width: fit-content;
  border: 1px solid var(--lightGrey);
  border-radius: 10px;
  font-weight: 500;
  p {
    @media (max-width: 700px) {
      display: none;
    }
  }
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid var(--lightGrey);
    &:last-child {
      border-right: 0;
    }
    @media (max-width: 700px) {
      padding: 7px 15px;
    }
  }
  a:hover {
    text-decoration: underline;
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`;

export default PaginationStyles;
