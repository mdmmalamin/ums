const dateFormat = (date: string) => {
  return new Date(date).toLocaleDateString();
};

export default dateFormat;
