export default function Card({
  id,
  common_name,
  scientific_name,
  default_image,
  other_name,
  family,
}) {
  return (
    <div
      className={
        "row-span-9 grid cursor-pointer grid-rows-subgrid rounded-2xl border-2 border-gray-400 p-5 duration-300 hover:scale-105"
      }
    >
      <h2>
        <strong>{common_name}</strong>
      </h2>
      <p>
        <strong>Scientific:</strong> {scientific_name.join(", ")}
      </p>
      <p>
        <strong>Other names:</strong>{" "}
        {other_name.length > 0 ? (
          other_name.join(",")
        ) : (
          <span>There are no other names for this species.</span>
        )}
      </p>
      <p>
        <strong>Family:</strong> {family}
      </p>
      <p>
        <strong>ID:</strong> {id}
      </p>
      {default_image ? ( // && OPERATOR - show or nothing  //ternary - ? show : alternative
        <img
          src={default_image.original_url} // Access the nested value
          alt={common_name}
          className="h-48 w-full rounded-lg object-cover"
        />
      ) : (
        <img src="/no-image.webp" className="mb-4 h-48 w-full object-center" />
      )}
    </div>
  );
}
