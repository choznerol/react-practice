import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class HeroProfile extends Component {
    static propTypes = {
      selectedHeroId: PropTypes.number.isRequired,
      profile: PropTypes.shape(({
        id: PropTypes.number.isRequired,
        str: PropTypes.number.isRequired,
        int: PropTypes.number.isRequired,
        agi: PropTypes.number.isRequired,
        luk: PropTypes.number.isRequired
      })),
      isFetching: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired // connect() 預設會自動注入 dispatch
    }

    render () {
        const { selectedHeroId, isFetching } = this.props

        if (isFetching) {
            // 新增 <FetchingProfile>
            return (<h1>Fetching...</h1>)
        } else {
            return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        {/* 右半邊：可調整 4 種能力值 */}
                        <div className="col">
                            <span className="d-flex justify-content-between mb-2">
                                <b style={{width: '4rem'}}>STR</b>
                                <button className="btn btn-primary">+</button>
                                <b>?</b>
                                <button className="btn btn-primary">-</button>
                            </span>
                            <span className="d-flex justify-content-between mb-2">
                                <b style={{width: '4rem'}}>INT</b>
                                <button className="btn btn-primary">+</button>
                                <b>?</b>
                                <button className="btn btn-primary">-</button>
                            </span>
                            <span className="d-flex justify-content-between mb-2">
                                <b style={{width: '4rem'}}>AGI</b>
                                <button className="btn btn-primary">+</button>
                                <b>?</b>
                                <button className="btn btn-primary">-</button>
                            </span>
                            <span className="d-flex justify-content-between mb-2">
                                <b style={{width: '4rem'}}>LUK</b>
                                <button className="btn btn-primary">+</button>
                                <b>?</b>
                                <button className="btn btn-primary">-</button>
                            </span>
                        </div>
                        {/* 左半邊：顯示剩餘點數及儲存 */}
                        <div className="col d-flex flex-column justify-content-end align-items-end">
                            <b>剩餘點數：?</b>
                            <a href="#" className="btn btn-primary">儲存</a>
                        </div>
                    </div>
                </div>
            </div>
        )
        }
    }
}

const mapStateToProps = state => {
  const { selectedHeroId, profiles } = state

  return {
    selectedHeroId,
    isFetching: profiles['isFetching'],
    profile: profiles.items[selectedHeroId] || undefined
  }
}

export default connect(mapStateToProps)(HeroProfile)
