/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Graph from "./graph";

export function Paper() {
  const handle = useParams();
  const [paper, setPaper] = useState(null);
  useEffect(() => {
    (async () => {
      let pap = await axios.get(
        `https://citesentiment-backend.onrender.com/api/papers/${handle.handle}`,
        {
          headers: {
            Authorization: `Bearer ${document.cookie
              .match("(^|;)\\s*" + "jwt" + "\\s*=\\s*([^;]+)")
              ?.pop()}`,
          },
        }
      );
      setPaper(pap.data.data.paper);
    })();
  }, []);
  return (
    <div className="w-full md:w-[75vw] lg:w-[82vw]">
      {paper && <Graph paper={paper} />}
    </div>
  );
}
