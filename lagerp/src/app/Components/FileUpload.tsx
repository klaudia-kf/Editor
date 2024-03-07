'use client';
import React from 'react';
import {
    Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button
} from '@mui/material';
import styles from '../page.module.scss'
import { FileInfo } from '../Models/Interfaces'
import { FileService } from '../Services/FileService';

const maxSize = {
    image: 5 * 1024 * 1024,  // 5MB
    video: 10 * 1024 * 1024, // 10MB
    doc: 100 * 1024 * 1024, // 100KB
};

export const FileUpload = (props: {/*editFile: FileInfo;*/ addFile: (file: FileInfo) => void; }): JSX.Element => {
    const [file, setFile] = React.useState<FileInfo>();
    const [desc, setDesc] = React.useState("");
    const [comparison, setComparison] = React.useState(false);
    let [showPopup, setShowPopup] = React.useState(false);
    let [message, setMessage] = React.useState("");
    let [img, setImg] = React.useState("");

    // receive files
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const handleUploadClick = (): void => {
        inputRef.current?.click();
    };

    const closePopUp = () => {
        setShowPopup(false);
        setMessage("");
    }

    const validateSize = (file: File) => {
        const fileType = FileService.isMedia(file) ? (FileService.isImage(file) ? 'image' : 'video') : 'doc';
        if (file.size > maxSize[fileType]) {
            setMessage(`${fileType} needs a max size of: ${maxSize[fileType]}`);
            setShowPopup(true);
            return false;
        }
        if (fileType == 'image') {
            setImg(URL.createObjectURL(file))
        }
        return true;
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files) {
            return;
        }
        setDesc("");
        const newFile = e.target.files[0];
        //check file type for size limit
        if (validateSize(newFile)) {
            
            setFile({
                doc: newFile,
                description: "",
                isComparisonImage: false,
              });
        }
        else return;

    };

    const displayPreview = (): JSX.Element => {
        if (!file)
            return <></>;
        return (
            <div>
                <FileService.Icon file={file.doc} />
            </div>
        );
    }

    const handleSubmitFile = (event: React.MouseEvent<HTMLButtonElement>) => {
        //send files back to parent
        event.preventDefault(); // Prevents the form from submitting in the traditional way
        if (!file) {
            return;
        }
        file.description = desc;
        file.isComparisonImage= comparison;
        // Send the new object back to the parent component
        props.addFile(file);
    }

    const changeFile = () => {
        setDesc(" ");
        setComparison(false);
        handleUploadClick;
    };

    return (
        <React.Fragment>
            <h2 style={{ alignSelf: "baseline" }}>Dateivorschau</h2>
            <div className={styles.fileUploadContainer} >

                <div aria-label='uploading'>
                    <div>
                        {file && <p>{file.doc.name}</p>}
                    </div>
                    <div className={styles.preview}>
                        {
                            displayPreview()
                        }
                    </div>
                    <button onClick={handleUploadClick}>
                        Datei Hochladen
                    </button>
                    <input
                        aria-label='file'
                        type="file"
                        ref={inputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    <button onClick={changeFile}>
                        Datei ändern
                    </button>
                </div>
                <div>
                    <p>Beschreibung</p>
                    <TextField
                        id="description"
                        multiline
                        rows={4}
                        defaultValue={setDesc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <div>
                        {FileService.isMedia(file?.doc) && (
                            <FormControl>
                                <FormLabel>Vergleichsbild</FormLabel>
                                <RadioGroup
                                    row
                                    name="comparisonImage"
                                    defaultValue={false}
                                    onChange={(e) => {
                                        const result = e.target.value.toLowerCase() === "true" ? true : false;
                                        setComparison(result);
                                    }}
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="Ja" />
                                    <FormControlLabel value="false" control={<Radio />} label="Nein" />
                                </RadioGroup>
                            </FormControl>
                        )}
                    </div>

                </div>
            </div>
            <form >

                <button onClick={handleSubmitFile}>
                    Datei hinzufügen
                </button>
            </form>
            <Dialog
                open={showPopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"File too large!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePopUp}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}
export default FileUpload;