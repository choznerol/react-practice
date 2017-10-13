import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selecteHero, fetchHeros, fetchProfileIfNeeded } from '../actions'
import LoadingBar, { showLoading } from 'react-redux-loading-bar'
import HeroCard from '../components/HeroCard'

class HeroList extends Component {
    static propTypes = {
        heros: PropTypes.shape({
            isFetching: PropTypes.bool.isRequired,
            items: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
                // selected: PropTypes.bool.isRequired
            }).isRequired).isRequired,
        }),
        selectedHeroId: PropTypes.string
    }

    // 造訪 /heros 並渲染此組件後抓一次所有的 heros
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchHeros())
        dispatch(showLoading())
    }

    render () {
        const { heros, selectedHeroId } = this.props
        return (
            <div className="card-deck mb-4">
                { heros.items.map(hero =>
                    <HeroCard
                        key={ hero.id }
                        {...hero}
                        selectedHeroId={ selectedHeroId }
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    heros: state.heros,
    selectedHeroId: ownProps.selectedHeroId
})

export default connect(mapStateToProps)(HeroList)
