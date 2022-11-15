import React from 'react';
import { DocPreview } from './drivers/DocPreview';
import style from "../../../FileLayout.module.css";

export default function FilePreviewer(props) {
    const file = props.file;
    
    return (
    <div className={style.center}>
        {file?.webUrl && 
            <DocPreview file={file}/>
        }
    </div>
  );
}