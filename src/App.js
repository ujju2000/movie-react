import styled from 'styled-components';
import MovieComponent from './components/MovieComponent';
import {useState} from 'react';
import axios from 'axios';
import MovieInfoComponents from './components/MovieInfoComponents';
const API_KEY =  "68f34a44";

const Container = styled.div`
  display : flex;
  flex-direction :column;
  
`
const Header = styled.div`
  display : flex;
  background-color : green;
  padding : 10px;
  color : white;
  font-size : 15px;
  font-weight :  bold;
  justify-content : space-between;
  align-items : center;
`
const Logo = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
`
const Icon = styled.img`
  width : 40px;
  height : 40px;
  margin : 15px;
  border-radius : 50%;
  @media(max-width : 500px) {
    height : 20px;
    width : 20px;
  }
`

const SearchBox = styled.div`
  margin-right : 30px;
  background-color : white;
  color: black;
  width : 60%;
  height : 70%;
  display: flex;
  align-items: center;
  border-radius : 10px;
`
const SearchInput = styled.input`
  width : 80%;
  outline : none;
  padding : 10px;
  font-size : 15px;
  border: none;
  border-bottom : 1px solid grey;
  @media (max-width :500px) {
    font-size : 12px;
    padding : 5px;
    width : 60%;
  }
`

const MovieListContainer = styled.div`
  display : flex;
  flex-wrap: wrap;
  padding : 30px;
  justify-content : space-evenly;
  
`
const MainImg = styled.img`
  height : 300px;
  width : 400px;
  display: flex;
  justify-content : center;
  align-items : center;
  object-fit : cover;

`
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [timeoutId , setTimeoutId] = useState();
  const [movieList , updateMovieList] = useState([]);
  const [selectedMovie , onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    console.log(response.data.Response);
    
    if(response.data.Response === 'True') 
    {
      
      updateMovieList(response.data.Search);
    }else {
      updateMovieList([]);
    }
   
  }
  
  const handleChange = (event) => {
    clearTimeout(timeoutId);
    setSearchInput(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value) , 500);
    setTimeoutId(timeout);
  }
  
  return (
    <Container >
      <Header>
        <Logo>
          <Icon src='assets/logo.jpg' />
          React Movie App
        </Logo>
        <SearchBox>
          <Icon src='assets/search.png' />
          <SearchInput placeholder = 'Search for Movie/webSeries' value = {searchInput} onChange = {handleChange} />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponents selectedMovie = {selectedMovie}/>}
      
      <MovieListContainer>
        
        { 
          movieList.length > 0 ? movieList.map((movie, index) => <MovieComponent 
            key = {index}
            movie = {movie}
            onMovieSelect = {onMovieSelect}
            />
        ) : <MainImg src = 'assets/main.jpg' />
        }

      </MovieListContainer>

    </Container>
  );
}

export default App;
