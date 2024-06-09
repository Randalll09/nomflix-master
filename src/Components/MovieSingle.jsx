const MovieEl = styled(motion.div)`
  background-color: ${({ theme }) => theme.black.lighter};
  height: 150px;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  > img {
    height: 150px;
    width: 100%;
    display: block;

    object-fit: cover;
  }
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  background-color: ${({ theme }) => theme.black.lighter};
  width: 100%;
  height: 0px;
  overflow: hidden;
  > h4 {
    text-align: center;
    font-size: 16px;
  }
`;

const MovieSingle = ({ title, bg, img }) => {
  return (
    <MovieEl>
      <img />
      <Info></Info>
    </MovieEl>
  );
};

export default MovieSingle;
