import { useEffect, useState } from "react";
import Card from "./Card";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch data when page OR searchTerm changes
  useEffect(() => {
    setIsFetching(true);
    // Add search query if searching
    const timer = setTimeout(() => {
      // Build URL dynamically
      let url = `${API_URL}?page=${currentPage}`;

      if (searchTerm) {
        url += `&q=${searchTerm}`;
      }
      // Add page number

      console.log("Fetching:", url); // See what URL we're calling

      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          setData(result.data);
          setTotalPages(result.last_page);
          setTotal(result.total);
          setLoading(false);
          setIsFetching(false);
          console.log(result);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
          setIsFetching(false);
        });
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage, searchTerm]); // Re-fetch when either changes

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading)
    return (
      <div className="loader h-full p-8">
        Wait a moment... We are fetching your data it may take a while!
      </div>
    );
  if (error) return <div className="p-8">Error: {error.message}</div>;

  return (
    <div className="wrapper">
      <h1 className="mb-4 text-3xl font-bold">Plant Database</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search plants (e.g., monstera)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full rounded-lg border p-3"
      />

      {/* Results Info */}
      <p className="mb-4">
        {searchTerm ? (
          <>Showing results for "{searchTerm}" - </>
        ) : (
          <>Browsing all plants - </>
        )}
        Page {currentPage} of {totalPages} ({total} total plants)
      </p>

      {/* No Results */}
      {data.length === 0 ? (
        <p className="text-gray-500">
          No plants found. Try a different search!
        </p>
      ) : (
        <>
          {/* Plant Cards */}
          <div
            className={` ${isFetching ? "opacity-50" : "opacity-100"} mb-6 grid auto-rows-auto grid-cols-1 gap-4 transition-opacity duration-300 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
          >
            {data.map((plant) => (
              <Card
                key={plant.id}
                id={plant.id}
                common_name={plant.common_name}
                scientific_name={plant.scientific_name}
                default_image={plant.default_image}
                other_name={plant.other_name}
                family={plant.family}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1 || isFetching}
              className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages || isFetching}
              className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
