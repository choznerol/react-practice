import React from 'react'
import HeroCard from '../HeroCard'
import { BrowserRouter, NavLink } from 'react-router-dom'

describe('HeroCard component (pure)', () => {

    it('renders an Bootstrap card component', () => {
        let wrapper = mount(
            <BrowserRouter>
                <HeroCard
                    id="1"
                    name="Iron Man"
                    image="https://lorempixel/b/200/200"
                    isSelected={ true }
                />
            </BrowserRouter>
        )
        expect(wrapper.find('.card').exists()).to.equal(true)
    })

    it('has class `.card-active` if isSelected', () => {
        let wrapper = mount(
            <BrowserRouter>
                <HeroCard
                    id="1"
                    name="Iron Man"
                    image="https://lorempixel/b/200/200"
                    isSelected={ true }
                />
            </BrowserRouter>
        )
        expect(wrapper.find('a').is('.card-active')).to.equal(true)
    })

    it('doesn\'t have class `.card-active` if !isSelected', () => {
        let wrapper = mount(
            <BrowserRouter>
                <HeroCard
                    id="1"
                    name="Iron Man"
                    image="https://lorempixel/b/200/200"
                    isSelected={ false }
                />
            </BrowserRouter>
        )
        expect(wrapper.find('a').is('.card-active')).to.equal(false)
    })
})
