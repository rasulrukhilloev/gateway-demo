interface DecodedToken {
  userId: number;
  iat: number;
  exp: number;
}

export interface TokenValidationResult {
  isValid: boolean;
  decoded?: DecodedToken;
  error?: string;
}