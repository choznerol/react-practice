import React from 'react'
import sinon from 'sinon'
import BSAlert from '../BSAlert'

describe('<BSAlert />', () => {

    it('renders nothing if visible is not specified', () => {
        const wrapper = render(<BSAlert />)
        expect(wrapper.html()).to.equal(null)
    })

    it('renders a Bootstrap alert component', () => {
        // const wrapper = shallow(<BSAlert />)
        const wrapper = mount(<BSAlert visible={ true }/>)
        expect(wrapper.find('.bs-alert').exists()).to.equal(true)
    })

    it('renders a Bootstrap alert with correct style', () => {
        // const wrapper = shallow(<BSAlert />)
        const wrapper = mount(<BSAlert visible={ true } bs_style="danger"/>)
        expect(wrapper.find('.alert-danger').exists()).to.equal(true)
    })

    it('Simulates click events', () => {
        const fn = sinon.spy()
        const wrapper = mount(<BSAlert visible= { true } onCloseClick={fn} />)
        wrapper.find('button').simulate('click')
        expect(fn).to.have.property('callCount', 1)
    })
})
