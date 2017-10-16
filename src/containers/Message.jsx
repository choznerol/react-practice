import React, { Component } from 'react'
import { connect } from 'react-redux'
import BSAlert from '../components/BSAlert'
import { clearMessage } from '../actions'

// Message 的狀態直接依賴於 redux store 的 message 節點
const mapStateToProps = (state) => ({
    ...state.message
})

const mapDispatchToProps = {
    onCloseClick: () => clearMessage()
}

const Message = connect(mapStateToProps, mapDispatchToProps)(BSAlert)

export default Message
