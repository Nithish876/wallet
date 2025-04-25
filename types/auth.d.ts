export interface User {
  id: string; 
  email: string;  
  name: string;  
  friendCode: string;  
  friends: string[];  
} 

export interface AuthContextType {
  user: User | null;  
  loading: boolean; 
  login: (email: string, password: string) => Promise<void|boolean>; 
  register: (email: string, password: string) => Promise<void>; 
  logout: () => Promise<void>; 
}
