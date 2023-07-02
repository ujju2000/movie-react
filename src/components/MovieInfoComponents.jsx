import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';

const API_KEY =  "68f34a44";
const Container = styled.div`
    padding : 20px;
    display : flex;
    justify-content : flex-start;
    border-bottom : 1px solid lightgray;
    @media(max-width : 800px) {
        flex-direction : column;
        align-items:center;
        justify-content: center;
    }
`
const Poster = styled.img`
    width : 280px;
    object-fit : cover;
    margin : 10px;
    @media (max-width : 800px ){
        margin-bottom : 40px;
    }
`
const MovieName = styled.span`
    font-size : 18px;
    font-weight : bold;
    color : black;
    margin : 15px 0px;
    text-transform : capitalize;
`   
const MovieInfo = styled.div`
    font-weight: 700;
    margin : 10px 0;
    & span {
        font-size : 14px;
        text-transform: capitalize;
        color : #6B7280;
        font-weight: 500;
    }
`
const Close = styled.div`
    height : 30px;
    width : 30px;
    font-size : 20px;
    border-radius : 50%;
    background-color : lightgrey;
    color : black;
    cursor : pointer;
    display: flex;
    justify-content: center;
    align-items : center;
`

export default function MovieInfoComponents(props) {
    const [movieInfo , setMovieInfo] = useState();
    const [closeMovie , setCloseMovie] = useState(false);
    const {selectedMovie} = props;
    useEffect(() => {

        axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
        .then((response) =>setMovieInfo(response.data))
        setCloseMovie(false);
    }, [selectedMovie]);
    
  return (
     
        !closeMovie && 
    <Container>
        <Poster src = {movieInfo?.Poster} />
        <div>
            <MovieName>{movieInfo?.Type} : {movieInfo?.Title} </MovieName>
            <MovieInfo>IMDB Rating : {movieInfo?.imdbRating} </MovieInfo>
            <MovieInfo>
              Year: <span>{movieInfo?.Year}</span>
            </MovieInfo>
            <MovieInfo>
              Language: <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              Rated: <span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime: <span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director: <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors: <span>{movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              Plot: <span>{movieInfo?.Plot}</span>
            </MovieInfo>
        </div>
        <Close onClick = {() => setCloseMovie(true)}>X</Close>
    </Container>
    )
}
