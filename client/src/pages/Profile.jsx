import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Camera } from 'lucide-react';

const Profile = () => {
  const { authUser, updateProfile } = useAuthStore();
  const [profileImage, setProfileImage] = useState(null);

  const handleUpdateProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Img = reader.result;
      setProfileImage(base64Img);
      await updateProfile({ profileImage: base64Img });
    };
  };
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#121212', 
      color: 'white' 
    }}>
      <div style={{ 
        backgroundColor: '#1e1e1e', 
        padding: '20px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '500px' // Increased width
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1>Profile</h1>
          <p>Your profile information</p>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img 
              src={ profileImage || authUser.profilePic || '/avatar.png'} 
              alt="Profile" 
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }} 
            />
            <input 
              type="file" 
              id="fileInput" 
              style={{ display: 'none' }} 
              onChange={handleUpdateProfile} 
            />
            <label 
              htmlFor="fileInput" 
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '50%',
                padding: '10px',
                cursor: 'pointer'
              }}
            >
              <Camera size={20} />
            </label>
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Username</label>
          <div style={{ 
            backgroundColor: '#2e2e2e', 
            padding: '10px', 
            borderRadius: '10px', 
            marginBottom: '10px',
            textAlign: 'left'
          }}>
            <h2 style={{ margin: 0 }}>{authUser.username}</h2>
          </div>
          <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Email</label>
          <div style={{ 
            backgroundColor: '#2e2e2e', 
            padding: '10px', 
            borderRadius: '10px',
            textAlign: 'left'
          }}>
            <p style={{ margin: 0 }}>{authUser.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;