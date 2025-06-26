import React from "react";

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  filteredLength: number;
  itemsPerPage: number;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  filteredLength,
  itemsPerPage,
}: Props) => {
  return (
    <div className="mt-6 flex justify-center gap-2">
      {Array.from(
        { length: Math.ceil(filteredLength / itemsPerPage) },
        (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
