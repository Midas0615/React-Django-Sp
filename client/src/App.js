import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import HomeField from "./components/HomeField"
import LeagueList from "./components/LeagueList"
import League from "./components/League"
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">

                    <div>
                        <h1>Playoffs or BUST!</h1>
                        <div>
                            <div className="toplink"><Link to="/leagues/">All Leagues</Link></div>
                            <div className="toplink"><Link to="/teams/">All Teams</Link></div>
                            <div className="toplink"><Link to="/players/">All Players</Link></div>
                        </div>
                    </div>

                    <Switch>
                      <Route exact path="/" component={HomeField}/>
                      <Route exact path="/leagues" component={LeagueList}/>
                      <Route exact path="/leagues/:id" component={League}/>
                      {/* <Route exact path="/teams" component={TeamList}/>
                      <Route path="/teams/:id" component={Team}/>
                      <Route exact path="/players" component={PlayerList}/>
                      <Route path="/players/:id" component={Player}/> */}
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;