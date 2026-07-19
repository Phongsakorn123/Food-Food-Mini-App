export function createMockAccessToken(username: string) {
  const normalizedUsername = username.trim().toLowerCase() || 'guest';
  const randomToken = Math.random().toString(36).slice(2, 10);

  return `mock_access_${normalizedUsername}_${Date.now()}_${randomToken}`;
}