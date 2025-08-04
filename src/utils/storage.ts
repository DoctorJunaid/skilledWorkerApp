// Simple storage utility using React Native's built-in storage
let userStorage: any = {};
let authToken: string | null = null;

export const Storage = {
  // Save user credentials during signup
  saveUser: async (userData: {name: string; email: string; password: string}) => {
    try {
      userStorage[userData.email] = {
        name: userData.name,
        email: userData.email,
        password: userData.password, // In real app, this would be hashed
        createdAt: new Date().toISOString(),
      };
      console.log('User saved:', userStorage[userData.email]);
      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  },

  // Verify login credentials
  verifyLogin: async (email: string, password: string) => {
    try {
      const user = userStorage[email];
      if (user && user.password === password) {
        // Generate simple auth token
        authToken = `token_${email}_${Date.now()}`;
        console.log('Login successful for:', email);
        return { success: true, user, token: authToken };
      }
      return { success: false, message: 'Invalid email or password' };
    } catch (error) {
      console.error('Error verifying login:', error);
      return { success: false, message: 'Login error' };
    }
  },

  // Check if user is logged in
  isLoggedIn: async () => {
    return authToken !== null;
  },

  // Get current user
  getCurrentUser: async () => {
    if (!authToken) return null;
    
    // Extract email from token
    const email = authToken.split('_')[1];
    return userStorage[email] || null;
  },

  // Logout user
  logout: async () => {
    authToken = null;
    console.log('User logged out');
    return true;
  },

  // Get auth token
  getAuthToken: async () => {
    return authToken;
  }
};