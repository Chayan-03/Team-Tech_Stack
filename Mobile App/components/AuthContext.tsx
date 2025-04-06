// import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
// import { onAuthStateChanged, signOut, User } from 'firebase/auth';
// import { auth } from '../config/firebase';
// import { router } from 'expo-router';

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       router.replace('/login');
//     } catch (error) {
//       console.error('Error signing out: ', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };