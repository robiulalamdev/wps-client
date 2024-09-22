const useInputPattern = () => {
  const handleNumber = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const handleUrl = (e, baseUrl) => {
    const inputValue = e.target.value;
    const urlPattern = new RegExp(
      `^${baseUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
    );

    if (!urlPattern.test(inputValue)) {
      e.target.value = "";
    } else {
      e.target.value = inputValue;
    }
  };

  return {
    handleNumber,
    handleUrl,
  };
};

export default useInputPattern;
