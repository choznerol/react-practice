import React from 'react';
import { Route } from 'react-router-dom';
import { addTodo } from '../actions'
import HeroList from '../containers/HeroList'
import HeroProfile from '../containers/HeroProfile'

const HeroPage = ({ match }) => (
    <div style={{
        maxWidth: '1024px',
        marginLeft: 'auto',
        marginRight: 'auto'
    }}>
        <Route path="/:id">
            <HeroList selectedHeroId={ match.params.id } ></HeroList>
        </Route>

        {/* url 末尾有 hero id 才渲染調整能力值的組件 */}
        {match.params.id ? (<HeroProfile selectedHeroId={ match.params.id } ></HeroProfile>) : null}

    </div>
)

export default HeroPage
