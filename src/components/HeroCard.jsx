import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const HeroCard = ({ id, name, image, isSelected }) => {

    return (
    <NavLink
        className="card"
        activeClassName="border-success"
        isActive={ () => isSelected }
        to={'/heros/' + id}
        >
        <img className="card-img-top" src={ image } alt={ `${id}-${name}` }/>
        <div className="card-body">
            <h4 className="card-title text-center">{ name }</h4>
        </div>
    </NavLink>
)}

HeroCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired
}

export default HeroCard
