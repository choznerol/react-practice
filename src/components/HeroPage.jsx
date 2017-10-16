import React from 'react'
import { Route } from 'react-router-dom'
import HeroList from '../containers/HeroList'
import HeroProfile from '../containers/HeroProfile'

const HeroPage = ({ match }) => {
    const selectedHeroID = match.params.id

    return (
        <div>

            {/* hero 卡片列表 */}
            <HeroList selectedHeroID={ selectedHeroID } />

            {/* 能力值調整面板 */}
            { selectedHeroID ? (<HeroProfile selectedHeroID={ selectedHeroID } />) : null }

        </div>
    )

}

export default HeroPage
