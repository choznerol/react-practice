import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = () => (
    <div>
        <h1>HomePage</h1>
        <li>Go to <Link to="/heros">/heros</Link></li>
        <li>Go to <Link to="/heros/1">/heros/1</Link></li>
        <li>Go to <Link to="/heros/999">/heros/999</Link></li>
    </div>
)

export default HomePage;
