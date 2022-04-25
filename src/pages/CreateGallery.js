import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectGallery } from "../store/galleries/selectors";
import { createGallery, editGallery } from "../store/galleries/slice";

export default function CreateGallery() {
  const dispatch = useDispatch();
  const retrievedGallery = useSelector(selectGallery);
  const history = useHistory();
  const { id } = useParams();
  const [newGallery, setNewGallery] = useState({
    title: "",
    description: "",
    images: [],
  });
  const [newImages, setNewImages] = useState([
    {
      url: "",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      if (!retrievedGallery) {
        alert("You cannot edit other people's galleries");
        history.push("/galleries");
        return;
      }
      dispatch(
        editGallery({
          newGallery: {
            galleryId: id,
            title: newGallery.title,
            description: newGallery.description,
            images: newGallery.images,
          },
        })
      );
      setTimeout(() => {
        history.push(`/galleries/${retrievedGallery.id}`);
      }, 1500);
    } else {
      dispatch(createGallery(newGallery));
      setTimeout(() => {
        history.push("/galleries/my-galleries");
      }, 1500);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (id) {
      history.push(`/galleries/${retrievedGallery.id}`);
    } else {
      history.push("/galleries/my-galleries");
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...newImages];
    list[index][name] = value;
    setNewImages(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...newImages];
    list.splice(index, 1);
    setNewImages(list);
  };

  const handleAddClick = () => {
    setNewImages([...newImages, { url: "" }]);
  };

  useEffect(() => {
    setNewGallery({
      ...newGallery,
      images: newImages,
    });
  }, [newImages]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 style={{ padding: "10px" }}>Create Gallery</h2>
        <div style={{ padding: "10px" }}>
          <input
            required
            type="text"
            id="title"
            placeholder="Title"
            value={newGallery?.title}
            onChange={({ target }) =>
              setNewGallery({ ...newGallery, title: target.value })
            }
          />
        </div>
        <div style={{ padding: "10px" }}>
          <textarea
            cols="50"
            rows="4"
            type="text"
            id="description"
            placeholder="Description"
            value={newGallery?.description}
            onChange={({ target }) =>
              setNewGallery({ ...newGallery, description: target.value })
            }
          />
        </div>
        {newImages &&
          newImages.map((x, i) => {
            return (
              <div>
                <input
                  required
                  name="url"
                  value={x.url}
                  placeholder="Image url goes here"
                  onChange={(e) => handleInputChange(e, i)}
                  key={i}
                />
                <span>
                  {newImages?.length !== 1 && (
                    <button onClick={() => handleRemoveClick(i)}>Remove</button>
                  )}
                </span>
                <div>
                  {newImages?.length - 1 === i && (
                    <button onClick={handleAddClick}>Add more</button>
                  )}
                </div>
              </div>
            );
          })}

        <span>
          <button type="submit">{id ? "Edit" : "Submit"}</button>
          <button onClick={handleCancel}>Cancel</button>
        </span>
      </form>
    </div>
  );
}
