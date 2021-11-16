import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react"
function App() {

const [movies, setMovies] = useState([])
const [formData, setFormData] = useState({
  title: "", 
  description: ""
})


useEffect(() => {
  fetch("http://localhost:3001/movies")
  .then(resp => resp.json())
  .then(setMovies)
}, [])

const addMovie = async (movieInfo) => {

  let params = {
    movie: {
      title: movieInfo.title,
      description:  movieInfo.description
    }
  }
  let resp = fetch("http://localhost:3001/movies", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
  let movieData = await resp.json()
  setMovies([...movies, movieData])

}


const deleteMovie = async (id) => {
  let resp = await fetch(`http://localhost:3001/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
  setMovies(prev => {
    return prev.filter(movie => movie.id !== id)
  })
}

  return (
    <div>
        <h1>Movies</h1>

       {movies.map(movie => {
        return (
          <div>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <button onClick={() => deleteMovie(movie.id)}>x</button>
          </div>
        )
      })}

        <br></br>
        <br></br>
        <h2>Movies Form</h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          addMovie(formData)
          }}>
          <input onChange={(e) => setFormData({
            ...formData,
            title: e.target.value
          })} value={formData.title}/>
          <input onChange={(e) => setFormData({
            ...formData,
            description: e.target.value
          })}value={formData.description}/>
          <button>Create Movie</button>
        </form>
    </div>
  );
}

export default App;
