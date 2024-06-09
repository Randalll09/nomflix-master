import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovies, IGetMoviesResult } from '../api';
import { makeImgPath } from './utils';
import Slider from '../Components/Slider';
import { useMatch, useParams } from 'react-router';
import MovieModal from '../Components/MovieModal';
import { AnimatePresence } from 'framer-motion';

const Div = styled.div`
  height: 200vh;
  background-color: ${({ theme }) => theme.black.veryDark};
  color: #fff;
`;

const Banner = styled.div<{ bg: string }>`
  height: 100vh;
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${({ bg }) => bg});
  padding-bottom: 150px;
  background-position: center;
  background-size: cover;
`;

const Loader = styled.div`
  color: #fff;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 58px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 60vw;
`;
const Home = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ['movies', 'nowPlaying'],
    getMovies
  );
  const movieMatch = useMatch('/movies/:id');
  const params = useParams();
  return (
    <Div>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner bg={data ? makeImgPath(data.results[0].backdrop_path) : ''}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider data={data ? data.results : []} />
          <AnimatePresence>
            {movieMatch ? <MovieModal id={params.id ? params.id : ''} /> : null}
          </AnimatePresence>
        </>
      )}
    </Div>
  );
};

export default Home;
