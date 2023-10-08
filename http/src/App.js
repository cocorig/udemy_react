/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState , useEffect, useCallback} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

// try(코드 실행 시도) - catch(잠재적인 오류 포착)
function App() {
  const [movie , setMovie] = useState([])
  const [isLoading , setIsLoading] = useState(false);
  const [error , setError] = useState(null);
  // 

 // useCallback으로 함수를 상수로 선언할 때 주의해야 할 점!!
  // useCallback으로 상수에 넣기 전에는 함수였기 때문에 호이스팅이 되어서 useEffect가 이 선언문보다 위에 있을 수 있었지만
  // 상수로 변경된 뒤로는 함수의 호이스팅이 적용되지 않으므로 해당 함수를 사용하기 전에 선언해야 한다는 것
  // -> 이제 fetchMoviesHandler가 불필요하게 재생성되는 걸 막음
const fetchMoviesHandler = useCallback(async() =>{
  setIsLoading(true); 
  setError(null)
  try{

    const response = await fetch('https://swapi.dev/api/films/');
    
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
  
    } catch(error){
      setError(error.message)
    }

    setIsLoading(false); // 로딩 끝
  } ,[])

  useEffect(()=>{
    fetchMoviesHandler()
  },[fetchMoviesHandler]); // 컴포넌트가 재 렌더링될 때마다 함수가 바뀜, 무한 루프에 빠짐 -> 해결책 (useCallback)

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
          {content}
      </section>
      
    </React.Fragment>
  );
}

export default App;

// 앞에께 false면 뒤에 실행
