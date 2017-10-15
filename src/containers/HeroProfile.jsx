import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increaseUnsavedAbility,
         decreaseUnsavedAbility,
         fetchProfileIfNeeded,
         patchProfile,
         clearMessage } from '../actions'
import PropTypes from 'prop-types'
import LoadingCard from '../components/LoadingCard'
import AbilityCounter from '../components/AbilityCounter'
import PulseLoader from '../components/PulseLoader'

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

class HeroProfile extends Component {
    static propTypes = {
        // Required props
        showLoading: PropTypes.bool.isRequired,
        heroID: PropTypes.string.isRequired,

        // showLoading === true 時才需要
        profile: profileShape,
        totalPoints: PropTypes.number,
        isSubmitting: PropTypes.bool,
        remainPoints: PropTypes.number,

        // handlers
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

        if (this.props.showLoading) {
            return (<LoadingCard/>)
        } else {

            return (
                <div className="card">
                    <div className="card-body">
                        <div className="row">

                            {/* 右半邊：可調整 4 種能力值 */}
                            <div className="col">
                                { ['str', 'int', 'agi', 'luk'].map(key => {
                                        return (
                                            <AbilityCounter
                                                key={ this.props.heroID + key }
                                                abilityType={ key }
                                                remainPoints={ this.props.remainPoints }
                                                unsavedAbility={ this.props.profile[`unsaved_${ key }`] }
                                                onIncrementClick={ () => this.props.handleIncrementClick(this.props.heroID, key)}
                                                onDecrementClick={ () => this.props.handleDecrementClick(this.props.heroID, key)}
                                            />
                                        )
                                    })}
                            </div>

                            {/* 左半邊：顯示剩餘點數及儲存 */}
                            <div className="col d-flex flex-column justify-content-end align-items-end">
                                <b>剩餘點數：{ this.props.remainPoints }</b>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => { this.props.handleSave(this.props.heroID, {
                                            str: this.props.profile.unsaved_str,
                                            int: this.props.profile.unsaved_int,
                                            agi: this.props.profile.unsaved_agi,
                                            luk: this.props.profile.unsaved_luk
                                        })
                                    }}
                                >
                                    {this.props.isSubmitting ? (
                                        <PulseLoader loading={ true } className="pulse-loader"/>
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
    }
}

const mapStateToProps = (state, ownProps) => {

    const heroID = ownProps.match.params.id
    const profile = state.profiles.items[heroID]
    const showLoading = !profile || state.profiles.isFetching

    if (showLoading) {
        return {
            heroID,
            showLoading
        }
    } else {

        const totalPoints = ['str', 'int', 'agi', 'luk'].reduce((prev, key) => prev + profile[key], 0)
        const totalUnsavedPoints = ['unsaved_str', 'unsaved_int', 'unsaved_agi', 'unsaved_luk'].reduce((prev, key) => prev + profile[key], 0)

        return {
            showLoading,
            heroID,
            profile,
            totalPoints,
            isSubmitting: state.profiles.isSubmitting,
            remainPoints: totalPoints - totalUnsavedPoints
        }
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
