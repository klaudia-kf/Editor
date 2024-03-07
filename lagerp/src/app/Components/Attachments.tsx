'use client';
import React from 'react';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import styles from '../page.module.scss';
import { FileInfo } from '../Models/Interfaces'
import { FileService } from '../Services/FileService';

/*
Component that displays the files
object showing icon corresponding to the extension (.pdf, .txt, .docx, ..)
objects with image extensions (.jpeg, .png) should display a preview of the image instead
each object should have an 'x' button to delete the file from the list
object should contain: icon/image, name + extension and delete button
*/

export interface IAttachmentProps {
  files: File[];
}

//IAttachmentsProps
export const Attachments = (props: { fileList: FileInfo[]; removeFile: (index: number) => void; /*editFile: (index: number) => void*/ }): JSX.Element => {
  const draggingFile = React.useRef<HTMLDivElement | undefined>();

  function dragOver(e: React.DragEvent<HTMLDivElement>): void {
    if (!draggingFile)
      return;

    const target: HTMLDivElement = e.target as HTMLDivElement;

    if (isBefore(draggingFile.current!, target)) {
      target.parentNode!.insertBefore(draggingFile.current!, target);
    } else {
      target.parentNode!.insertBefore(draggingFile.current!, target.nextSibling);
    }
  }
  
  function dragEnd(): void {
    draggingFile.current = undefined;
  }
  
  function dragStart(e: React.DragEvent<HTMLDivElement>): void {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', "");
    draggingFile.current = e.target as HTMLDivElement;
  }
  
  function isBefore(el1: HTMLDivElement, el2: HTMLDivElement) {
    let cur;
    if (el2.parentNode === el1.parentNode) {
      for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
        if (cur === el2) return true;
      }
    }
    return false;
  }

  function renderFile(file: FileInfo, idx: number, removeFile: (index: number) => void) {
    return (
      <div className={styles.file}
        key={idx}
        onClick={
          (e) => { 
            //props.editFile(idx)
            alert("ID: "+ idx + ", Name: "+ file.doc.name + ", Desc: "+ file.description + ", Is comparision img: " + file.isComparisonImage  ); 
          }}
        draggable={true}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        onDragOver={dragOver}
        >
        <div onClick={() => { return (console.log(file.doc.name)) }} style={{ alignSelf: "center" }}>
          <FileService.Icon file={file.doc} isIcon={true} />
          <p>{FileService.truncatedString(file.doc.name, 15)}</p>
        </div>
        <IconButton className={styles.iconRemove} onClick={() => {
          removeFile(idx)
        }}>
          <ClearIcon className={styles.iconStyle} />
        </IconButton>
      </div>
    );
  }

  return (
    <React.Fragment>
      <h2 style={{ alignSelf: "baseline" }}>Anhänge</h2>
      <div className={styles.fileContainer}>
        {props.fileList.map(
          (file, idx) => {
            return (
              renderFile(file, idx, props.removeFile)
            )
          })}
      </div>
    </React.Fragment >
  );
}