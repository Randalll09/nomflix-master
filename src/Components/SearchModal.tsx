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
  min-height: 80vh;
  border-radius: 15px;
`;
const Header = styled.header<{ bg: string }>`
  position: relative;
  width: 100%;
  height: 300px;
  background-position: center, center;
  background-size: cover, cover;
  padding: 48px;
  display: grid;

  background-image: url(${({ bg }) => bg});

  grid-template-columns: repeat(2, 1fr);
  &::after {
    z-index: 0;
    position: absolute;
    display: block;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.3;
  }
  > img {
    position: relative;
    z-index: 2;
    box-shadow: 10px 5px 5px #0000004c;
  }
`;
const Info = styled.div`
  position: relative;
  color: white;
  z-index: 2;
  h2 {
    text-align: center;
  }
`;

const InfoMore = styled.div`
  position: absolute;
  bottom: 48px;
  left: 48px;
  color: white;
  ul {
    display: flex;
    gap: 24px;
    li {
      display: block;
      border: 1px solid white;
      padding: 4px;
      border-radius: 4px;
    }
  }
`;

const SearchModal: React.FC<{ id: string }> = ({ id = '' }) => {
  const { data } = useQuery<IMovieInfo>(['movie', id], () => getMovieInfo(id));
  console.log(data);
  return (
    <>
      <Overlay animate={{ opacity: 1 }} exit={{ opacity: 0 }}></Overlay>
      {data ? (
        <Div layoutId={id} key={id}>
          <Header bg={makeImgPath(data.backdrop_path)}>
            <img src={makeImgPath(data.poster_path, 'w300')} />
            <Info>
              <h2>{data?.title}</h2>
              <p>{data.overview}</p>
            </Info>
          </Header>
          <InfoMore>
            {data.runtime ? <h3>Runtime: {data.runtime} min</h3> : null}
            {data.release_date ? (
              <h3>Release Date: {data.release_date.replaceAll('-', '. ')}</h3>
            ) : null}
            <h3>Genre</h3>
            <ul>
              {data.genres
                ? data.genres.map((v) => <li key={v.id}>{v.name}</li>)
                : null}
            </ul>
          </InfoMore>
        </Div>
      ) : null}
    </>
  );
};

export default SearchModal;
