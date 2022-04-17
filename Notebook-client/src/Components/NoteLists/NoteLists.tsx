import axios from "axios";
import React, { useEffect, useState } from "react";
import AllBookmarks from  "../Bookmarks/AllBookmarks"
interface iNoteLists {
  title: String;
  description: String;
  link: String;
  category: String;
  newCategory?: String;
}
[];


export default function ({isModified}) {
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
  }, [isModified]);
  
  return (
    <div>
      <h1>All Bookmarks</h1>
      <AllBookmarks/>
    </div>
  );
}
