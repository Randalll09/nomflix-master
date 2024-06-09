import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { getMovieInfo, IMovieInfo } from '../api';
import { makeImgPath } from '../Routes/utils';

const Overlay = styled(motion.div)`
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  opacity: 0;
`;

const Div = styled(motion.div)`
  top: 10vh;
  left: 30vw;
  position: fixed;
  background-color: ${({ theme }) => theme.black.lighter};
  width: 40vw;
  height: 80vh;
  border-radius: 15px;
`;
const Header = styled.header<{ bg: string }>`
  width: 100%;
  height: 300px;
  background-position: center, center;
  background-size: cover, cover;
  padding: 48px;
  display: grid;
  background-image: url(${({ bg }) => bg});

  background-image: linear-gradient(rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1)),
    url(${({ bg }) => bg});
  grid-template-columns: repeat(2, 1fr);
  > img {
    box-shadow: 10px 5px 5px #0000004c;
  }
`;
const Info = styled.div`
  h2 {
    text-align: center;
  }
`;

const MovieModal: React.FC<{ id: string }> = ({ id = '' }) => {
  const { data } = useQuery<IMovieInfo>(['movie', id], () => getMovieInfo(id));
  const navigate = useNavigate();
  return (
    <>
      <Overlay
        onClick={() => navigate('/')}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></Overlay>
      <Div layoutId={id} key={id}>
        {data ? (
          <Header bg={makeImgPath(data.backdrop_path)}>
            <img src={makeImgPath(data.poster_path, 'w300')} />
            <Info>
              <h2>{data?.title}</h2>
              <p>{data.overview}</p>
            </Info>
          </Header>
        ) : null}
      </Div>
    </>
  );
};

export default MovieModal;
