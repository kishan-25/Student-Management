
const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

let currentUser = null;

export const login = async (credentials) => {

  await delay();
  

  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required');
  }
  

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(credentials.email)) {
    throw new Error('Invalid email format');
  }
  

  if (credentials.password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
 
  if (Math.random() < 0.1) {
    throw new Error('Authentication failed');
  }
  
  
  const user = {
    uid: 'user_' + Math.random().toString(36).substr(2, 9),
    email: credentials.email,
    name: credentials.email.split('@')[0],
    emailVerified: true,
    createdAt: new Date().toISOString()
  };

  currentUser = user;
  
  return user;
};


export const logout = async () => {

  await delay();
  

  if (Math.random() < 0.05) {
    throw new Error('Logout failed');
  }
  
 
  currentUser = null;
  
  return true;
};


export const getCurrentUser = () => {
  return currentUser;
};

export const register = async (userData) => {

  await delay();

  if (!userData.email || !userData.password) {
    throw new Error('Email and password are required');
  }
 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    throw new Error('Invalid email format');
  }

  if (userData.password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  if (Math.random() < 0.1) {
    throw new Error('Registration failed');
  }
  
  const user = {
    uid: 'user_' + Math.random().toString(36).substr(2, 9),
    email: userData.email,
    name: userData.name || userData.email.split('@')[0],
    emailVerified: false,
    createdAt: new Date().toISOString()
  };
  

  currentUser = user;
  
  return user;
};