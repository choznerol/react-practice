import React from 'react'
import RingLoader from './RingLoader'

const LoadingCard = () => (
    <div className="card bg-dark text-white border-secondary">
        <div className="card-body d-flex flex-column justify-content-center align-items-center p-5">
            <RingLoader loading={ true } className="ring-loader-primary mb-3" size="100" />
            <div>載入中...</div>
        </div>
    </div>
)

export default LoadingCard;
