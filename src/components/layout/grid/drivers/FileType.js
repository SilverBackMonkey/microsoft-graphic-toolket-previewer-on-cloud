import React from 'react';
import { getThumbnail } from '../../../../utils/FileLogos';
import { Image } from '@fluentui/react-components';

export default function FileType(props) {
    const fileLogo = getThumbnail(props?.file);
    return (
    <>
        <Image src={fileLogo} width={360} height={180} />
    </>
  );
}
