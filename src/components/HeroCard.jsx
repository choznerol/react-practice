import React from 'react'
import PropTypes from 'prop-types'

const HeroCard = ({ onClick, id, name, image, selected }) => (
    <a
        className="card"
        href="#"
        onClick={e => {
            e.preventDefault()
            onClick()
    }}>
        <img className="card-img-top" src={ image } alt={ `${id}-${name}` }/>
        <div className="card-body">
            <h4 className="card-title text-center">{ id }:{ name }:{ selected ? 'T' : 'F' }</h4>
        </div>
    </a>
)

HeroCard.propTypes = {
    onClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired
}

export default HeroCard
