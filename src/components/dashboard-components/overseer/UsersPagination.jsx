/* eslint-disable react/prop-types */
// src/Pagination.js
const UsersPagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationItems = () => {
    let pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage < 3) {
        pages = [1, 2, 3, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return pages;
  };

  return (
    <div className="flex space-x-[21px] text-gray-500">
      {getPaginationItems().map((page, index) => (
        <button
          key={index}
          className={`font-lato text-[15px] font-medium ${
            page === currentPage
              ? "text-white"
              : "text-[#454545] hover:text-white"
          }`}
          onClick={() => onPageChange(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
export default UsersPagination;
