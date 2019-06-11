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

    render() {

        if(this.state.redirectToHome) {
            return (<Redirect to="/leagues" />)
        }

        const logoStyle = {
            display: "inline-block",
            margin: "10px",
            width: "200px"
        }

        return (
            <div>
                <img src={this.state.league.league_logo_url} alt="" style={logoStyle}/>
                {this.state.league.teams.map(team => (
                    <div key={team.id}>
                        {/* <h4>{team.teamCity} {team.teamName}</h4> */}
                        <Link to={`/teams/${team.id}`}><img src={team.team_logo_url} alt="" style={logoStyle}/></Link>
                    </div>
                ))}
                <div>
                    <Link to="/leagues"><button>Back to Leagues</button></Link>
                    <button onClick={this.toggleEditForm}>Update League</button>
                    <button onClick={this.deleteLeague}>Delete League</button>
                </div>
            </div>
        );
    }
}

export default League;