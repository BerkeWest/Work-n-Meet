import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const MessagesPage = () => {
    return (
        <div className='messages'>

            <div className="container">

                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

export default MessagesPage