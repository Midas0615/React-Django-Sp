import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Player extends Component {

    state = {
            player: {},
            Pts: {},
            Ast: {},
            Reb: {},
            Stl: {},
            Blk: {}
    }

    componentDidMount() {
        const playerId = this.props.match.params.id;
        this.fetchPlayer(playerId)
            .then(name => {
                console.log(name)
                const firstName = name.split(" ")[0]
                const lastName = name.split(" ")[1]
                console.log(firstName)
                console.log(lastName)
                this.fetchPlayerStats(firstName, lastName)
        })
    }

    fetchPlayer = async (playerId) => {
        try {
            const playerResponse = await axios.get(`/api/v1/players/${playerId}`)
            this.setState({
                player: playerResponse.data
            })
            console.log(this.state.player.playerName)
            let name = this.state.player.playerName
            return name
        }
        catch (error) {
            console.log(error)
            this.setState({error: error.message})
        }
    }

    fetchPlayerStats = (firstName, lastName) => {
        axios.get(`/api/v1/stats`).then(res => {
            let stats = res.data
            console.log(firstName)
            let playerArray = stats.cumulativeplayerstats.playerstatsentry
            const singlePlayerStats = playerArray.filter(singlePlayer => singlePlayer.player.FirstName === firstName && singlePlayer.player.LastName === lastName);
            console.log(singlePlayerStats)
            let playerPts = singlePlayerStats[0].stats.PtsPerGame
            let playerAst = singlePlayerStats[0].stats.AstPerGame
            let playerReb = singlePlayerStats[0].stats.RebPerGame
            let playerStl = singlePlayerStats[0].stats.StlPerGame
            let playerBlk = singlePlayerStats[0].stats.BlkPerGame
            this.setState({Pts: playerPts, Ast: playerAst, Reb: playerReb, Stl: playerStl, Blk: playerBlk})            
        })
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
        this.setState({player: clonePlayer})
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
            height: "300px"
        }

        const statStyle = {
            fontSize: "20px",
            fontWeight: "bold",
            margin: "5px"
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
                            value={this.state.player.playerName}
                        />
                    </div>
                    <div>
                        <label htmlFor="player_photo_url">Photo URL: </label>
                        <textarea
                            id="player_photo_url"
                            type="text"
                            name="player_photo_url"
                            onChange={this.handleChange}
                            value={this.state.player.player_photo_url}
                        />
                    </div>
                    <div>
                        <label htmlFor="sport">Sport: </label>
                        <textarea
                            id="sport"
                            type="text"
                            name="sport"
                            onChange={this.handleChange}
                            value={this.state.player.sport}
                        />
                    </div>
                    <div>
                        <label htmlFor="team">Team: </label>
                        <textarea
                            id="team"
                            type="text"
                            name="team"
                            onChange={this.handleChange}
                            value={this.state.player.team}
                        />
                    </div>
                    <div>
                        <label htmlFor="position">Position: </label>
                        <textarea
                            id="position"
                            type="text"
                            name="position"
                            onChange={this.handleChange}
                            value={this.state.player.position}
                        />
                    </div>
                    {/* <div>
                        <label htmlFor="favorite">Favorite?  </label>
                        <input
                            id="favorite"
                            type="checkbox"
                            name="favorite"
                            onChange={this.handleChange}
                            value={this.state.player.favorite}
                        />
                    </div> */}
                    <button>Rename to {this.state.player.playerName}</button>
                    <button onClick={this.toggleEditForm}>Cancel</button>
                </form>
                </div>
                : <div>
                <img src={this.state.player.player_photo_url} alt="" style={logoStyle}/>
                <h2>{this.state.player.playerName}</h2>
                <h2>Stats:</h2>
                <p style={statStyle}>{this.state.Pts['@abbreviation']}: {this.state.Pts['#text']}</p>
                <p style={statStyle}>{this.state.Ast['@abbreviation']}: {this.state.Ast['#text']}</p>
                <p style={statStyle}>{this.state.Reb['@abbreviation']}: {this.state.Reb['#text']}</p>
                <p style={statStyle}>{this.state.Stl['@abbreviation']}: {this.state.Stl['#text']}</p>
                <p style={statStyle}>{this.state.Blk['@abbreviation']}: {this.state.Blk['#text']}</p>
               
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