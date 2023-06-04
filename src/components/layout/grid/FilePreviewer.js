import React from 'react';
import { getFileType } from '../../../utils/FileLogos';
import { DocPreview } from './PreviewFileTypes/DocPreview';

export default function FilePreviewer(props) {
    const file = props.file;
    const fileType = getFileType(props.file.file?.mimeType);
    console.log(fileType);
    return (
    <>
        {file?.webUrl && (fileType == "docx" || fileType == "pdf" || fileType == "xlsx") && 
            <DocPreview file={file} type={fileType}/>}
        {file?.webUrl && (fileType =="photo") && 
            <img src={file.webUrl} height="180px" />
        }
    </>
  );
}