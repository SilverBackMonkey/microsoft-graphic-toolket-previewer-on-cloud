import React, { useState, useRef } from "react";
import style from "./FileLayout.module.css";
import { useComponentVisible } from "./hooks/useClickOutSide";
import "@microsoft/mgt-components";
import {
  Button,
  Switch,
} from "@fluentui/react-components";
import { GridLayout } from "./components/layout/grid/GridLayout";
import TableLayout from "./components/layout/table/TableLayout";
import { Link } from "@fluentui/react-components";
import {
  ArrowDownload16Regular,
} from "@fluentui/react-icons";
import { downloadFile } from "./utils/SPFileManager";
import { fileDownloadLink, initItemId } from "./utils/constant";
const FileLayout = (props) => {
  const [searchResults, setSearchResults] = useState([]);

  const [breadcrumbs, setBreadcrumbs] = useState([
    { name: "Home", itemId: initItemId},
  ]);

  const [showGridView, setShowGridView] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  
  const textareaRef = useRef(null);
  
  const [openBox, setOpenBox] = useState(-1);

  // toggle grid view and table view
  function _onChange(e, checked) {
    setShowGridView(checked?.checked);
  }
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false, [textareaRef]);

  const showDownloadLink = (file) => {
    if (file?.[fileDownloadLink]) {
      return (
        <Button icon={<ArrowDownload16Regular />} onClick={(e) => downloadFile(file[fileDownloadLink])}>
          Download
        </Button>
      );
    }
  };
  // when click tablecell item...
  const openFolder = (file) => {
    if (file?.folder) {
      // console.log("file", file);
    }
  };

  const handleLinkShare = (index, e) => {
    setOpenBox(index);
    if (e?.target?.tagName?.toLowerCase() !== "textarea") {
      setIsComponentVisible((prev) => !prev);
    }
  };

  const handleSearchInputChange = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setSearchResults(props.files); // show original files if search query is empty
      return;
    }
  };
  const handleSubmit = async () => {
    try {
      props.setLoading(true);
      const initBreadcrumbs = breadcrumbs.slice(0, 1);
      const newBreadcrumbs = [
        ...initBreadcrumbs,
        {name: 'Search', itemId: ''}
      ]
      setBreadcrumbs(newBreadcrumbs);
      const searchUrl = `${props?.serverProxyDomain}/v1.0/sites/root/drive/root/search(q='${searchQuery}')?$top=10`;
      const response = await fetch(searchUrl, { method: "GET" });
      const result = await response.json();
      props.setLoading(false);
      
      setSearchResults(result.value);
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemClick = (file, e) => {
    if (
      e.target.tagName.toLowerCase() === "img" ||
      e.target.id === "linkSharing" ||
      file?.[fileDownloadLink]
    ) {
      return; // Don't do anything if the clicked element is a textarea and if file is a directory
    } else {
      props.setItemId(file.id);
      const newBreadcrumbs = [
        ...breadcrumbs,
        { name: file.name, itemId: file.id },
      ];
      setBreadcrumbs(newBreadcrumbs);
      setSearchQuery('');
      setSearchResults([]); // Clear search results when a file is clicked
    }
  };
  return (
    <>
      <Switch label="Grid View or Table View" onChange={_onChange}/>

      {/* Search field */}
      <div className={style.searchContainer}>
        <input
          type="text"
          name="search"
          placeholder="Search"
          className={style.searchInput}
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className={style.searchBtn} onClick={() => handleSubmit()}>
          Search
        </button>
      </div>

      {/* Breadcrumbs */}
      <div className={style.breadcrumbContainer}>
        {breadcrumbs.map((item, index) => (
          <span key={index}>
            <Link 
              href="#"
              onClick={() => {
                // Remove all breadcrumbs after the current one
                if(item.itemId != ''){
                  const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
                  setBreadcrumbs(newBreadcrumbs);
                  props.setItemId(item.itemId);
                  setSearchQuery('');
                  setSearchResults([]); // Clear search results when a breadcrumb is clicked
                }
                if(item.itemId === '') {
                  handleSubmit();
                }
              }}
            >
              {item.name}
            </Link>
            {index < breadcrumbs.length - 1 && <span> &gt; </span>}
          </span>
        ))}
      </div>
      {!showGridView &&
        <TableLayout 
          loading={props.loading} 
          openBox={openBox} 
          isComponentVisible={isComponentVisible} 
          files={props.files} 
          handleItemClick={handleItemClick}
          handleLinkShare={handleLinkShare}
          searchResults={searchResults}
          openFolder={openFolder}
          NextLink={props.NextLink}
          GetData={props.GetData}
          openBoxRef={ref}
          textareaRef={textareaRef} />}      

      {showGridView && 
      <GridLayout 
        fileData={props.files} 
        loading={props.loading} 
        GetData={props.GetData}
        handleItemClick={handleItemClick}
        searchResults={searchResults}
        NextLink={props.NextLink}
        />}
    </>
  );
};

export default FileLayout;
