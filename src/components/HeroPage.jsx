import React from 'react';
import { Route } from 'react-router-dom';
import { addTodo } from '../actions'
import HeroList from '../containers/HeroList'
import HeroProfile from '../containers/HeroProfile'

const HeroPage = () => (
    <div style={{
        maxWidth: '1024px',
        marginLeft: 'auto',
        marginRight: 'auto'
    }}>
        <HeroList></HeroList>
        <HeroProfile></HeroProfile>
    </div>
)

export default HeroPage
