import React, { Component } from 'react'
import PropTypes from 'prop-types'
import assign from 'domkit/appendVendorPrefix'
import insertKeyframesRule from 'domkit/insertKeyframesRule'

/**
 * @type {Object}
 */
var rightRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'

    },
    '100%': {
        transform: 'rotateX(180deg) rotateY(360deg) rotateZ(360deg)'
    }
};

/**
 * @type {Object}
 */
var leftRotateKeyframes = {
    '0%': {
        transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
    },
    '100%': {
        transform: 'rotateX(360deg) rotateY(180deg) rotateZ(360deg)'
    }
};

/**
 * @type {String}
 */
var rightRotateAnimationName = insertKeyframesRule(rightRotateKeyframes);

/**
 * @type {String}
 */
var leftRotateAnimationName = insertKeyframesRule(leftRotateKeyframes);

const Loader = (props) => {

    /**
     * @param {String} size
     * @return {Object}
     */
    const getCircleStyle = (size) => {
        return {
            width: size,
            height: size,
            border: size/10 +'px solid ' + props.color,
            opacity: 0.4,
            borderRadius: '100%',
            verticalAlign: props.verticalAlign
        };
    }

    /**
     * @param  {Number} i
     * @return {Object}
     */
    const getAnimationStyle = (i) => {
        var animation = [i==1? rightRotateAnimationName: leftRotateAnimationName, '2s', '0s', 'infinite', 'linear'].join(' ');
        var animationFillMode = 'forwards';
        var perspective = '800px';

        return {
            perspective: perspective,
            animation: animation,
            animationFillMode: animationFillMode
        };
    }

    /**
     * @param  {Number} i
     * @return {Object}
     */
    const getStyle = (i) => {
        var size = parseInt(props.size);

        if (i) {
            return assign(
                getCircleStyle(size),
                getAnimationStyle(i),
                {
                    position: 'absolute',
                    top: 0,
                    left: 0
                }
            );
        }

        return {
            width: size,
            height: size,
            position: 'relative'
        };
    }

    /**
     * @param  {Boolean} loading
     * @return {ReactComponent || null}
     */
    const renderLoader = (loading) => {
        if (loading) {
            return (
                <div id={props.id} className={props.className}>
                    <div style={getStyle(0)}>
                        <div style={getStyle(1)} className="ring-loader__circle"></div>
                        <div style={getStyle(2)} className="ring-loader__circle"></div>
                    </div>
                </div>
            );
        }

        return null;
    }

    return renderLoader(props.loading);
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
    size: '60px'
}

export default Loader
