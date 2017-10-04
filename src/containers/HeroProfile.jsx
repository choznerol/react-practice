import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increaseUnsavedAbility, decreaseUnsavedAbility, fetchProfileIfNeeded} from '../actions'
import PropTypes from 'prop-types'
import FetchingProfile from '../components/FetchingProfile'
import AbilityCounter from '../components/AbilityCounter'

class HeroProfile extends Component {
    static propTypes = {
        heroID: PropTypes.string.isRequired,
        isFetching: PropTypes.bool.isRequired,
        handleIncrementClick: PropTypes.func.isRequired,
        handleDecrementClick: PropTypes.func.isRequired,
        handleHeroChanged: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.handleHeroChanged(this.props.heroID)
    }

    componentDidUpdate(nextProps, nextState) {
        if (this.props.heroID !== nextProps.heroID) {
            console.log('[HeroProfile] handleHeroChanged()');
            this.props.handleHeroChanged(nextProps.heroID)
        }
    }

    render () {
        const { heroID, profiles, isFetching, handleIncrementClick, handleDecrementClick } = this.props

        // Fetching
        if (isFetching) {
            return (<FetchingProfile/>)
        } else {
            const abilities = profiles.items[heroID]
            const remainPoints = this.calRemainPoints(abilities)

            return (
                <div className="card">
                    <div className="card-body">
                        <div className="row"><code>{ abilities.unsaved_str || 'No `abilities.unsaved_str`' }</code></div>
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
                                <a
                                    href="#"
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        e.preventDefault()

                                    }}
                                >
                                    儲存
                                </a>
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
    const heroID = ownProps.selectedHeroId
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HeroProfile)
