'use client';
import React from 'react';
import {IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './page.module.scss';
import { getFileTypeIconProps} from '@fluentui/react-file-type-icons';
import { Icon } from '@fluentui/react';

/*
Component that displays the files
object showing icon corresponding to the extension (.pdf, .txt, .docx, ..)
objects with image extensions (.jpeg, .png) should display a preview of the image instead
each object should have an 'x' button to delete the file from the list
object should contain: icon/image, name + extension and delete button
*/

const truncated = (input: string, length: number) => {
  if (input.length <= length)
    return input;

  return input.substring(0, length) + "...";
}

function renderFile(file: File, idx: number, removeFile: (index: number) => void) {
  return (
    <div className={styles.file}>
      <div onClick={() => { return (console.log(file.name))}} style={{alignSelf: "center"}}>
        {displayIcon(file, idx)}
        <p>{truncated(file.name, 15)}</p>
      </div>
      <IconButton className={styles.iconRemove} onClick={() => {
        removeFile(idx)
      }}>
        <ClearIcon className={styles.iconStyle} />
      </IconButton>
    </div>
  );
}



export interface IMappedIcon {
  filetype: string;
  filename: string;
}
const mappedIcons: IMappedIcon[] = [
  {
    filetype: "application/pdf",
    filename: "pdf"
  },
  {
    filetype: "wordprocessingml.document",
    filename: "docx"
  },
  {
    filetype: "text/plain",
    filename: "txt"
  },
  {
    filetype: "presentationml.presentation",
    filename: "ppt"
  }
];

function displayIcon(file: File, idx: number): JSX.Element {
  if (!file.type)
    return (<></>);

  let imageSrc = "";
  if (file.type.indexOf('image') !== -1) {
    return (
      <Icon>
        <img className={styles.iconImage} src={URL.createObjectURL(file)} />
      </Icon>
    )
  } else {
    //console.log('Not an image.', file.name, file.type);
    const icons = mappedIcons.filter((icon) => file.type.indexOf(icon.filetype) > -1);
    if (icons.length > 0)
      imageSrc = icons[0].filename;
  }
  return (
    <Icon {...getFileTypeIconProps({ extension: imageSrc, size: 48 })} />
  );
}


export interface IAttachmentProps {
  files: File[];
}

//IAttachmentsProps
export const Attachments = (props: { files: File[]; removeFile: (index: number) => void }): JSX.Element => {

  return (
    <React.Fragment>
      <h2 style={{alignSelf: "baseline"}}>Anhänge</h2>
      <div className={styles.fileContainer}>
        {props.files.map(
          (file, idx) => {
            return (
              renderFile(file, idx, props.removeFile)
            )
          })}
      </div>
    </React.Fragment >
  );
}