import React, { useState } from 'react';
import { useMsgStore } from '../store/useMsgStore';
import { Send } from 'lucide-react';

const MsgInput = () => {
    const { sendMessage, selectedUser } = useMsgStore();
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() && selectedUser) {
            sendMessage(message, selectedUser._id);
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="p-4 bg-gray-900 border-t border-gray-700 flex items-center">
            <input
                type="text"
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button
                className="ml-4 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                onClick={handleSend}
            >
                <Send className="text-white" />
            </button>
        </div>
    );
};

export default MsgInput;
