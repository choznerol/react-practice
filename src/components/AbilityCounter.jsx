import React from 'react'
import PropTypes from 'prop-types'

// 一組 AbilityCounter 包含增加按鈕、能力數值、減少按鈕
const AbilityCounter = ({ abilityType, isUnsaved, unsavedAbility, onIncrementClick, onDecrementClick, remainPoints }) => {
    return (
        <span className="ability-counter d-flex justify-content-between mt-2">

            {/* 能力值標籤 */}
            <b className="ability-type">{ abilityType.toUpperCase() }</b>

            {/* 加號按鈕 */}
            <button
                className="btn btn-primary btn-sm"
                onClick={ onIncrementClick }
                disabled={ remainPoints <= 0 }
                > + </button>

            {/* 能力值 */}
            <b className={ (isUnsaved ? 'unsaved-ability-value' : 'ability-value') }>
                { unsavedAbility }
            </b>

            {/* 減少按鈕 */}
            <button
                className="btn btn-primary btn-sm"
                onClick={ onDecrementClick }
                disabled={ unsavedAbility <= 0 }
                > - </button>

        </span>
    )
}

AbilityCounter.propTypes = {
    abilityType: PropTypes.string.isRequired,
    remainPoints: PropTypes.number.isRequired,
    isUnsaved: PropTypes.bool.isRequired,
    unsavedAbility: PropTypes.number.isRequired,
    onDecrementClick: PropTypes.func.isRequired
}

export default AbilityCounter
