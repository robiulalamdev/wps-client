import { Link } from "react-router-dom";

const useHighlight = () => {
  const highlightUrl = (text = "", className = "") => {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text?.split(urlPattern).map((part, index) =>
      urlPattern.test(part) ? (
        <Link target="_blank" to={part} key={index} className={className}>
          {part}
        </Link>
      ) : (
        part
      )
    );
  };

  return {
    highlightUrl,
  };
};

export default useHighlight;
