"use client";
import "@styles/diary.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Diary() {
  const [judul, setJudul] = useState([]);
  const [isi_diary, setIsiDiary] = useState([]);

  const endpointAPI = "https://6555c0d084b36e3a431e3e98.mockapi.io/diary";

  async function getDiary() {
    const res = await axios.get(endpointAPI);
    const data = res.data;

    const judul = data.map((item) => item.judul);
    setJudul(judul);

    const isi_diary = data.map((item) => item.isi_diary);
    setIsiDiary(isi_diary);
  }

  useEffect(() => {
    getDiary();
  }, []);

  return (
    <div>
      {judul.length > 0 ? (
        <ul>
          {judul.map((item, idx) => (
            <Link href={`/diary/${item}/${isi_diary[idx]}`}>
            <li key={idx}>
              <div className="diary-container">
                  <h1>{judul[idx]}</h1>
                  <p className="p-diary">{isi_diary[idx]}</p>
              </div>
            </li>
            </Link>
          ))}
        </ul>
      ) : (
        "API is loading"
      )}
    </div>
  );
}