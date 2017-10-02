import React from 'react';
import {Link} from 'react-router-dom';
import {addTodo} from '../actions'
import HeroList from '../components/HeroList'
import HeroProfile from '../components/HeroProfile'

class Heros extends React.Component {
    render() {
        return (
            <div
                style={{
                    maxWidth: '1024px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
            >
                <HeroList></HeroList>
                <HeroProfile></HeroProfile>
            </div>
        );
    }
}

export default Heros;
