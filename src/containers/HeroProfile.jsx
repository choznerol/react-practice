import React, { Component } from 'react'
import isEqual from 'lodash/isEqual'
import sum from 'lodash/sum'
import { connect } from 'react-redux'
import { increaseUnsavedAbility,
         decreaseUnsavedAbility,
         fetchProfileIfNeeded,
         patchProfile,
         updateMessage,
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

    // 尚未 fetch（尚無資料）或正在 fetch 都顯示 loading
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
    handleSave: (heroID, profile) => {
        const saved = [profile.str, profile.int, profile.agi, profile.luk]
        const unsaved = [profile.unsaved_str, profile.unsaved_int, profile.unsaved_agi, profile.unsaved_luk ]

        // 表癲驗證：無剩餘點數
        if (sum(saved) !== sum(unsaved)) {
            dispatch(updateMessage('剩餘點數必須為 0', 'warning'))

        // 表單驗證：無更新
        } else if (isEqual(saved, unsaved)) {
            dispatch(updateMessage('沒有未儲存的更新', 'warning'))

        } else {
            const updates = {
                str: profile.unsaved_str,
                int: profile.unsaved_int,
                agi: profile.unsaved_agi,
                luk: profile.unsaved_luk
            }
            dispatch(patchProfile(heroID, updates))
        }

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HeroProfile)
