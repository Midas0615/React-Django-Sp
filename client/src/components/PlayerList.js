import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import MySportsFeeds from 'ohmysportsfeedspy';

class PlayerList extends Component {
    state = {
        error: '',
        players: [],
        teams: [],
        newPlayer: {
          playerName: '',
          player_photo_url: '',
          sport: '',
          team: '',
          position: '',
          favorite: true
        },
        redirectToHome: false,
        isPlayerFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('/api/v1/players/').then(res => {
            console.log(res.data)
            this.setState({players: res.data})
        }).then( () => {this.getTeams()})
    }

    getTeams = () => {
        axios.get('/api/v1/teams/').then(res => {
            console.log(res.data)
            this.setState({teams: res.data})
        })
    }
    
    togglePlayerForm = () => {
        this.setState((state, props) => {
            return ({isPlayerFormDisplayed: !state.isPlayerFormDisplayed})
        })
    }

    handleChange = (e) => {
        const cloneNewPlayer = {...this.state.newPlayer}
        cloneNewPlayer[e.target.name] = e.target.value
        this.setState({newPlayer: cloneNewPlayer})
    }

    setTeamId = (teamIdForPlayer) => {
        const setPlayer = {...this.state.newPlayer}
        setPlayer.team = teamIdForPlayer
        this.setState({newPlayer: setPlayer})
    }

    createPlayer = (e) => {
        e.preventDefault()
        axios.post('/api/v1/players/', this.state.newPlayer)
            .then(res => {
                console.log(res.data)
                const playersList = [...this.state.players]
                playersList.unshift(res.data)
                this.setState({
                    newPlayer: {
                        playerName: '',
                        player_photo_url: '',
                        sport: '',
                        team: '',
                        position: '',
                        favorite: true
                    },
                    isPlayerFormDisplayed: false,
                    players: playersList
                })
            })
    }
    
    render() {

        const logoStyle = {
            margin: "10px",
            height: "220px",
            borderRadius: "20px"
        }

        const logosStyle = {
            display: "inline-block",
        }

        const smallLogoStyle = {
            display: "inline-block",
            margin: "10px",
            height: "75px"
        }
    
    return (
        <div>
        {
            this.state.isPlayerFormDisplayed
                ? <div ><h1>Create {this.state.newPlayer.playerName}</h1>
                <div><img src={this.state.newPlayer.player_photo_url} style={logoStyle} alt=''/></div>
                <h2>Click the team you want, then make your player!</h2>
                <h2>If your team isn't listed, add it under the Teams tab!</h2>
                    {this.state.teams.map(team => {
                        return (                   
                            <div onClick={() => {this.setTeamId(team.id)}} key={team.id} style={smallLogoStyle}>                                
                                <img src={team.team_logo_url} alt="" style={smallLogoStyle}/>
                            </div>
                        )                          
                    })
                    }

                <form onSubmit={this.createPlayer}>
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
                        <label htmlFor="position">Position: </label>
                        <textarea
                            id="position"
                            type="text"
                            name="position"
                            onChange={this.handleChange}
                            value={this.state.newPlayer.position}
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="favorite">Favorite?  </label>
                        <input
                            id="favorite"
                            type="checkbox"
                            name="favorite"
                            onChange={this.handleChange}
                            value={this.state.newPlayer.favorite}
                        />
                    </div> */}
                    
                   
                    <button type="submit">Create {this.state.newPlayer.playerName}</button>
                    <button onClick={this.togglePlayerForm}>Cancel</button>
                </form>
                </div>
                : <div>
                    <h1>Players</h1>                 
                        {
                        this.state.players.map(player => {
                            return (
                                <div key={player.id} style={logosStyle}>                        
                                    <Link to={`/players/${player.id}`}><img src={player.player_photo_url} alt="" style={logoStyle}/><br></br></Link>
                                    <h2>{player.playerName}</h2>
                                </div>
                            )
                        })
                        }
                        <div><button onClick={this.togglePlayerForm}>Create New Player</button></div>
                </div>
        }
        </div>
    )
    }
}

export default PlayerList;