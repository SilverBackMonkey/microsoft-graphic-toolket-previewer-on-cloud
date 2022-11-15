import React, { useMemo, useState } from "react";

import { useEffect } from "react";
import { LoadingFiles } from "../Loading";
import style from "../../../../FileLayout.module.css";
import { useCallback } from "react";
import { driveId, proxyDomain } from "../../../../utils/constant";

export const FileLoading = (props) => { 
  const file = props?.file;
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState('');
  debugger;
  
  const fetchData = useCallback(async () => {
    debugger;
    try {
      setLoading(true);
      const parentUrl = proxyDomain + '/v1.0/drives/' + driveId + '/items/';
        
      const response = await fetch(parentUrl + file.id + "/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setPath(data.getUrl);
    } catch (error) {
      console.log(error);
      setPath('');
    }finally{
      setLoading(false);
    }
  }, [file]);
  
  useEffect(() => {
    debugger;
    if (file) {
      fetchData();
    } else {
      setPath('');
    }
  }, [file]);
  debugger;
  return (
    <div className={style.center}>
      {!loading &&  
      <iframe src={path} title="your file preview" width='100%' height='700px' scrolling="no" frameBorder='0' >
      </iframe>}
      {loading && <LoadingFiles />}
    </div>
  );
};