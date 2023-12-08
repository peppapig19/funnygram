import React from 'react';

import './Message.scss';

interface MessageProps {
    text: string;
}

const Message = (props: MessageProps) => {
    const { text } = props;

    if (text === '') {
        return false;
    }

    return (
        <p className='message'>{text}</p>
    );
}

export default Message;