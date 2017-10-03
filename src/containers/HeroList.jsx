import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selecteHero } from '../actions'
import HeroCard from '../components/HeroCard'

class HeroList extends Component {
    static propTypes = {
        heros: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            selected: PropTypes.bool.isRequired
        }).isRequired).isRequired,
        onCardClick: PropTypes.func.isRequired
    }

    render () {
        const { heros, onCardClick } = this.props
        return (
            <div className="card-deck mb-4">
                { heros.map(hero =>
                    <HeroCard
                        key={ hero.id }
                        {...hero}
                        onClick={() => onCardClick(hero.id)}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    heros: state.heros.map(hero => ({
        ...hero,
        selected: hero.id === state.selectedHeroId
    }))
})

const mapDispatchToProps = {
    onCardClick: selecteHero
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeroList)
