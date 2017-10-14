import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increaseUnsavedAbility, decreaseUnsavedAbility,
        fetchProfileIfNeeded, patchProfile, clearMessage } from '../actions'
import PropTypes from 'prop-types'
import LoadingCard from '../components/LoadingCard'
import AbilityCounter from '../components/AbilityCounter'

class HeroProfile extends Component {
    static propTypes = {
        heroID: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        handleIncrementClick: PropTypes.func.isRequired,
        handleDecrementClick: PropTypes.func.isRequired,
        handleHeroChanged: PropTypes.func.isRequired,
        handleSave: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.handleHeroChanged(this.props.heroID)
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.heroID !== nextProps.heroID) {
            this.props.handleHeroChanged(nextProps.heroID)
        }
    }

    render () {
        const { heroID, profiles, isFetching, handleIncrementClick, handleDecrementClick, handleSave } = this.props

        if (isFetching) {
            return (<LoadingCard/>)
        } else {
            const abilities = profiles.items[heroID]
            const remainPoints = this.calRemainPoints(abilities)

            return (
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            {/* 右半邊：可調整 4 種能力值 */}
                            <div className="col">
                                { ['str', 'int', 'agi', 'luk'].map(key => {
                                        return (
                                            <AbilityCounter
                                                key={ heroID + key }
                                                abilityType={ key }
                                                remainPoints={ remainPoints }
                                                unsavedAbility={ abilities[`unsaved_${ key }`] }
                                                onIncrementClick={ () => handleIncrementClick(heroID, key)}
                                                onDecrementClick={ () => handleDecrementClick(heroID, key)}
                                            />
                                        )
                                    })}
                            </div>
                            {/* 左半邊：顯示剩餘點數及儲存 */}
                            <div className="col d-flex flex-column justify-content-end align-items-end">
                                <b>剩餘點數：{ remainPoints }</b>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => { handleSave(heroID, {
                                            str: abilities.unsaved_str,
                                            int: abilities.unsaved_int,
                                            agi: abilities.unsaved_agi,
                                            luk: abilities.unsaved_luk
                                        })
                                    }}
                                >
                                    儲存
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    calRemainPoints(abilities) {
        const allPoints = ['str', 'int', 'agi', 'luk'].reduce((prev, key) => prev + abilities[key], 0)
        const usedPoints = ['unsaved_str', 'unsaved_int', 'unsaved_agi', 'unsaved_luk'].reduce((prev, key) => prev + abilities[key], 0)
        return allPoints - usedPoints
    }
}

const mapStateToProps = (state, ownProps) => {
    const heroID = ownProps.match.params.id
    const isFetching = !state.profiles.items[heroID]
    return {
        heroID,
        isFetching,
        profiles: state.profiles,
    }
}

const mapDispatchToProps = (dispatch) => ({
    handleIncrementClick: (id, ability) => {
        dispatch(increaseUnsavedAbility(id, ability))
    },
    handleDecrementClick: (id, ability) => {
        dispatch(decreaseUnsavedAbility(id, ability))
    },
    handleHeroChanged: (newHeroID) => {
        dispatch(fetchProfileIfNeeded(newHeroID))
        dispatch(clearMessage())
    },
    handleSave: (heroID, data) => {
        dispatch(patchProfile(heroID, data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HeroProfile)
