import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';

const Navbar = () => {
  const { logout ,authUser} = useAuthStore();
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#343a40', color: '#fff' }}>
      <Link to="/" style={{ marginRight: '1rem', color: '#fff' }}>Home</Link>
      <div>
        <Link to="/profile" style={{ marginRight: '1rem', color: '#fff' }}>Profile</Link>
        <Link to="/setting" style={{ marginRight: '1rem', color: '#fff' }}>Setting</Link>
        {authUser ? (
          <button onClick={logout} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '1rem', color: '#007bff' }}>Login</Link>
            <Link to="/signup" style={{ marginRight: '1rem', color: '#007bff' }}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
