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

export const shortenId = (id) => {
  const maxLength = 6;
  if (id.length > maxLength) {
    return `${id.substring(0, maxLength)}...`;
  }
  return id;
};

export const handleCopyClick = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    console.log("text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
