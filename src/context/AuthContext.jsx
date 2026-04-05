import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@codexveer.com', password: 'admin123', role: 'Admin', avatar: 'A' },
  { id: 2, name: 'Manager User', email: 'manager@codexveer.com', password: 'manager123', role: 'Manager', avatar: 'M' },
  { id: 3, name: 'Intern User', email: 'intern@codexveer.com', password: 'intern123', role: 'Intern', avatar: 'I' },
  { id: 4, name: 'John Doe', email: 'user@codexveer.com', password: 'user123', role: 'User', avatar: 'J' },
];

function generateMockToken(user) {
  const payload = { id: user.id, email: user.email, role: user.role, exp: Date.now() + 86400000 };
  return btoa(JSON.stringify(payload));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('codexveer_token');
    const storedUser = localStorage.getItem('codexveer_user');
    if (token && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const payload = JSON.parse(atob(token));
        if (payload.exp > Date.now()) {
          setUser(parsed);
        } else {
          localStorage.removeItem('codexveer_token');
          localStorage.removeItem('codexveer_user');
        }
      } catch {
        localStorage.removeItem('codexveer_token');
        localStorage.removeItem('codexveer_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password' };

    const token = generateMockToken(found);
    const userData = { id: found.id, name: found.name, email: found.email, role: found.role, avatar: found.avatar };

    localStorage.setItem('codexveer_token', token);
    localStorage.setItem('codexveer_user', JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const register = (name, email, password, role = 'User') => {
    const exists = MOCK_USERS.find(u => u.email === email);
    if (exists) return { success: false, error: 'Email already registered' };

    const newUser = {
      id: MOCK_USERS.length + 1,
      name,
      email,
      password,
      role,
      avatar: name.charAt(0).toUpperCase(),
    };
    MOCK_USERS.push(newUser);

    const token = generateMockToken(newUser);
    const userData = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, avatar: newUser.avatar };

    localStorage.setItem('codexveer_token', token);
    localStorage.setItem('codexveer_user', JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('codexveer_token');
    localStorage.removeItem('codexveer_user');
    setUser(null);
  };

  const hasRole = (...roles) => user && roles.includes(user.role);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;
