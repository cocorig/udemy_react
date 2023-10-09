/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState , useEffect, useCallback} from 'react';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

// try(코드 실행 시도) - catch(잠재적인 오류 포착)
function App() {
  const url = process.env.REACT_APP_URL;
  console.log(url);
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
    // GET
    const response = await fetch('url'); //firebase의 요구사항으로 ,요청을 전달하려는 UPL끝에 .json을 추가해야함 , 그렇지않으면 요청 실패
    
    if(!response.ok){
      throw new Error('오류 발생')
    }
    const data = await response.json();
    console.log(data) // 객체 , 암호화된 ID가 key이고 , 실제 데이터는 중첩된 객체
 
    const loadedMovieds = [];

    for(const key in data){// key는 객체 
      loadedMovieds.push({
        id : key,
        title : data[key].title,
        openingText  : data[key].openingText,
        releaseDate : data[key].releaseDate,
      });
    }
      console.log(loadedMovieds);
      setMovie(loadedMovieds) 
  
    } catch(error){
      setError(error.message)
    }

    setIsLoading(false); // 로딩 끝
  } ,[])

  useEffect(()=>{
    fetchMoviesHandler()
  },[fetchMoviesHandler]); 
  // 이 의존성 배열에 함수가 변경되면 useEffect재실행 , fetchMoviesHandler는 함수이고 객체이기때문에 컴포넌트가 재렌더링 될때마다 함수가 바뀐다. 즉 이 함수를 의존성 배열에 추가하면 무한 루프가 발생- > useCallback함수를 사용해 함수를 감쌈

  // 따라서 함수였던 걸 상수형태로 변경 constfetchMoviesHandler =  usecallback(()=> ...)
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
  // 요청 전송 POST , 요청을 가져오는 리소스에 반대로 요청을 보냄 ,
 async function addMovieHandler(movie){
   const response = await fetch('url',{
      method : 'POST', //리소스 생성
      body : JSON.stringify(movie),// 저장해야 하는 리소스 생성, body는 JSON데이터를 필요로 함 , stringify를 사용해서 자스 객체나 배열을 JSON형식으로 바꿔준다.
      headers:{ // 헤더를 통해 어떤 컨텐츠가 전달되는지 알수있다.
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
  
  }
  // 상태에 따른 메세지 변경
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
      
    </React.Fragment>
  );
}

export default App;

// 앞에께 false면 뒤에 실행
