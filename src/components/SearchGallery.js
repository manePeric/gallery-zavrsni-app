import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchUserId,
  selectSearchTerm,
} from "../store/galleries/selectors";
import { setSearchTerm, getGalleries } from "../store/galleries/slice.js";

export default function SearchGallery() {
  const term = useSelector(selectSearchTerm);
  const userId = useSelector(selectSearchUserId);
  const dispatch = useDispatch();

  function handleChangeSearchTerm(event) {
    dispatch(setSearchTerm(event.target.value));
  }

  function handleSearch() {
    dispatch(getGalleries({ page: 1, term: term, userId: userId }));
  }

  return (
    <div>
      <input
        type="text"
        onChange={handleChangeSearchTerm}
        placeholder="Input search term here"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
