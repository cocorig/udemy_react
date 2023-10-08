import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movie , setMovie] = useState([])
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
  // then-> async , await (단순 코드 변환, 똑깉은 작업, 앞에서 미리 선언, 가독성)
async function fetchMoviesHandler(){

  const response = await fetch('https://swapi.dev/api/films/');
  const data = await response.json();
  // js객체로 전달된 데이터를 반환하기 전에 props로 넘겨줄 키 이름을 바꿔줌
  const transformMovies =  data.results.map((items)=> {
  return { // 한 줄 한줄 객체를 리턴함
    id : items.episode_id,
    title : items.title,
    openingText: items.opening_crawl,
    releaseDate: items.release_date,
      };
    })
    setMovie(transformMovies) // 새로운 data 배열
  }

  return (
    <React.Fragment>
      <section>
        {/* 버튼이 클릭될 때마다 영화 정보를 가져옴 */}
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section> 
        {/* 그 결과를 화면에 보여줌 */}
        <MoviesList movies={movie} />
      </section>
    </React.Fragment>
  );
}

export default App;
