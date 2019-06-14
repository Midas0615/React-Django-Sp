import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class League extends Component {

    state = {
            league: {
                teams: []
            }
    }

    componentDidMount() {
        const leagueId = this.props.match.params.id;
        this.fetchLeague(leagueId)
    }

    fetchLeague = async (leagueId) => {
        try {
            const leagueResponse = await axios.get(`/api/v1/leagues/${leagueId}`)
            this.setState({
                league: leagueResponse.data
                // songs: leagueResponse.data.songs,
            })
        }
        catch (error) {
            console.log(error)
            this.setState({error: error.message})
        }
    }

    deleteLeague = () => {
        axios.delete(`/api/v1/leagues/${this.props.match.params.id}`).then(res => {
            this.setState({redirectToHome: true})
        })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }
  
    handleChange = (e) => {
        const cloneLeague = {...this.state.league}
        cloneLeague[e.target.name] = e.target.value
        this.setState({league: cloneLeague})
    }
  
    updateLeague = (e) => {
        e.preventDefault()
        axios
          .put(`/api/v1/leagues/${this.props.match.params.id}/`, this.state.league)
          .then(res => {
              this.setState({league: res.data, isEditFormDisplayed: false})
          })
    }

    render() {

        if(this.state.redirectToHome) {
            return (<Redirect to="/leagues" />)
        }

        const logoStyle = {
            margin: "10px",
            height: "200px"
        }

        const logosStyle = {
            display: "inline-block",
            margin: "10px",
            height: "250px"
        }

        return (

            <div>
        {
            this.state.isEditFormDisplayed
                ? <div><h1>Change to {this.state.league.leagueName}</h1>
                <div><img src={this.state.league.league_logo_url} alt='' style={logoStyle}/></div>
                <form onSubmit={this.updateLeague}>
                <div>
                        <label htmlFor="leagueName">League Name: </label>
                        <textarea
                            id="leagueName"
                            type="text"
                            name="leagueName"
                            onChange={this.handleChange}
                            value={this.state.league.leagueName}
                        />
                    </div>
                    <div>
                        <label htmlFor="league_logo_url">Image URL: </label>
                        <textarea
                            id="image"
                            type="text"
                            name="league_logo_url"
                            onChange={this.handleChange}
                            value={this.state.league.league_logo_url}
                        />
                    </div>
                    <div>
                        <label htmlFor="sport">Sport: </label>
                        <textarea
                            id="sport"
                            type="text"
                            name="sport"
                            onChange={this.handleChange}
                            value={this.state.league.sport}
                        />
                    </div>
                    <div>
                        <label htmlFor="favorite">Favorite?  </label>
                        <input
                            id="favorite"
                            type="checkbox"
                            name="favorite"
                            onChange={this.handleChange}
                            value={this.state.league.favorite}
                        />
                    </div>
                    <button>Rename to {this.state.league.leagueName}</button>
                    <button onClick={this.toggleEditForm}>Cancel</button>
                </form>
                </div>
                : <div>
                <img src={this.state.league.league_logo_url} alt="" style={logosStyle}/>
                {this.state.league.teams.map(team => (
                    <div key={team.id} style={logosStyle}>
                        <Link to={`/teams/${team.id}`}><img src={team.team_logo_url} alt="" style={logoStyle}/></Link>
                        <h2>{team.teamName}</h2>
                    </div>
                ))}
                <div>
                    <Link to="/leagues"><button>Back to Leagues</button></Link>
                    <button onClick={this.toggleEditForm}>Update League</button>
                    <button onClick={this.deleteLeague}>Delete League</button>
                </div>
            </div>
        }
      </div>

            
        );
    }
}

export default League;