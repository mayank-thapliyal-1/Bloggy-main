export interface ResponseFuncs {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}

export interface BlogType {
  _id?: string;
  title?: string;
  userID?: string;
  userName?: string;
  date?: number;
  blog?: string[];
  tags?: string[];
  likes?: string[];
  likeCount?: number;
  image?: string;
  profileImage?: string;
}

export interface LoginCredentialsType {
  userID: string,
  password: string,
}

export interface SignupCredentialsType {
  userID: string,
  userName: string,
  password: string,
  date: number,
  blogs: string[],
  likes: string[],
  profileImage: string,
}