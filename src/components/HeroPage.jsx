import React from 'react';
import { Route } from 'react-router-dom';
import { addTodo } from '../actions'
import HeroList from '../containers/HeroList'
import HeroProfile from '../containers/HeroProfile'

const HeroPage = ({ match }) => (
    <div>
        <HeroList selectedHeroId={ match.params.id } ></HeroList>
        <Route path={`${match.url}/:id`} component={ HeroProfile }></Route>
    </div>
)

export default HeroPage
