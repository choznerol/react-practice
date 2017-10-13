import React from 'react'
import PropTypes from 'prop-types'
import { BS_STYLES } from '../constants'


const BSAlert = (props) => {
    const bs_style = BS_STYLES.includes(props.bs_style) ? props.bs_style : 'primary'

    return props.visible ? (
        <section className="bs-alert-wrap">

            {/* Bootstrap Alert 元件 (goo.gl/dT5y5T) */}
            <div className={`bs-alert alert alert-${bs_style} alert-dismissible fade show`} role="alert">

                {/* 關閉按鈕 */}
                <button type="button" className="close" aria-label="Close" onClick={() => props.onCloseClick()}>
                    <span aria-hidden="true">&times;</span>
                </button>

                {/* 文字內容 */}
                { props.text }

            </div>

        </section>
    ) : null
}


BSAlert.propTypes = {

    // Alert 是否顯示
    visible: PropTypes.bool.isRequired,

    // 文字內容
    text: PropTypes.string,

    // Bootstrap 顏色風格（'primary', 'warning', 'success'...)
    bs_style: PropTypes.string,

    // 關閉按鈕 callback
    onCloseClick: PropTypes.func
}


BSAlert.defaultProps = {
    visible: false,
    bs_style: 'primary'
}

export default BSAlert
