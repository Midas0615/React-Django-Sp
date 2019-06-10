import React, {Component} from 'react';
import axios from 'axios';

class League extends Component {

    state = {
            league: {},
            teams: [],
    }

    componentDidMount() {
        const leagueId = this.props.match.params.id;
        this.fetchLeague(leagueId)
    }

    fetchLeague = async (leagueId) => {
        try {
            const leagueResponse = await axios.get(`/api/v1/leagues/${leagueId}`)
            this.setState({
                league: leagueResponse.data,
                songs: leagueResponse.data.songs,
            })
        }
        catch (error) {
            console.log(error)
            this.setState({error: error.message})
        }
    }

    render() {
        return (
            <div>
                <img src={this.state.league.league_logo_url} alt=""/>
                <h1>{this.state.league.leagueName}</h1>
                {this.state.teams.map(team => (
                    <div key={team.id}>
                        <h4>{team.teamCity} {team.teamName}</h4>
                        <img src={team.team_logo_url} alt=""/>
                    </div>
                ))}
            </div>
        );
    }
}

export default League;