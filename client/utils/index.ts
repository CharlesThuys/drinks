export const checkPictureUrl = async (image: string) => {
  if (!image) {
    return false;
  }

  try {
    const response = await fetch(image);
    return response.ok;
  } catch (error) {
    return false;
  }
};