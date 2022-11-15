import React from 'react';
import { getThumbnail } from '../utils/FileLogos';
import { Image } from '@fluentui/react-components';

export default function LogoPreview(props) {
    const file = props.file;
    const FileLog = getThumbnail(file);
    const type = props.type;
    const height = (type == 'grid')? 230: 70; 
    return (
    <>
        <Image src={FileLog} height={height}/>
    </>
  );
}
