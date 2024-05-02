import React from "react";
import { useState, useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";

const classes = {
  table: {
    border: "1px solid black",
  },
  th: {
    border: "1px solid black",
  },
  td: {
    border: "1px solid black",
  },
};

export default function App() {
  const [count, setCount] = useState([]);
  let text =
    "Google is the most popular company founded by Larry Page and Sergey Brin in Ninteen Nighty Eight. The term Google comes from a mathematical word googol, which means one with a hundred zeros.Google is an internet savvy market that has created a global impact .Google has overturned the lives of people with its system of world information accessible and useful.";
  const [para, setPara] = useState(text);

  function words() {
    let str_para = para;

    str_para = str_para.replace(/,/g, "");
    str_para = str_para.replace(/\./g, "");
    str_para = str_para.toLowerCase(str_para);
    str_para = str_para.split(" ");

    const wordCount = {};
    for (let i = 0; i < str_para.length; i++) {
      if (wordCount[str_para[i]] === undefined) {
        wordCount[str_para[i]] = 1;
      } else {
        wordCount[str_para[i]]++;
      }
    }

    const keyValueArray = [];

    for (const key in wordCount) {
      if (Object.hasOwnProperty.call(wordCount, key)) {
        keyValueArray.push({ key: key, value: wordCount[key] });
      }
    }

    // setCount(JSON.stringify(wordCount, null, 8));

    const chunkSize = 10;
    const multipleArrays = [];

    for (let i = 0; i < keyValueArray.length; i += chunkSize) {
      multipleArrays.push(keyValueArray.slice(i, i + chunkSize));
    }

    setCount(multipleArrays);
  }
  useEffect(() => {
    if (para !== "") {
      words();
    }
  }, []);

  return (
    <>
      <center>
        <h3>Enter Text Here</h3>
        <p>Let's start words count </p>
        <div>
          <textarea
            name=""
            rows="20"
            cols="100"
            value={para}
            onChange={(e) => {
              setPara(e.target.value);
            }}
          ></textarea>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              height: "35px",
            }}
            onClick={words}
          >
            Submit
          </button>
          <IoMdRefresh
            onClick={() => {
              setPara("");
              setCount("");
            }}
            size={30}
          />
        </div>
      </center>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: 10,
        }}
      >
        {count.length > 0 &&
          count.map((val) => {
            return (
              <table className="table" style={classes.table}>
                <thead>
                  <tr>
                    <th style={classes.td}>WORD</th>
                    <th style={classes.td}>COUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {val?.length > 0 &&
                    val.map((word, i) => {
                      return (
                        <>
                          <tr
                            style={{
                              textAlign: "center",
                            }}
                          >
                            <td style={{}}>{word.key}</td>
                            <td>{word.value}</td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            );
          })}
      </div>
    </>
  );
}
