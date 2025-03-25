import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: !!localStorage.getItem('token'), 
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '', 
    user: {},  
    status: '',
    loading: false,
    errorMessage: '',
    phoneNumber:'',
  }),

  actions: {
    setLoading(value) {
      this.loading = value;
    },
    setErrorMessage(message) {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    },

    async login(credentials) {
      this.setLoading(true);
      this.status = 'loading';
      try {
        const response = await axios.post('/auth/authenticate/admin', credentials);
        const { token, role, phoneNumber } = response.data; 

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        this.token = token;
        this.role = role; 
        this.phoneNumber = phoneNumber;
       
        this.user = response.data.user;
        this.isAuthenticated = true;
        this.status = 'success';
      } catch (error) {
        this.status = 'error';
        this.isAuthenticated = false;
        if (error.response && error.response.status === 401) {
          this.setErrorMessage('Invalid username or password');
        } else {
          this.setErrorMessage('Login failed');
        }
        console.error('Login failed:', error.response?.data || error.message);
        localStorage.removeItem('token');
      } finally {
        this.setLoading(false);
      }
    },

    async register(user) {
      this.status = 'loading';
      this.setLoading(true);
      try {
        const response = await axios.post('/auth/register/admin', user);
        const token = response.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        this.token = token;
        this.user = response.data.user;
        this.isAuthenticated = false;
        this.status = 'success';
      } catch (error) {
        this.status = 'error';
        this.setErrorMessage('Registering failed');
        localStorage.removeItem('token');
        console.error('Registration failed:', error);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.token = '';
      this.user = {};
      this.role = ''; 
      this.phoneNumber='';
      this.status = '';
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      delete axios.defaults.headers.common['Authorization'];
    },
  },

  getters: {
    authStatus: (state) => state.status,
    getRole: (state) => state.role, 
  },
});

export default useAuthStore;