"use client";
import "@styles/diary.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Diary() {
  const [diaryJudul, setJudul] = useState([]);
  const [diaryIsi, setIsiDiary] = useState([]);
  const [koleksiData, setKoleksiData] = useState([]);
  const endpointAPI = "https://6555c0d084b36e3a431e3e98.mockapi.io/diary";

  async function getDiary() {
    try {
      const res = await axios.get(endpointAPI);

      //data
      const dataJSON = res.data;
      console.log("DATA DALAM", dataJSON);
      setKoleksiData(dataJSON);

      //judul
      const judul = dataJSON.map((item) => item.judul);
      console.log("JUDUL DALAM", judul);
      setJudul(judul);

      //isi diary
      const isi_diary = dataJSON.map((item) => item.isi_diary);
      console.log("ISI DALAM", isi_diary);
      setIsiDiary(isi_diary);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  //POST DIARY
  const [postTulisJudul, setPostJudul] = useState("");
  const [postTulisDiary, setPostDiary] = useState("");

  async function postDiary() {
    const updatedDiary = [
      ...koleksiData,
      { judul: postTulisJudul, 
        isi_diary: postTulisDiary },
    ];

    console.log("PRINTING ISI UPDATED DIARY:\n", updatedDiary);
    getDiary(updatedDiary);
    
    setPostJudul("");
    setPostDiary("");

    try {
      const res = await axios.post(endpointAPI, {
        judul: postTulisJudul,
        isi_diary: postTulisDiary,
      });
      
      if (res.status >= 200 && res.status < 300) {
        console.log("POST response:", res.data);
        getDiary();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      alert("failed to POST APIE" + error);
    }
  }

  function handlerJudul(event) {
    event.preventDefault();
    setPostJudul(event.target.value);
  }
  function handlerIsiDiary(event) {
    event.preventDefault();
    setPostDiary(event.target.value);
  }

  function handlerKeyEnter(e) {
    e.preventDefault;
    if (e.key === "Enter") {
      setPostJudul(e.target.value);
      getDiary(postTulisJudul);
    }
  }


  useEffect(() => {
    getDiary();
  }, []);

  return (
    <div>
      <div className="diary-post">
        <div className='cta-banner'>
          <input
            type="text"
            value={postTulisJudul}
            onChange={handlerJudul}
            onKeyDown={handlerKeyEnter}
            placeholder="Masukkan judul diary"
          />
          <input
            type="text"
            value={postTulisDiary}
            onChange={handlerIsiDiary}
            onKeyDown={handlerKeyEnter}
            placeholder="Masukkan isi diary"
          />
          {postTulisJudul && postTulisDiary ? (
            <div className="button-diary" onClick={postDiary}>
              <p>Submit Diary</p>
            </div>
          ) : (
            <div
              className="disabled"
              onClick={() => alert("Isi terlebih dahulu!")}
            >
              <p>Disabled</p>
            </div>
          )}
        </div>
      </div>
      {koleksiData ? (
        diaryJudul.length > 0 ? (
          <ul>
            {diaryJudul.map((item, idx) => (
              <Link href={`/diary/${item}/${diaryIsi[idx]}`}>
                <li key={idx}>
                  <div
                    className={`diary-container ${
                      idx === diaryJudul.length - 1 ? "last-item" : ""
                    }`}
                  >
                    <h1>{diaryJudul[idx]}</h1>
                    <p className="p-diary">{diaryIsi[idx]}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          "API is loading"
        )
      ) : (
        "API is empty"
      )}
    </div>
  );
}