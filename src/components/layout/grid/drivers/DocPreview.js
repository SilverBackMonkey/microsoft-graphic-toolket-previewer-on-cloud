import { Image } from "@fluentui/react-components";
import React, { useState } from "react";
import { useEffect } from "react";
import { LoadingFiles } from "../Loading";
// import { Card, CardHeader, CardPreview } from '@fluentui/react-card/';
import { useCallback } from "react";
import FileType from "./FileType";
import { driveId, proxyDomain } from "../../../../utils/constant";

export const DocPreview = (props) => { 
  const file = props?.file;
  const [path, setPath] = useState('');
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const parentUrl = proxyDomain + '/v1.0/drives/' + driveId + '/items/';

      const response = await fetch(parentUrl + file.id + "/thumbnails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();

      setLoading(false);
      return data.value[0].medium.url;
    } catch (error) {
      console.log(error);
      return '';
    }
  }, []);
  useEffect(() => {
    if (file) {
      fetchData().then(res => setPath(res));
    } else {
      setPath('');
    }
  }, []);
  return (
    <>
      {!loading && 
        <div>
          {path && path !== '' && <Image src={path} height={220} alt={file.name} />}
          {(!path || path === '') && <FileType file={file} />}
        </div>}
      {/* // <iframe src={path} title="your file preview" className="preview-iframe" width='100%' height='100%' scrolling="no" frameBorder='0' >
      // </iframe>} */}
      {loading && <LoadingFiles />}
    </>
  );
};