const formatCurrency = (value: number) => {
  const options = { style: "currency", currency: "VND" };
  return value.toLocaleString("vi-VN", options);
};

export default formatCurrency;
