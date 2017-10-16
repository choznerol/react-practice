import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increaseUnsavedAbility,
         decreaseUnsavedAbility,
         fetchProfileIfNeeded,
         patchProfile,
         clearMessage } from '../actions'
import LoadingCard from '../components/LoadingCard'
import HeroProfileEditor from '../components/HeroProfileEditor'

class HeroProfile extends Component {

    // 初次選擇 hero 時 fetch 它的 profile
    componentDidMount() {
        this.props.dispatch(fetchProfileIfNeeded(this.props.heroID))
    }

    // 切換 hero 時 fetch 新的 profile，清除任何提示訊息（如：「儲存成功」）
    componentWillUpdate(nextProps, nextState) {
        if (this.props.heroID !== nextProps.heroID) {
            this.props.dispatch(fetchProfileIfNeeded(nextProps.heroID))
            this.props.dispatch(clearMessage())
        }
    }

    render () {

        if (this.props.showLoading) {
            return (<LoadingCard/>)
        } else {
            return (
                <HeroProfileEditor {...this.props} />
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {

    const heroID = ownProps.selectedHeroID
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
    dispatch,
    handleIncrementClick: (id, ability) => {
        dispatch(increaseUnsavedAbility(id, ability))
    },
    handleDecrementClick: (id, ability) => {
        dispatch(decreaseUnsavedAbility(id, ability))
    },
    handleSave: (heroID, data) => {
        dispatch(patchProfile(heroID, data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HeroProfile)
