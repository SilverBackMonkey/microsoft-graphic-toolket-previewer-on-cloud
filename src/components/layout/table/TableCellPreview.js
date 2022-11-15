import React, { useState } from "react";
import { useEffect } from "react";
import { LoadingFiles } from "../grid/Loading";
import { Image } from "@fluentui/react-components";
import { driveId, proxyDomain } from "../../../utils/constant";
import { useCallback } from "react";
// import { Card, CardHeader, CardPreview } from '@fluentui/react-card/';

export const TableCellPreview = (props) => { 
  const file = props?.file;
  const [path, setPath] = useState('');
  const [loading, setLoading]= useState(false);
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
  }, [file]);

  useEffect(() => {
    if (file) {
      fetchData().then(res => setPath(res));
    } else {
      setPath('');
    }
  }, [file, fetchData]);

  return (
    <>
      {!loading && <div>
        <Image src={path} alt={file.name}/> 

      </div>}
      {/* // <iframe src={path} title="your file preview" className="preview-iframe" width='100%' height='100%' scrolling="no" frameBorder='0' >
      // </iframe>} */}
      {loading && <LoadingFiles />}
    </>
  );
};