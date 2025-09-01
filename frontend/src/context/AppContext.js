import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Initial state
const initialState = {
  services: [],
  loading: false,
  error: null,
  contactForm: {
    isSubmitting: false,
    isSubmitted: false,
  },
  stats: {
    totalInquiries: 0,
    popularServices: [],
  },
  theme: 'light',
  mobileMenuOpen: false,
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SERVICES: 'SET_SERVICES',
  SET_CONTACT_SUBMITTING: 'SET_CONTACT_SUBMITTING',
  SET_CONTACT_SUBMITTED: 'SET_CONTACT_SUBMITTED',
  SET_STATS: 'SET_STATS',
  TOGGLE_THEME: 'TOGGLE_THEME',
  TOGGLE_MOBILE_MENU: 'TOGGLE_MOBILE_MENU',
  RESET_ERROR: 'RESET_ERROR',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actionTypes.SET_SERVICES:
      return {
        ...state,
        services: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.SET_CONTACT_SUBMITTING:
      return {
        ...state,
        contactForm: {
          ...state.contactForm,
          isSubmitting: action.payload,
        },
      };
    case actionTypes.SET_CONTACT_SUBMITTED:
      return {
        ...state,
        contactForm: {
          ...state.contactForm,
          isSubmitted: action.payload,
          isSubmitting: false,
        },
      };
    case actionTypes.SET_STATS:
      return {
        ...state,
        stats: action.payload,
      };
    case actionTypes.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case actionTypes.TOGGLE_MOBILE_MENU:
      return {
        ...state,
        mobileMenuOpen: !state.mobileMenuOpen,
      };
    case actionTypes.RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const actions = {
    // Set loading state
    setLoading: (loading) => {
      dispatch({ type: actionTypes.SET_LOADING, payload: loading });
    },

    // Set error
    setError: (error) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: error });
    },

    // Reset error
    resetError: () => {
      dispatch({ type: actionTypes.RESET_ERROR });
    },

    // Fetch services
    fetchServices: async () => {
      try {
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
        const response = await api.get('/services');
        dispatch({ type: actionTypes.SET_SERVICES, payload: response.data.data });
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      }
    },

    // Get single service
    getService: async (id) => {
      try {
        const response = await api.get(`/services/${id}`);
        return response.data.data;
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
        throw error;
      }
    },

    // Submit contact form
    submitContactForm: async (formData) => {
      try {
        dispatch({ type: actionTypes.SET_CONTACT_SUBMITTING, payload: true });
        const response = await api.post('/contact', formData);
        dispatch({ type: actionTypes.SET_CONTACT_SUBMITTED, payload: true });
        toast.success('Message sent successfully! Redirecting to WhatsApp...');
        
        // Redirect to WhatsApp after a short delay
        setTimeout(() => {
          if (response.data.data.whatsappUrl) {
            window.open(response.data.data.whatsappUrl, '_blank');
          }
        }, 2000);
        
        return response.data;
      } catch (error) {
        dispatch({ type: actionTypes.SET_CONTACT_SUBMITTING, payload: false });
        throw error;
      }
    },

    // Quick WhatsApp contact
    quickWhatsAppContact: async (name, service, phone = '') => {
      try {
        const response = await api.post('/inquiries/quick-contact', {
          name,
          service,
          phone,
        });
        
        toast.success('Connecting you to WhatsApp...');
        
        // Redirect to WhatsApp
        setTimeout(() => {
          if (response.data.data.whatsappUrl) {
            window.open(response.data.data.whatsappUrl, '_blank');
          }
        }, 1000);
        
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    // Fetch stats
    fetchStats: async () => {
      try {
        const response = await api.get('/inquiries/stats');
        dispatch({ type: actionTypes.SET_STATS, payload: response.data.data });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    },

    // Toggle theme
    toggleTheme: () => {
      dispatch({ type: actionTypes.TOGGLE_THEME });
    },

    // Toggle mobile menu
    toggleMobileMenu: () => {
      dispatch({ type: actionTypes.TOGGLE_MOBILE_MENU });
    },

    // Seed services (for development)
    seedServices: async () => {
      try {
        await api.post('/services/seed');
        toast.success('Services seeded successfully!');
        actions.fetchServices();
      } catch (error) {
        console.error('Failed to seed services:', error);
      }
    },
  };

  // Load services on mount
  useEffect(() => {
    actions.fetchServices();
    actions.fetchStats();
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  const value = {
    ...state,
    ...actions,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
