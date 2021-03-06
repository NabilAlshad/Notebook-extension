import axios from "axios";
import React, { useEffect, useState } from "react";
import AllBookmarks from "../Bookmarks/AllBookmarks";
interface iNoteLists {
  title: String;
  description: String;
  link: String;
  category: String;
  newCategory?: String;
}
[];

const NoteLists = ({ isModified, setIsModified }) => {
  const [lists, setLists] = useState<iNoteLists>();
  useEffect(() => {
    axios
      .get("http://localhost:4300/form/noteLists")
      .then((response) => {
        // console.log(response.data);
        const data = response.data;
        // console.log(data);
        setLists(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1 className="text-center pt-2  underline">All Bookmarks</h1>
      <AllBookmarks isModified={isModified} setIsModified={setIsModified} />
    </div>
  );
};

export default React.memo(NoteLists);
