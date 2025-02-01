import React, { useEffect, useRef, useState } from 'react';
import { useMsgStore } from '../store/useMsgStore';
import Msginput from './Msginput.jsx';
import { X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
const ChatBox = () => {
    const { messages, selectedUser, getMessages,selectUser,listenToMessages,stopListeningToMessages } = useMsgStore();
    const {onlineUsers}=useAuthStore()
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id);
            listenToMessages();
            return () => {
                stopListeningToMessages();
            }
        }
    }, [selectedUser,listenToMessages,getMessages,messages]);


    return (
        <div className="flex-1 flex flex-col bg-gray-800">
            {/* Header with user info */}
            <div className="flex items-center p-4 border-b border-gray-700">
                <img
                    src={selectedUser?.profilePic || '/avatar.png'}
                    alt={selectedUser?.username}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                    <div className="font-semibold text-white">{selectedUser?.username}</div>
                    <div className="text-sm text-gray-400">{onlineUsers?.[selectedUser?._id] ? 'Active now' : 'Offline'}</div>
                </div>
                <X className="ml-auto text-white cursor-pointer" onClick={() => selectUser(null)}/>
            </div>

            {/* Messages Section */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        ref={chatEndRef}
                        className={`flex ${
                            msg.senderId === selectedUser?._id ? 'justify-start' : 'justify-end'
                        }`}
                    >
                        <div
                            className={`max-w-xs px-4 py-2 rounded-lg overflow-hidden break-words whitespace-pre-wrap ${
                                msg.senderId === selectedUser?._id
                                    ? 'bg-gray-700 text-white'
                                    : 'bg-blue-600 text-white'
                            }`}
                        >
                            <p>{msg.text}</p>
                            <span className="text-xs text-gray-400 ml-2">
                                {new Date(msg.createdAt).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                ))}
                <div  />
            </div>

            {/* Message Input */}
            <Msginput />
        </div>
    );
};

export default ChatBox;
