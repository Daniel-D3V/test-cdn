"use client";

import { ChangeEvent } from "react";

export default function Home() {
  async function uploadToS3({
    file,
    uploadUrl,
    key,
  }: {
    uploadUrl: string;
    key: string;
    file: File;
  }) {
    const req = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
    });

    const data = await req.json();

    console.log(data);
  }

  const handleUpload = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const file = formData.get("file");

    const req = await fetch(
      "http://26.183.171.163:5000/file/user/get-signed-url?fileName=batata.png",
      {
        method: "GET",
        headers: {
          authorization: `Bearer c5f17c38-0a58-40e1-ab91-80a3f3f384a0-667d5966-ced4-4207-b000-edc2d1e77e28`,
        },
      }
    );

    const data = await req.json();

    await uploadToS3({
      file,
      ...data,
    });

    console.log(await req.json());
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleUpload}>
        <input type="file" name="file" />
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}
