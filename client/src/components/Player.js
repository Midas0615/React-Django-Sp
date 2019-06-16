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
        this.fetchPlayerStats()
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

    fetchPlayerStats = () => {
        axios.get(`/api/v1/stats`).then(res => {
        // axios.get(`/api/v1/stats/${this.state.player.playerName}`).then(res => {
            // console.log(res.data)
            let stats = res.data
            let playerArray = stats.cumulativeplayerstats.playerstatsentry
            // console.log(playerArray)
            console.log(playerArray[0])            

            const singlePlayerStats = playerArray.filter(singlePlayer => singlePlayer.player.FirstName === "LeBron");

            // var objArray = [
            //     { id: 0, name: 'Object 0', otherProp: '321' },
            //     { id: 1, name: 'O1', otherProp: '648' },
            //     { id: 2, name: 'Another Object', otherProp: '850' },
            //     { id: 3, name: 'Almost There', otherProp: '046' },
            //     { id: 4, name: 'Last Obj', otherProp: '984' }
            // ];

            // let obj = objArray.find(obj => obj.id == 3);

            console.log(singlePlayerStats)


            // let statLine = stats.cumulativeplayerstats.playerstatsentry[0].stats.Fg3PtAttPerGame
            // console.log(statLine)
            // let stat = {}
            // for(var item in statLine){
            //     var thisname = item.substring(1)
            //     stat[thisname] = statLine[item]
                // console.log(stat)
            // }
            // let statLine2 = stats.cumulativeplayerstats.playerstatsentry[0].stats.Fg3PtAttPerGame.text
            // console.log(statLine2)
            // return stats
            // this.setState({stats: stats})
            
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
                    <div>
                        <label htmlFor="favorite">Favorite?  </label>
                        <input
                            id="favorite"
                            type="checkbox"
                            name="favorite"
                            onChange={this.handleChange}
                            value={this.state.player.favorite}
                        />
                    </div>
                    <button>Rename to {this.state.player.playerName}</button>
                    <button onClick={this.toggleEditForm}>Cancel</button>
                </form>
                </div>
                : <div>
                <img src={this.state.player.player_photo_url} alt="" style={logoStyle}/>
                <h2>{this.state.player.playerName}</h2>
                <p>Stats: {this.stats}</p>
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