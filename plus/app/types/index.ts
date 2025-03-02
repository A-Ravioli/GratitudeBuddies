export interface User {
  id: string;
  username: string;
  name: string;
}

export interface BulletPoint {
  id: string;
  text: string;
  imageUri?: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  date: string;
  bullets: BulletPoint[];
  createdAt: number; // timestamp
}

export interface AppState {
  currentUser: User | null;
  posts: Post[];
  friends: User[];
  hasPostedToday: boolean;
} 