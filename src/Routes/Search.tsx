import { useQuery } from 'react-query';
import { useSearchParams, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getSearch, IGetMoviesResult, IMovie } from '../api';
import { motion } from 'framer-motion';
import { makeImgPath } from './utils';

const Div = styled.div``;
const Row = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  padding: 48px;
`;

const MovieEl = styled(motion.div)<{ bg: string }>`
  height: 200px;
  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${({ bg }) => bg});
  background-position: center;
  background-size: cover;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: end;
  > p {
    color: #fff;
    text-align: right;
    font-size: 18px;
  }
`;

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('keyword'));
  const search = new URLSearchParams(searchParams).get('keyword');
  const { data } = useQuery<IGetMoviesResult>(
    ['search', searchParams.get('keyword')],
    () => getSearch(search)
  );
  console.log(data);
  return (
    <Div>
      <Row>
        {data?.results.map((v) =>
          v.backdrop_path ? (
            <MovieEl key={v.id} bg={makeImgPath(v.backdrop_path, 'w500')}>
              <p>{v.title ? v.title : v.name}</p>
            </MovieEl>
          ) : null
        )}
      </Row>
    </Div>
  );
};

export default Search;
