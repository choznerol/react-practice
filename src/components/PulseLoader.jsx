/**
 * Inspired by halogen from yuanyan
 * GitHub: https://github.com/yuanyan/halogen
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

/**
* @type {Object}
*/
const keyframes = {
    '0%': {
        transform: 'scale(1)',
        opacity: 1
    },
    '45%': {
        transform: 'scale(0.1)',
        opacity: 0.7
    },
    '80%': {
        transform: 'scale(1)',
        opacity: 1
    }
}

/**
* @type {String}
*/
const animationName = insertKeyframesRule(keyframes)

const Loader = (props) => {

    /**
    * @return {Object}
    */
    const getBallStyle = () => {
        return {
            backgroundColor: props.color,
            width: props.size,
            height: props.size,
            margin: props.margin,
            borderRadius: '100%',
            verticalAlign: props.verticalAlign
        }
    }

    /**
    * @param  {Number} i
    * @return {Object}
    */
    const getAnimationStyle = (i) => {
        const animation = [animationName, '0.75s', (i * 0.12) + 's', 'infinite', 'cubic-bezier(.2,.68,.18,1.08)'].join(' ')
        const animationFillMode = 'both'

        return {
            animation: animation,
            animationFillMode: animationFillMode
        }
    }

    /**
    * @param  {Number} i
    * @return {Object}
    */
    const getStyle = (i) => {
        return assign(
            getBallStyle(i),
            getAnimationStyle(i),
            {
                display: 'inline-block'
            }
        )
    }

    /**
    * @param  {Boolean} loading
    * @return {ReactComponent || null}
    */
    const renderLoader = (loading) => {
        if (loading) {
            return (
                <div id={props.id} className={props.className}>
                    <div style={getStyle(1)}></div>
                    <div style={getStyle(2)}></div>
                    <div style={getStyle(3)}></div>
                </div>
            )
        }

        return null
    }

    return renderLoader(props.loading)
}

Loader.propTypes = {
    loading: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.string,
    margin: PropTypes.string
}
Loader.defaultProps = {
    loading: true,
    color: '#ffffff',
    size: '15px',
    margin: '2px'
}

export default Loader
