import React from 'react'
import PropTypes from 'prop-types'

const AbilityCounter = ({ abilityType, unsavedAbility, onIncrementClick, onDecrementClick, remainPoints }) => {
    return (
        <span className="d-flex justify-content-between mb-2">
            <b style={{width: '4rem'}}>{ abilityType.toUpperCase() }</b>
            <button
                className="btn btn-primary"
                onClick={ onIncrementClick }
                disabled={ remainPoints <= 0 }
                > + </button>
            <b>
                { unsavedAbility }
            </b>
            <button
                className="btn btn-primary"
                onClick={ onDecrementClick }
                disabled={ unsavedAbility <= 0 }
                > - </button>
        </span>
    )
}

AbilityCounter.propTypes = {
    abilityType: PropTypes.string.isRequired,
    remainPoints: PropTypes.number.isRequired,
    unsavedAbility: PropTypes.number.isRequired,
    onDecrementClick: PropTypes.func.isRequired,
    onDecrementClick: PropTypes.func.isRequired
}

export default AbilityCounter
