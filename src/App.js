import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Signup specific validations
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // You would typically make an API call here
      console.log('Form submitted:', formData);
      alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  // CSS styles
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    },
    formContainer: {
      width: '100%',
      maxWidth: '400px',
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    },
    title: {
      marginBottom: '24px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#333'
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s ease'
    },
    inputError: {
      border: '1px solid #ff3860'
    },
    errorText: {
      marginTop: '5px',
      fontSize: '12px',
      color: '#ff3860'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4a6bdf',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    toggleText: {
      marginTop: '16px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#666'
    },
    toggleButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#4a6bdf',
      cursor: 'pointer',
      fontSize: '14px',
      textDecoration: 'underline',
      padding: '0',
      marginLeft: '5px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>
          {isLogin ? 'Login to Your Account' : 'Create a New Account'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Name field - only for signup */}
          {!isLogin && (
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                style={{
                  ...styles.input,
                  ...(errors.name ? styles.inputError : {})
                }}
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p style={styles.errorText}>{errors.name}</p>
              )}
            </div>
          )}
          
          {/* Email field */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {})
              }}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p style={styles.errorText}>{errors.email}</p>
            )}
          </div>
          
          {/* Password field */}
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {})
              }}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p style={styles.errorText}>{errors.password}</p>
            )}
          </div>
          
          {/* Confirm Password field - only for signup */}
          {!isLogin && (
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                style={{
                  ...styles.input,
                  ...(errors.confirmPassword ? styles.inputError : {})
                }}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p style={styles.errorText}>{errors.confirmPassword}</p>
              )}
            </div>
          )}
          
          {/* Submit button */}
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3a5ad0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a6bdf'}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        {/* Toggle between login and signup */}
        <div style={styles.toggleText}>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              style={styles.toggleButton}
              onClick={toggleAuthMode}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;