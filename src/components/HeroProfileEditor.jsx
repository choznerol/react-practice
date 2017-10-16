import React from 'react'
import PropTypes from 'prop-types'
import AbilityCounter from '../components/AbilityCounter'
import PulseLoader from '../components/PulseLoader'

const HeroProfileEditor = (props) => {
    const allowSubmit = props.remainPoints === 0

    return (
        <div className="card bg-dark text-white border-white">
            <div className="card-body">
                <div className="row">

                    {/* 右半邊：可調整 4 種能力值 */}
                    <div className="col">
                        { ['str', 'int', 'agi', 'luk'].map(key => {
                            return (
                                <AbilityCounter
                                    key={ props.heroID + key }
                                    abilityType={ key }
                                    remainPoints={ props.remainPoints }
                                    unsavedAbility={ props.profile[`unsaved_${ key }`] }
                                    onIncrementClick={ () => props.handleIncrementClick(props.heroID, key)}
                                    onDecrementClick={ () => props.handleDecrementClick(props.heroID, key)}
                                />
                            )
                        })}
                    </div>

                    {/* 左半邊：顯示剩餘點數及儲存 */}
                    <div className="col d-flex flex-column justify-content-end align-items-end">
                        <b>剩餘點數：
                            <span className={ allowSubmit ? '' : 'text-danger' }> { props.remainPoints } </span>
                        </b>
                        <button
                            className="btn btn-primary"
                            disabled={ !allowSubmit }
                            onClick={() => { props.handleSave(props.heroID, {
                                str: props.profile.unsaved_str,
                                int: props.profile.unsaved_int,
                                agi: props.profile.unsaved_agi,
                                luk: props.profile.unsaved_luk
                            })
                        }}
                        >
                            {props.isSubmitting ? (
                                <PulseLoader loading={ true } className="pulse-loader" size="0.6rem"/>
                            ) : (
                                '儲存'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const profileShape = PropTypes.shape({
    // fetched version
    str: PropTypes.number.isRequired,
    int: PropTypes.number.isRequired,
    agi: PropTypes.number.isRequired,
    luk: PropTypes.number.isRequired,
    // User edited copy
    unsaved_str: PropTypes.number,
    unsaved_int: PropTypes.number,
    unsaved_agi: PropTypes.number,
    unsaved_luk: PropTypes.number
})

HeroProfileEditor.propTypes = {
    heroID: PropTypes.string.isRequired,
    profile: profileShape.isRequired,
    totalPoints: PropTypes.number.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    remainPoints: PropTypes.number.isRequired,

    // handlers
    handleIncrementClick: PropTypes.func.isRequired,
    handleDecrementClick: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired
}

export default HeroProfileEditor
