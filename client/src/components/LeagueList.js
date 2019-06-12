import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LeagueList extends Component {
    state = {
        error: '',
        leagues: [],
        newLeague: {
          leagueName: '',
          league_logo_url: '',
          sport: '',
          favorite: true
        },
        redirectToHome: false,
        isLeagueFormDisplayed: false
    }

    componentDidMount = () => {
        axios.get('/api/v1/leagues/').then(res => {
            console.log(res.data)
            this.setState({leagues: res.data})
        })
    }
    
    toggleLeagueForm = () => {
        this.setState((state, props) => {
            return ({isLeagueFormDisplayed: !state.isLeagueFormDisplayed})
        })
    }

    handleChange = (e) => {
        const cloneNewLeague = {...this.state.newLeague}
        cloneNewLeague[e.target.name] = e.target.value
        this.setState({newLeague: cloneNewLeague})
    }

    createLeague = (e) => {
        e.preventDefault()
        axios.post('/api/v1/leagues/', this.state.newLeague)
            .then(res => {
                const leaguesList = [...this.state.leagues]
                leaguesList.unshift(res.data)
                this.setState({
                    newLeague: {
                        leagueName: '',
                        league_logo_url: '',
                        sport: '',
                        favorite: true
                    },
                    isLeagueFormDisplayed: false,
                    leagues: leaguesList
                })
            })
    }
    
    render() {

        const logoStyle = {
            display: "inline-block",
            margin: "10px",
            height: "200px"
        }

        const logosStyle = {
            display: "inline-block",
        }
    
    return (
        <div>
        {
            this.state.isLeagueFormDisplayed
                ? <div ><h1>Create {this.state.newLeague.leagueName}</h1>
                <div><img src={this.state.newLeague.league_logo_url} style={logoStyle} alt=''/></div>
                <form onSubmit={this.createLeague}>
                    <div>
                        <label htmlFor="leagueName">League Name: </label>
                        <textarea
                            id="leagueName"
                            type="text"
                            name="leagueName"
                            onChange={this.handleChange}
                            value={this.state.newLeague.leagueName}
                        />
                    </div>
                    <div>
                        <label htmlFor="league_logo_url">Image URL: </label>
                        <textarea
                            id="image"
                            type="text"
                            name="league_logo_url"
                            onChange={this.handleChange}
                            value={this.state.newLeague.league_logo_url}
                        />
                    </div>
                    <div>
                        <label htmlFor="sport">Sport: </label>
                        <textarea
                            id="sport"
                            type="text"
                            name="sport"
                            onChange={this.handleChange}
                            value={this.state.newLeague.sport}
                        />
                    </div>
                    <div>
                        <label htmlFor="favorite">Favorite?  </label>
                        <input
                            id="favorite"
                            type="checkbox"
                            name="favorite"
                            onChange={this.handleChange}
                            value={this.state.newLeague.favorite}
                        />
                    </div>
                    
                   
                    <button>Create {this.state.newLeague.leagueName}</button>
                    <button onClick={this.toggleLeagueForm}>Cancel</button>
                </form>
                </div>
                : <div>
                    <h1>Leagues</h1>                 
                        {
                        this.state.leagues.map(league => {
                            return (
                                <div key={league.id} style={logosStyle}>                        
                                    <Link to={`/leagues/${league.id}`}><img src={league.league_logo_url} alt="" style={logoStyle}/><br></br>{league.name}</Link>
                                </div>
                            )
                        })
                        }
                        <div><button onClick={this.toggleLeagueForm}>Create New League</button></div>
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

export default LeagueList;