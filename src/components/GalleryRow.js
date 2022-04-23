import { Link } from "react-router-dom";
import useFormattedDate from "../hooks/useFormattedDate";
export default function GalleryRow({ gallery }) {
  const date = useFormattedDate(gallery.created_at, "dd-MM-yyyy HH:mm");
  return (
    <div>
      {gallery ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "start",
            alignItems: "center",
            border: "solid",
            margin: "5px",
          }}
        >
          <div style={{ padding: "10px" }}>
            <img
              src={gallery?.images[0]?.url}
              width="100"
              height="100"
              alt="Gallery cover"
            />
          </div>
          <div style={{ padding: "10px" }}>
            <Link to={`/galleries/${gallery?.id}`}>{gallery?.title}</Link>
          </div>
          {date === "unknown" ? (
            <div style={{ padding: "10px" }}>Unknown date</div>
          ) : (
            <div style={{ padding: "10px" }}>Created at: {date}</div>
          )}
          <div style={{ padding: "10px" }}>
            By:{" "}
            <Link to={`/authors/${gallery?.user.id}`}>
              {gallery?.user?.firstName} {gallery?.user?.lastName}
            </Link>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
