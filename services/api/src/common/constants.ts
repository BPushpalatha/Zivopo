export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'zivopo-default-secret',
  expiresIn: '15m',
  refreshTokenExpiresIn: '7d',
} as const;
