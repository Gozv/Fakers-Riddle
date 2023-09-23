import { create } from 'zustand'

const useAuth = create((set) => ({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  login: () =>
    set(() => ({ 
      isAuthenticated: true,
      accessToken: window.localStorage.getItem('token'), 
      refreshToken: window.localStorage.getItem('refreshToken')
    })),
  logout: () =>
    set(() => ({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
    })),
  
}));

export default useAuth
