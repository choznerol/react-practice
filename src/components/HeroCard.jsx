import React from 'react'
import PropTypes from 'prop-types'

const HeroCard = (props) => {
    return (
        <div className="card">
            <img className="card-img-top" src="http://lorempixel.com/g/256/256/abstract" alt="Card image cap"/>
            <div className="card-body">
                <h4 className="card-title text-center">HeroCard</h4>
            </div>
        </div>
    )
}

export default HeroCard
