import { Link } from "react-router-dom";

export default function Card({
  id,
  common_name,
  scientific_name,
  default_image,
  other_name,
  family,
}) {
  return (
    <div className="row-span-6 grid grid-rows-subgrid">
      <div
        className={
          "row-span-6 grid grid-rows-subgrid rounded-2xl border-2 border-gray-400 p-5 duration-300 hover:scale-105"
        }
      >
        <h2 className="text-xl">
          <strong>{common_name}</strong>
        </h2>
        {default_image ? ( // && OPERATOR - show or nothing  //ternary - ? show : alternative
          <img
            src={default_image.original_url} // Access the nested value
            alt={common_name}
            className="h-48 w-full rounded-lg object-cover"
          />
        ) : (
          <img
            src="/no-image.webp"
            className="mb-4 h-48 w-full rounded-lg object-center"
          />
        )}
        <p>
          <strong>Scientific:</strong> <span className="italic">{scientific_name.join(", ")}</span>
        </p>
        <p>
          <strong>Other names:</strong>{" "}
          {other_name.length > 0 ? (
            other_name.join(", ")
          ) : (
            <span>No other names.</span>
          )}
          {/* Arrays always true so we can't use ternary operator
        smth ? true : false , since if we've put array it would always be true no matter what */}
        </p>
        <p>
          <strong>Family:</strong>{" "}
          {family ? <span>{family}</span> : <span>No family</span>}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            <strong>ID:</strong> {id}
          </p>

          <Link className="rounded-2xl bg-green-500 p-2 hover:bg-green-400 duration-300 " to={`/plant/${id}`}>
            See the details
          </Link>
        </div>
      </div>
    </div>
  );
}
