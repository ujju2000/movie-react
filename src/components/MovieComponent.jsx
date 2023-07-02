import styled from 'styled-components';

const MovieContainer = styled.div`
  width : 280px;
  padding:  10px; 
  box-shadow: 0px 3px 10px 0 #aaa;
  margin : 30px 10px;
  cursor : pointer;
  display : flex;
  flex-direction : column;
  justify-contents : center;
`

const CoverImg = styled.img`
  height : 90%;
  background-color : black;
  object-fit : cover;
`

const MovieName = styled.h1`
  font-size : 18px;
  font-weight : bold;
  color : black;
  margin : 15px 0px;
  text-align: center;
  white-space : nowrap;
  text-overflow : ellipsis;
  overflow: hidden;
`

const InfoColumn = styled.div`
  display : flex;
  justify-content : space-between;
  align-items:center;
  font-size : 14px;
  text-transform: capitalize;
  color : #6B7280;
  
`
export default function MovieComponents(props) {
  const {Title, Year , Poster, Type, imdbID} = props.movie;
  return (
    
    <MovieContainer onClick = {() => props.onMovieSelect(imdbID)}>
        <CoverImg src = {Poster} />
        <MovieName>{Title} </MovieName>
        <InfoColumn>
            <h3>Year : {Year}</h3>
            <h3>Type : {Type}</h3>  
        </InfoColumn>
    </MovieContainer>
  )
}
