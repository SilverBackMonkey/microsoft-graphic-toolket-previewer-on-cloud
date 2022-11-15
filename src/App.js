import React, { useCallback, useEffect, useState } from "react";
import { MockProvider, Providers } from "@microsoft/mgt-element";
import { Login, FileList, MgtTemplateProps } from "@microsoft/mgt-react";
import "./App.css";
import { MsalProvider } from "@microsoft/mgt-msal-provider";
import { ProxyProvider } from "@microsoft/mgt-proxy-provider";
import { checkProxy } from "wp-webcomponent";

import FileLayout from "./FileLayout";
import { driveId, fileNextLink, initItemId, parentLink, proxyDomain } from "./utils/constant";

/** Set Files */
export const FilesResponse = (props) => {
  props.setFilesData(props.dataContext.files);
  if (props.dataContext.files.length === 0) {
    props.setLoading(true);
  } else {
    props.setLoading(false);
  }
  return <div></div>;
};

function App(props) {
  const [FilesData, setFilesData] = useState([]);
  const [NextLink, setNextLink] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemId, setItemId] = useState(initItemId);
  /** Get Next link based on response */
  const serverProxyDomain = proxyDomain;
  useEffect(() => {
    debugger
    const MgtFilesData = document.querySelector("mgt-file-list");
    MgtFilesData.addEventListener("templateRendered", (e) => {
      // if (e.target.pageIterator._nextLink != undefined) {
      setNextLink(e.target.pageIterator._nextLink);
      // }
    });

    if (serverProxyDomain) {
      Providers.globalProvider = new ProxyProvider(serverProxyDomain);
    } else {
      Providers.globalProvider = new MsalProvider({
        clientId: props.clientId,
        scopes: ["Sites.FullControl.All", "Sites.Read.All", "Files.Read.All"],
      });
    }
  }, [itemId, props.clientId, serverProxyDomain]);
 

  /** Getting data based on next link url and changing url with proxy domain */
  const GetData = useCallback(() => {
    debugger;
    setLoading(true);
    if (NextLink != undefined && NextLink != "") {
      const newlink = NextLink.replace(
        parentLink,
        serverProxyDomain
      );
      const Data = fetch(newlink, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setFilesData([...FilesData, ...data.value]);
          setNextLink(data[fileNextLink]);
        });
    }
  }, [NextLink, serverProxyDomain, FilesData]);
  return (
    <div className="main-container">
      <h1>{props.title ?? "Files List"}</h1>
      <Login />
      <FileList
        driveId={driveId}
        itemId={itemId}
      >
        <FilesResponse setFilesData={setFilesData} setLoading={setLoading} />
      </FileList>
      {FilesData.length > 0 &&
        <FileLayout
          serverProxyDomain={serverProxyDomain}
          files={FilesData}
          NextLink={NextLink}
          setNextLink={setNextLink}
          GetData={GetData}
          setItemId={setItemId}
          setFilesData={setFilesData}
          loading={loading}
          setLoading={setLoading}
        />
      }
    </div>
  );
}

export const Definition = [
  {
    zone: "Content",
    component: "TextBox",
    name: "widgetTitle",
    displayName: "widget title",
    title: "Widget Title",
  },
  {
    zone: "Content",
    component: "FILES",
    name: "files",
    displayName: "FILES",
  },
  {
    zone: "layout",
    component: "ComponentLayout",
    name: ["layout", "layoutSpacing"],
    enum: ["File Viewer", "List", "Grid"],
  },
  {
    zone: "layout",
    component: "FileIcon",
    name: "fileIcon",
    createSeparateSection: true,
    title: "File Icon",
  },
  {
    zone: "layout",
    component: "SizeSlider",
    name: "previewImageSize",
    createSeparateSection: true,
    title: "Preview Image",
  },
  {
    zone: "layout",
    component: "DownLoadSetting",
    name: "ShowDownloadLink",
    createSeparateSection: true,
    title: "Download Setting",
  },
  {
    zone: "layout",
    component: "TextBox",
    name: "previewWidth",
    createSeparateSection: true,
    title: "Width",
  },
  {
    zone: "appearances",
    component: "TextBox",
    name: "title",
    displayName: "Title",
  },
  {
    zone: "appearances",
    component: "TextBox",
    name: "description",
    displayName: "Description",
    createSeparateSection: true,
    title: "Description",
  },
  {
    zone: "appearances",
    component: "BackgroundType",
    name: ["typeSelected", "changeBgColor", "changeBgOverlay", "selectedImage"],
    displayName: "Background Type",
    createSeparateSection: true,
    title: "Background Type",
  },
  {
    zone: "appearances",
    component: "HeadingColorAndSize",
    name: ["headingColor", "headingSize"],
    createSeparateSection: true,
    title: "Heading",
  },
];

export default App;