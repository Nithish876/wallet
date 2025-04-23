// Define the User type which represents the shape of a user object.
export interface User {
  id: string; // Unique identifier for the user, typically the UID from Firebase
  email: string; // User's email address
  name: string; // User's display name
  friendCode: string; // Unique code for the user (could be used for friend requests or sharing)
  friends: string[]; // List of friend IDs (user IDs)
}

// Define the AuthContextType for the context API, which includes the user state, loading state, and auth functions.
export interface AuthContextType {
  user: User | null; // The user object or null if not authenticated
  loading: boolean; // Whether the authentication status is still loading
  login: (email: string, password: string) => Promise<void>; // Function to log the user in
  register: (email: string, password: string) => Promise<void>; // Function to register a new user
  logout: () => Promise<void>; // Function to log the user out
}
