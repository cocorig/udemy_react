import React, {useState , useEffect} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movie , setMovie] = useState([])
  const [isLoading , setIsLoading] = useState(false);

async function fetchMoviesHandler(){
  setIsLoading(true); // 가져오기 기다리는 중.. 로딩 중~
  const response = await fetch('https://swapi.dev/api/films/');
  const data = await response.json();
  const transformMovies =  data.results.map((items)=> {
  return {
    id : items.episode_id,
    title : items.title,
    openingText: items.opening_crawl,
    releaseDate: items.release_date,
      };
    })
    setMovie(transformMovies) 
    setIsLoading(false); //로딩 중 아님~ 다 가져옴
  } 
console.log(isLoading);
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* 로딩 중이 아닐 때(isLoading이 false일 때, ! not연산자로 true가 되니까 뒤에 컴포넌트가 렌더링) MoviesList가 보여지게 하자 , 다 가져오면 렌더링 되게 */}
        {/* 받아온 데이터가 1개라도 있을 때 */}
        {!isLoading && movie.length > 0 &&  <MoviesList movies={movie}/>}
        {/* 가져왔는데 영화가 없다면 */}
        {!isLoading && movie.length === 0 && <strong>Found no movies.</strong>}
        {isLoading && <strong>Loading...</strong>}
      </section>
      
    </React.Fragment>
  );
}

export default App;

// 앞에께 false면 뒤에 실행
