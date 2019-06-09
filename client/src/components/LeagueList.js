import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class LeagueList extends Component {
    state = {
        error: '',
        leagues: []
    }

    componentDidMount(){
        this.fetchLeagues();
    }

    fetchLeagues = async () => {
        try {
            const res = await axios.get('/api/leagues');
            this.setState({leagues: res.data});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <h1>All Leagues</h1>
                {this.state.leagues.map(league => (
                    <div key={league.id}>
                        <Link to={`/league/${league.id}`} >{league.name}</Link>
                    </div>
                ))}
            </div>
        );
    }
}

export default LeagueList;