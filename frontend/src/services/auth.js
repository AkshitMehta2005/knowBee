export const isAuthenticated = async () => {
  try {
    const response = await getCurrentUser();
    return response.data.user;
  } catch (error) {
    return null;
  }
};