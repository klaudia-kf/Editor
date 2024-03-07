import React, { useState, useEffect } from 'react'
import Slider from '@mui/material/Slider';
import Cropper from 'react-easy-crop';
import styles from '../page.module.scss'


export const ImageCropper = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [initialCroppedArea, setInitialCroppedArea] = useState(undefined)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const croppedArea = JSON.parse(window.localStorage.getItem('croppedArea'))
    setInitialCroppedArea(croppedArea)
  }, [])

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
    window.localStorage.setItem('croppedArea', JSON.stringify(croppedArea))
  }

  return (
    <div className={styles.fileUploadContainer} >

        <Cropper
          image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          initialCroppedAreaPercentages={initialCroppedArea}
        />
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e: React.ChangeEvent<HTMLInputElement>, zoom) => setZoom(zoom)}
          classes={{ container: 'slider' }}
        />
      </div>
  )
}

