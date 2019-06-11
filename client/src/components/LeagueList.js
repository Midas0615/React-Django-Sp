import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LeagueList extends Component {
    state = {
        error: '',
        leagues: [],
        newLeague: {
          name: '',
          image: '',
          favorite: true
        },
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
        axios
            .post('/api/v1/leagues', this.state.newLeague)
            .then(res => {
                const leaguesList = [...this.state.leagues]
                leaguesList.unshift(res.data)
                this.setState({
                    newLeague: {
                        name: '',
                        image: '',
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
    
    return (
        <div>
        {
            this.state.isLeagueFormDisplayed
                ? <div ><h1>Create {this.state.newLeague.name}</h1>
                <div><img src={this.state.newLeague.image} style={logoStyle} alt="League Logo"/></div>
                <form onSubmit={this.createLeague}>
                    <div>
                        <label htmlFor="name">League Name: </label>
                        <textarea
                            id="name"
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.newLeague.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Image URL: </label>
                        <textarea
                            id="image"
                            type="text"
                            name="image"
                            onChange={this.handleChange}
                            value={this.state.newLeague.image}
                        />
                    </div>
                    
                   
                    <button>Create {this.state.newLeague.name}</button>
                    <button onClick={this.toggleLeagueForm}>Cancel</button>
                </form>
                </div>
                : <div>
                    <h1>Leagues</h1>                 
                        {
                        this.state.leagues.map(league => {
                            return (
                                <div key={league.id}>                        
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