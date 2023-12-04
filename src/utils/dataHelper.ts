export const transformApplicationData = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    }));
  }

  return {
    ...data,
    createdAt: new Date(data.createdAt),
  };
};
