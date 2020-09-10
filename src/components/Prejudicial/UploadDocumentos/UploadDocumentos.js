import React,{useCallback, useState } from 'react';
import { useDropzone } from "react-dropzone";
import { Button,Form,Input } from "semantic-ui-react";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import Dropzone, { SubmitButton } from 'react-dropzone-uploader';

import "./UploadDocumentos.scss";


export default function UploadDocumentos(props) {

    const { match, proceso } = props;
    const [formData, setFormData] = useState(initialValue())
    const [bannerRegistro, setBannerRegistro] = useState(null)
    const [bannerPoderes, setBannerPoderes] = useState(null)
    const [bannerHC, setBannerHC] = useState(null)
    const [bannerDictamen, setBannerDictamen] = useState(null)
    const [file, setFile] = useState(null)

    const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
      const text = files.length > 0 ? 'Añadir mas archivos' : 'Elige archivo'
      var boton = document.getElementsByClassName("dzu-submitButton");
      boton.innerHTML = "Subir";
      console.log(boton);
    
      return (
        <label className="label_input" >
          {text}
          <input
            style={{ display: 'none' }}
            type="file"
            accept={accept}
            multiple
            onChange={e => {
              getFilesFromEvent(e).then(chosenFiles => {
                onFiles(chosenFiles)
              })
            }}
          />
        </label>
      )
    }
    

      const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
      }

      const getFilesFromEvent = e => {
        return new Promise(resolve => {
          getDroppedOrSelectedFiles(e).then(chosenFiles => {
            resolve(chosenFiles.map(f => f.fileObject))
          })
        })
      }

    
    return (
        <Form >
            <Form.Field >
            <h2>Registro civil</h2>
            <Dropzone
              accept="image/*,audio/*,video/*,.pdf"
              onSubmit={handleSubmit}
              InputComponent={Input}
              getFilesFromEvent={getFilesFromEvent}
            />
            </Form.Field>
            <Form.Field >
            <h2>Poderes</h2>
            <Dropzone
              accept="image/*,audio/*,video/*,.pdf"
              onSubmit={handleSubmit}
              InputComponent={Input}
              getFilesFromEvent={getFilesFromEvent}
            />
            </Form.Field>
            <Form.Field >
            <h2>Historias clinicas</h2>
            <Dropzone
              accept="image/*,audio/*,video/*,.pdf"
              onSubmit={handleSubmit}
              InputComponent={Input}
              getFilesFromEvent={getFilesFromEvent}
            />
            </Form.Field>
            <Form.Field >
            <h2>Dictamen</h2>
            <Dropzone
              accept="image/*,audio/*,video/*,.pdf"
              onSubmit={handleSubmit}
              InputComponent={Input}
              getFilesFromEvent={getFilesFromEvent}
            />
            </Form.Field>
            <div className="footer">
              <Button onClick={() => console.log("leito")}>subir informacion</Button>
              <Button>Terminar Prejudicial</Button>
            </div>
        </Form>
    )
}


function initialValue() {
    return {
        registro_civil: {},
        poderes: {},
        historias_clinicas:{},
        dictamen: {}

    }
    
}

