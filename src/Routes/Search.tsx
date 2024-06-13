import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useMatch, useParams, useNavigate } from 'react-router';

import styled from 'styled-components';
import { getSearch, IGetMoviesResult, IMovie } from '../api';
import { AnimatePresence, motion } from 'framer-motion';
import { makeImgPath } from './utils';
import SearchModal from '../Components/SearchModal';
import { useState } from 'react';

const Div = styled.div`
  > h1 {
    color: whitesmoke;
    margin-top: 100px;
    margin-left: 48px;
  }
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  padding: 48px;
`;

const MovieEl = styled(motion.div)<{ bg: string }>`
  cursor: pointer;
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
  const [clickedId, setClickedId] = useState(0);
  console.log(searchParams);
  const search = new URLSearchParams(searchParams).get('keyword');
  const navigate = useNavigate();

  const { data } = useQuery<IGetMoviesResult>(
    ['search', searchParams.get('keyword')],
    () => getSearch(search)
  );
  console.log(data);
  return (
    <Div>
      <h1>Search Results of "{search}"</h1>
      <Row>
        {data?.results.map((v) =>
          v.backdrop_path ? (
            <MovieEl
              key={v.id}
              bg={makeImgPath(v.backdrop_path, 'w500')}
              onClick={() => setClickedId(v.id)}
            >
              <p>{v.title ? v.title : v.name}</p>
            </MovieEl>
          ) : null
        )}
      </Row>
      <AnimatePresence>
        {clickedId > 0 ? (
          <div onClick={() => setClickedId(0)}>
            <SearchModal id={String(clickedId)} />
          </div>
        ) : null}
      </AnimatePresence>
    </Div>
  );
};

export default Search;
