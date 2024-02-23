'use client'
import styles from "./page.module.scss";
import { Attachments } from "./Attachments";
import React from "react";
import { initializeFileTypeIcons } from "@fluentui/react-file-type-icons";
initializeFileTypeIcons();

export default function App() {
  const [files, setFiles] = React.useState<File[]>([]);

  // receive files
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const temp = [...files];
    temp.push(e.target.files[0]);
    setFiles(temp);
  };
  const handleRemoveFile = (index: number) => {
    const temp = [...files];
    temp.splice(index, 1);
    setFiles(temp);
  };

  return (
    <main>
        <div>Upload a file:</div>
        <button onClick={handleUploadClick}>
          Add files
        </button>

        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div className={styles.main}>

          <Attachments files={files} removeFile={handleRemoveFile} />
        </div>
    </main>
  );
}
