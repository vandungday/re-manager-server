export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignTokenPayload {
  userId: number;
}
