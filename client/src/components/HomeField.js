import React, { Component } from 'react'
import sportsing from './sportsing2.jpg'

class HomeField extends Component {

  render() {
    const imgStyle = {
        width: "45%",
        margin: "20px",
        borderRadius: "300px"
      }
      const sportsStyle = {
        fontSize: "30px",
        fontWeight: "bold",
        margin: "0px"
      }
    return (
        <div>
          <img src={sportsing} style={imgStyle} alt="Sports!"/>
          <p style={sportsStyle}>Cheer Your Favorite Teams and Players to Victory!</p>
        </div>
    )
  }
}
    export default HomeField