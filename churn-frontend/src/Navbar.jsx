import React from 'react';
import logo from './assets/image.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav style={styles.navbar}>
        {/* Left: Logo and Brand */}
        <div style={styles.left}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <span style={styles.title}>CHURN PREDICTOR</span>
        </div>

        {/* Right: Nav Links */}
        <div style={styles.right}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/banking" style={styles.link}>Banking</Link>
          <Link to="/telecom" style={styles.link}>Telecom</Link>
          <Link to="/retail" style={styles.link}>Retail</Link>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div style={{ height: '30px' }}></div>
    </>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '80px',
    backgroundColor: '#3b00dd', 
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 3rem',
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '45px',
    marginRight: '12px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
  },
  right: {
    display: 'flex',
    gap: '2rem',
  },
  link: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'color 0.2s ease-in-out',
  },
};

export default Navbar;
