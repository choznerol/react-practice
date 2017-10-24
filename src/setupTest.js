import raf from './tempPolyfill'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import { expect } from 'chai'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.shallow = shallow
global.render = render
global.mount = mount
global.toJson = toJson
global.expect = expect

// temp polyfill (https://github.com/facebookincubator/create-react-app/issues/3199)
global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0)
}

// Fail tests on any warning
console.error = message => {
   throw new Error(message)
}
