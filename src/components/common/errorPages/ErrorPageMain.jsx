/* eslint-disable react/prop-types */
import ErrorPage from "../../ErrorPage/ErrorPage";
import NotFoundHeader from "../../shared/headers/NotFoundHeader";

const ErrorPageMain = ({ showHeader = true }) => {
  return (
    <div className="w-full h-full">
      {showHeader && <NotFoundHeader />}
      <ErrorPage />
    </div>
  );
};

export default ErrorPageMain;
