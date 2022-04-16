import axios from "axios";
import React, { useEffect, useState } from "react";
interface iNoteLists {
  title: String;
  description: String;
  link: String;
  category: String;
  newCategory?: String;
}
[];

export default function () {
  const [lists, setLists] = useState<iNoteLists>();
  useEffect(() => {
    axios
      .get("http://localhost:4300/form/noteLists")
      .then((response) => {
        // console.log(response.data);
        const data = response.data;
        console.log(data);
        setLists(data);
      })
      .catch((error) => console.error(error));
  }, []);
  console.log(lists);
  return (
    <div>
      <h1>Bookmars</h1>
    </div>
  );
}
