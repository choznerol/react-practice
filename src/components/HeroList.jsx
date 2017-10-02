import React from 'react'
import PropTypes from 'prop-types'
import HeroCard from './HeroCard'

const HeroList = (props) => {
    return (
        <div className="card-deck mb-4">
            <HeroCard></HeroCard>
            <HeroCard></HeroCard>
            <HeroCard></HeroCard>
            <HeroCard></HeroCard>
        </div>
    )
}

export default HeroList
