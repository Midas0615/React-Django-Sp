import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TeamList extends Component {
    state = {
        error: '',
        teams: [],
        newTeam: {
          teamName: '',
          team_logo_url: '',
          sport: '',
          league: '',
          wins: 0,
          losses: 0,
          players: [],
          favorite: true
        },
        redirectToHome: false,
        isTeamFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('/api/v1/teams/').then(res => {
            console.log(res.data)
            this.setState({teams: res.data})
        })
    }
    
    toggleTeamForm = () => {
        this.setState((state, props) => {
            return ({isTeamFormDisplayed: !state.isTeamFormDisplayed})
        })
    }

    handleChange = (e) => {
        const cloneNewTeam = {...this.state.newTeam}
        cloneNewTeam[e.target.name] = e.target.value
        this.setState({newTeam: cloneNewTeam})
    }

    createTeam = (e) => {
        e.preventDefault()
        axios.post('/api/v1/teams/', this.state.newTeam)
            .then(res => {
                const teamsList = [...this.state.teams]
                teamsList.unshift(res.data)
                this.setState({
                    newTeam: {
                        teamName: '',
                        team_logo_url: '',
                        sport: '',
                        league: '',
                        wins: null,
                        losses: null,
                        players: [],
                        favorite: true
                    },
                    isLeagueFormDisplayed: false,
                    teams: teamsList
                })
            })
    }
    
    render() {

        const logoStyle = {
            margin: "10px",
            height: "250px"
        }

        const logosStyle = {
            display: "inline-block",
        }
    
    return (
        <div>
        {
            this.state.isTeamFormDisplayed
                ? <div ><h1>Create {this.state.newTeam.teamName}</h1>
                <div><img src={this.state.newTeam.team_logo_url} style={logoStyle} alt=''/></div>
                <form onSubmit={this.createTeam}>
                    <div>
                        <label htmlFor="teamName">Team Name: </label>
                        <textarea
                            id="teamName"
                            type="text"
                            name="teamName"
                            onChange={this.handleChange}
                            value={this.state.newTeam.teamName}
                        />
                    </div>
                    <div>
                        <label htmlFor="team_logo_url">Image URL: </label>
                        <textarea
                            id="team_logo_url"
                            type="text"
                            name="team_logo_url"
                            onChange={this.handleChange}
                            value={this.state.newTeam.team_logo_url}
                        />
                    </div>
                    <div>
                        <label htmlFor="sport">Sport: </label>
                        <textarea
                            id="sport"
                            type="text"
                            name="sport"
                            onChange={this.handleChange}
                            value={this.state.newTeam.sport}
                        />
                    </div>
                    <div>
                        <label htmlFor="league">League: </label>
                        <textarea
                            id="league"
                            type="text"
                            name="league"
                            onChange={this.handleChange}
                            value={this.state.newTeam.league}
                        />
                    </div>
                    <div>
                        <label htmlFor="wins">Wins: </label>
                        <textarea
                            id="wins"
                            type="text"
                            name="wins"
                            onChange={this.handleChange}
                            value={this.state.newTeam.wins}
                        />
                    </div>
                    <div>
                        <label htmlFor="losses">Losses: </label>
                        <textarea
                            id="losses"
                            type="text"
                            name="losses"
                            onChange={this.handleChange}
                            value={this.state.newTeam.losses}
                        />
                    </div>
                    <div>
                        <label htmlFor="players">Players: </label>
                        <textarea
                            id="players"
                            type="text"
                            name="players"
                            onChange={this.handleChange}
                            value={this.state.newTeam.players}
                        />
                    </div>
                    <div>
                        <label htmlFor="favorite">Favorite?  </label>
                        <input
                            id="favorite"
                            type="checkbox"
                            name="favorite"
                            onChange={this.handleChange}
                            value={this.state.newTeam.favorite}
                        />
                    </div>
                    
                   
                    <button>Create {this.state.newTeam.teamName}</button>
                    <button onClick={this.toggleTeamForm}>Cancel</button>
                </form>
                </div>
                : <div>
                    <h1>Teams</h1>                 
                        {
                        this.state.teams.map(team => {
                            return (
                                <div key={team.id} style={logosStyle}>                        
                                    <Link to={`/teams/${team.id}`}><img src={team.team_logo_url} alt="" style={logoStyle}/><br></br></Link>
                                    <h2>{team.teamName}</h2>
                                </div>
                            )
                        })
                        }
                        <div><button onClick={this.toggleTeamForm}>Create New Team</button></div>
                </div>
        }
        </div>
    )
    }
}


//     componentDidMount(){
//         this.fetchLeagues();
//     }

//     fetchLeagues = async () => {
//         try {
//             const res = await axios.get('/api/leagues');
//             this.setState({leagues: res.data});
//         }
//         catch (err) {
//             console.log(err)
//             this.setState({error: err.message})
//         }
//     }

//     render() {
//         if (this.state.error){
//             return <div>{this.state.error}</div>
//         }
//         return (
//             <div>
//                 <h1>All Leagues</h1>
//                 {this.state.leagues.map(league => (
//                     <div key={league.id}>
//                         <Link to={`/league/${league.id}`} >{league.name}</Link>
//                     </div>
//                 ))}
//             </div>
//         );
//     }
// }

export default TeamList;