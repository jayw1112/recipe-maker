import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { Session } from 'next-auth'

// Define the custom session structure
interface CustomSession extends Session {
  user: {
    id?: string // Optional chaining if unsure user will always have id
  } & Session['user']
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    session: async ({ session, token }: { session: Session; token: any }) => {
      const customSession: CustomSession = session as CustomSession
      if (token.sub) {
        customSession.user.id = token.sub // Typically, 'sub' is the user ID in JWT
      }
      return customSession
    },
  },
  // More configurations and providers can be added here
}

export default NextAuth(authOptions)
