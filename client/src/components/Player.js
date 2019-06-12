import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Player extends Component {

    state = {
            player: {
                stats: []
            }
    }

    componentDidMount() {
        const playerId = this.props.match.params.id;
        this.fetchPlayer(playerId)
    }

    fetchPlayer = async (playerId) => {
        try {
            const playerResponse = await axios.get(`/api/v1/players/${playerId}`)
            this.setState({
                player: playerResponse.data
                // songs: playerResponse.data.songs,
            })
        }
        catch (error) {
            console.log(error)
            this.setState({error: error.message})
        }
    }

    deletePlayer = () => {
        axios.delete(`/api/v1/players/${this.props.match.params.id}`).then(res => {
            this.setState({redirectToHome: true})
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }
  
    handleChange = (e) => {
        const clonePlayer = {...this.state.player}
        clonePlayer[e.target.name] = e.target.value
        this.setState({team: clonePlayer})
    }
  
    updatePlayer = (e) => {
        e.preventDefault()
        axios
          .put(`/api/v1/players/${this.props.match.params.id}/`, this.state.player)
          .then(res => {
              this.setState({player: res.data, isEditFormDisplayed: false})
          })
    }

    render() {

        if(this.state.redirectToHome) {
            return (<Redirect to="/players" />)
        }

        const logoStyle = {
            display: "inline-block",
            margin: "10px",
            height: "200px"
        }

        return (

            <div>
        {
            this.state.isEditFormDisplayed
                ? <div><h1>Change to {this.state.player.playerName}</h1>
                <div><img src={this.state.player.player_photo_url} alt='' style={logoStyle}/></div>
                <form onSubmit={this.updatePlayer}>
                <div>
                        <label htmlFor="playerName">Player Name: </label>
                        <textarea
                            id="playerName"
                            type="text"
                            name="playerName"
                            onChange={this.handleChange}
                            value={this.state.newPlayer.playerName}
                        />
                    </div>
                    <div>
                        <label htmlFor="player_photo_url">Photo URL: </label>
                        <textarea
                            id="player_photo_url"
                            type="text"
                            name="player_photo_url"
                            onChange={this.handleChange}
                            value={this.state.newPlayer.player_photo_url}
                        />
                    </div>
                    <div>
                        <label htmlFor="sport">Sport: </label>
                        <textarea
                            id="sport"
                            type="text"
                            name="sport"
                            onChange={this.handleChange}
                            value={this.state.newPlayer.sport}
                        />
                    </div>
                    <div>
                        <label htmlFor="team">Team: </label>
                        <textarea
                            id="team"
                            type="text"
                            name="team"
                            onChange={this.handleChange}
                            value={this.state.newPlayer.team}
                        />
                    </div>
                    <div>
                        <label htmlFor="position">Position: </label>
                        <textarea
                            id="position"
                            type="text"
                            name="position"
                            onChange={this.handleChange}
                            value={this.state.newPlayer.position}
                        />
                    </div>
                    <div>
                        <label htmlFor="favorite">Favorite?  </label>
                        <input
                            id="favorite"
                            type="checkbox"
                            name="favorite"
                            onChange={this.handleChange}
                            value={this.state.newPlayer.favorite}
                        />
                    </div>
                    <button>Rename to {this.state.player.playerName}</button>
                    <button onClick={this.toggleEditForm}>Cancel</button>
                </form>
                </div>
                : <div>
                <img src={this.state.player.player_photo_url} alt="" style={logoStyle}/>
                {/* {this.state.team.stats.map(stat => (
                    <div key={player.id}>d
                        <Link to={`/players/${player.id}`}><img src={player.player_photo_url} alt="" style={logoStyle}/></Link>
                    </div>
                ))} */}
                <div>
                    <Link to="/players"><button>Back to Players</button></Link>
                    <button onClick={this.toggleEditForm}>Update Player</button>
                    <button onClick={this.deletePlayer}>Delete Player</button>
                </div>
            </div>
        }
      </div>
      
        );
    }
}

export default Player;