import React from 'react';

const Message = ({ content }) => {
    return (
        <div className="card-header">
            <h5>Message: { content }</h5>
        </div>
    )
}

export default Message;
