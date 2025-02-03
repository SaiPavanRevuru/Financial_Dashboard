// import type { NextAuthConfig } from 'next-auth';
// import CredentialsProvider from "next-auth/providers/credentials";
 
// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
  
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return Response.redirect(new URL('/login', nextUrl)); // Redirect instead of returning false
//       }
  
//       if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl));
//       }
  
//       return true;
//     },
//   },
  
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // Validate user credentials (replace with real authentication logic)
//         if (credentials.email === "user@nextmail.com" && credentials.password === "123456") {
//           return { id: "1", name: "Test User", email: credentials.email };
//         }
//         return null;
//       },
//     }),
//   ],
// } satisfies NextAuthConfig;

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl)); // Redirect unauthenticated users
      }

      if (!isOnDashboard && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl)); // Redirect logged-in users
      }

      return true;
    },
  },
  providers: [], // Add providers later
} satisfies NextAuthConfig;
