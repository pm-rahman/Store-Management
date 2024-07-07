// @ts-nocheck

import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';

import { createUserWithSubscription } from '@/lib/actions/authActions';
import { getUserByEmail } from '@/lib/authUtil';

export const authOptions = {
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
  callbacks: {
    async signIn({ account, profile }) {
      try {
        if (profile) {
          const name = profile?.name ?? null;
          const email = profile?.email ?? null;
          const formData = {
            name,
            email,
          };

          // Check if an email is available for sign-in
          if (!email) {
            throw new Error('Email is required for sign-in.');
          }

          // Check if a user with the provided email already exists in the database
          const userFound = await getUserByEmail(email);

          // If the user already exists, return the existing user
          if (userFound) return userFound;

          let planId;

          const newUser = await createUserWithSubscription(
            formData, // User data object containing name and email,
            planId
          );

          // Handle OAuth-based sign-up logic here if needed

          // Return the newly created user
          return newUser;
        }
        // Retrieve user's name and email from the authentication provider's profile
      } catch (error) {
        // Handle any errors that occur during the sign-in process
        console.error('An error occurred:', error);

        // You can choose to return an error response or perform other error handling here
      }

      // Return true to indicate successful sign-in
      return true;
    },

    async session({ session, token, user }) {
      // console.log('user:', session, user);
      if (session?.user) {
        session.user.emailVerified = token.emailVerified;
        session.user.id = token.id;
        session.user.teamId = token.teamId;
      }
      // console.log('Team id from session', token);
      
      return session;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.emailVerified = user.emailVerified;
        token.id = user.id;
        token.teamId = user.teamId;
       
      }
      
      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      
      async profile(profile) {
       
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          image: profile.picture,
          emailVerified: true,
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      
      async profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile?.picture?.data?.url,
          emailVerified: true,
        };
      },
    }),
    CredentialsProvider({
      name: 'Sign in with email and password.',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@mail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter password',
        },
      },
      authorize: async (credentials, req) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            user.password = null;
            
            return user;
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  // debug: true,
};

export function getSession() {
  return getServerSession(authOptions);
}
