import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import useFormattedDate from "../hooks/useFormattedDate";
import { useDispatch, useSelector } from "react-redux";
import { selectGallery } from "../store/galleries/selectors";
import {
  createComment,
  getGallery,
  deleteGallery,
} from "../store/galleries/slice";
import { format } from "date-fns";
import {
  selectIsAuthenticated,
  selectActiveUser,
} from "../store/auth/selectors";

export default function Gallery() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const gallery = useSelector(selectGallery);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const date = useFormattedDate(
    gallery ? gallery.created_at : "",
    "dd-MM-yyyy HH:mm"
  );
  const history = useHistory();
  const activeUser = useSelector(selectActiveUser);

  const [newComment, setNewComment] = useState({ content: "" });

  useEffect(() => {
    dispatch(getGallery(id));
  }, [id, dispatch]);

  const handleDeleteGallery = () => {
    const response = prompt(
      "Are you sure you want to delete your gallery? If so, type'yes' "
    );
    if (response !== "yes") {
      return;
    }
    dispatch(deleteGallery(id));
    setTimeout(() => {
      history.push("/galleries/my-gallery");
    }, 1500);
  };

  const handleContentChange = (e) => {
    setNewComment({ ...newComment, content: e.target.value });
  };

  const handleAddNewComment = (e) => {
    e.preventDefault();
    dispatch(createComment({ content: newComment, galleryId: id }));
    setNewComment({ content: "" });
  };

  return (
    <div>
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
        {gallery ? (
          <>
            <h1 style={{ padding: "10px" }}>{gallery.title}</h1>

            <h2 style={{ padding: "10px" }}>
              <Link to={`/authors/${gallery?.user?.id}`}>
                {gallery?.user?.firstName} {gallery?.user?.lastName}
              </Link>
            </h2>

            {date === "unknown" ? (
              <div style={{ padding: "10px" }}>Unknown date</div>
            ) : (
              <div style={{ padding: "10px" }}>Created at: {date}</div>
            )}

            <div style={{ padding: "10px" }}>
              {gallery.images && gallery.images.length
                ? gallery.images.map((image, index) => (
                    <div key={image.id}>
                      <a key={index} target="_blank" href={image.url}>
                        <img
                          key={image.id}
                          src={image.url}
                          alt="Gallery carousel element"
                          style={{ maxHeight: "768px", maxWidth: "1024px" }}
                        />
                      </a>
                    </div>
                  ))
                : "No images found"}
            </div>
            <div>
              {gallery && gallery.description ? (
                <p>{gallery.description}</p>
              ) : (
                <p>No Descripton</p>
              )}
            </div>
            {activeUser && activeUser.id === gallery.user_id ? (
              <Link to={`/edit-gallery/${gallery.id}`}>Edit Gallery</Link>
            ) : (
              <></>
            )}
            {activeUser && activeUser.id === gallery.user_id ? (
              <button onClick={handleDeleteGallery}>Delete gallery</button>
            ) : (
              <></>
            )}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

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
        {gallery && gallery.comments ? (
          <>
            {gallery.comments.length ? <h4>Comments</h4> : <h4>No Comments</h4>}
            <ul style={{ listStyleType: "none" }}>
              {gallery.comments.map((comment) => (
                <li key={comment.id} id={`comment${comment.id}`}>
                  <div>
                    {comment.user.first_name} {comment.user.last_name}
                  </div>
                  <div>
                    {format(new Date(comment.created_at), "dd-MM-yyyy HH:mm")}
                  </div>
                  <p>{comment.content}</p>) : (<></>)
                </li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}

        {isAuthenticated && (
          <form onSubmit={handleAddNewComment}>
            <textarea
              required
              rows="4"
              cols="50"
              onChange={handleContentChange}
              value={newComment.content}
              placeholder="Enter comment"
            />
            <button>Create comment</button>
          </form>
        )}
      </div>
    </div>
  );
}
