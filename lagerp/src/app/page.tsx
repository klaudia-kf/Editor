'use client'
import { initializeFileTypeIcons} from "@fluentui/react-file-type-icons";
import { Attachments } from "./Components/Attachments";
import { FileUpload } from "./Components/FileUpload";
import { FileInfo } from './Models/Interfaces';
import styles from "./page.module.scss";
import React from "react";
initializeFileTypeIcons();


export default function App() {
  const [fileList, setFileList] = React.useState<FileInfo[]>([]);
  const [editFile, setEditFile] = React.useState<FileInfo>();


  // receive files
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleRemoveFile = (index: number) => {
    const temp = [...fileList];
    temp.splice(index, 1);
    setFileList(temp);
  };

  const handleAddFile = (file: FileInfo) => {
    const temp = [...fileList];
    temp.push(file);
    setFileList(temp);   
    setEditFile(undefined); // Reset editFile after files are added 
  }
  const handleEditFile = (index: number) => {
    if (index === undefined || index === null) return;    
    let item: FileInfo;
    //fileList.find((item, idx) => idx === index)
    //setEditFile(item);
  }

  return (
    <main>
      <div className={styles.main}>
        <Attachments fileList={fileList} removeFile={handleRemoveFile} /*editFile={handleEditFile}*//>
        <FileUpload /*editFile={editFile}*/ addFile={handleAddFile}/>     
      </div>
    </main>
  );
}
