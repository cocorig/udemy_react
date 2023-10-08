import React, {useState , useEffect} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

// try(코드 실행 시도) - catch(잠재적인 오류 포착)
function App() {
  const [movie , setMovie] = useState([])
  const [isLoading , setIsLoading] = useState(false);
  const [error , setError] = useState(null);
  // 
async function fetchMoviesHandler(){
  try{
    setIsLoading(true); // 가져오기 기다리는 중.. 로딩 중~
    setError(null)
    const response = await fetch('https://swapi.dev/api/films/');
    //body 부분을 파싱하기 전에 response의 응답이 ok인지 확안
    if(!response.ok){
      throw new Error('오류 발생')
    }
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
  
    } catch(error){ // 위 코드에 error 캐치
      // fetch API는 에러 상태 코드를 실제 에러로 취급x, 실제ㅡ에러를 받아도 실제 에러로 취급하지 않는다. -> 직접 만들자
      setError(error.message)
    }
    // error나면 로딩할 필요 x //로딩 중 아님~ 다 가져옴
    setIsLoading(false); // 로딩 끝
  }


  let content = <strong>Found no movies.</strong>

  if(error){
    content = <strong>{error}</strong>
  }
  if(movie.length > 0){
    content =  <MoviesList movies={movie}/>
  }
  if(isLoading){
    content  =  <strong>Loading...</strong>
  }
  // 상태에 따른 메세지 변경
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* 로딩 중이 아닐 때(isLoading이 false일 때, ! not연산자로 true가 되니까 뒤에 컴포넌트가 렌더링) MoviesList가 보여지게 하자 , 다 가져오면 렌더링 되게 */}
        {/* 받아온 데이터가 1개라도 있을 때 */}
        {/* {!isLoading && movie.length > 0 &&  <MoviesList movies={movie}/>}
        {/* 가져왔는데 영화가 없다면, 에러발생 했을 땐 숨기기 */}
        {/* {!error && !isLoading && movie.length === 0 && <strong>Found no movies.</strong>}
        {!isLoading && error && <strong>{error}</strong>}
        {isLoading && <strong>Loading...</strong>} */}
          {content}
      </section>
      
    </React.Fragment>
  );
}

export default App;

// 앞에께 false면 뒤에 실행
