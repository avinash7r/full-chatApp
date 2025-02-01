import React, { useEffect, useState } from 'react';
import { useMsgStore } from '../store/useMsgStore';
import { User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
const Sidebar = () => {
    const { getUsers, users, selectedUser, selectUser } = useMsgStore();
    const { onlineUsers } = useAuthStore();
    const [onlineUsersOnly,setOnlineUsersOnly]=useState(false)
    useEffect(() => {
        getUsers();
    }, [getUsers]);
    const filteredUsers= onlineUsersOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;
    return (
        <aside className="h-full w-64 bg-gray-900 text-white flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <User className="text-gray-300" />
                    <span className="font-semibold">Contacts</span>
                </div>
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={onlineUsersOnly} onChange={(e) => setOnlineUsersOnly(e.target.checked)} className="text-gray-300" />
                    <span className="text-sm">Online only</span>
                </label>
            </div>
            <div className="flex-1 overflow-y-auto">
                {filteredUsers.map((user) => {
                    const isSelected = user._id === selectedUser?._id;
                    const isOnline = onlineUsers.includes(user._id)
                    return (
                        <div
                            key={user._id}
                            className={`flex items-center p-3 cursor-pointer transition-colors ${
                                isSelected ? 'bg-gray-700' : 'hover:bg-gray-800'
                            }`}
                            onClick={() => selectUser(user)}
                        >
                            <div className="relative">
                                <img
                                    src={user.profilePic || '/avatar.png'}
                                    alt={user.username}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                {isOnline && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                                )}
                            </div>
                            <div className="ml-3">
                                <span className="font-medium">{user.username}</span>
                                <div className="text-sm text-gray-400">
                                    {isOnline ? 'Online' : 'Offline'}
                                </div>
                            </div>
                        </div>
                    );
                })}
                {filteredUsers.length === 0 && (
                    <div className="text-center text-gray-500 py-4">No users available</div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
