import React from 'react';
import { BrowserRouter as Router,  Route, Link, Switch } from "react-router-dom";
import './App.css';
import {Navbar} from './components';
import { Home, Setting, Projects, Startpage, TeamMembers } from './pages';

type Props = {loggedin: boolean, tokenChecked: boolean, showNav: boolean, userName: string}

export default class App extends React.Component <{}, Props>{
  constructor(props: Props){
    super(props);
    this.state = { loggedin: false, tokenChecked: false, showNav: true, userName: ""};
  }

  componentWillMount() {}
  render(){
    return(
        <Router>
          <Navbar loggedin = {this.state.loggedin} showNav={this.state.showNav} hide={()=>{this.setState({showNav: !this.state.showNav})}}/>
            {this.state.loggedin?
            <Switch>
              <Route path="/projects" render={()=> <Projects {...this.state} />} />
              <Route path="/team" render={() => <TeamMembers {...this.state}/>} />
              <Route path="/setting" component={Setting} />
              <Route path="*" render={()=> <Home {...this.state}  />} />
            </Switch>
           :<Switch>
              <Route path="*" render={()=> <Startpage onChange={(e:any)=>{this.setState({userName: e.target.value})}}
                                                    login={()=>{this.setState({loggedin: true})}}/>} />
            </Switch>
            }
        </Router>
);
    }
}
