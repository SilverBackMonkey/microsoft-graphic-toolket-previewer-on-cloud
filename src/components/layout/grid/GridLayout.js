// GridLayout: grid view with files previewer
// author: dancing
// created_at: 5/25/2023

import { makeStyles, shorthands, Button } from "@fluentui/react-components";
import { CardFile } from "./CardFile";
import {
    useStaticVirtualizerMeasure,
  } from "@fluentui/react-components/unstable";
import "../../../App.css"
import { DirectoryPreview } from "./Directory";
import { LoadingFiles } from "./Loading";
import { fileDownloadLink } from "../../../utils/constant";
  // custom styles
const useStyles = makeStyles({

  container: {
      ...shorthands.gap("12px"),
      flexDirection: "row",
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      height: "100%",
      paddingBottom:"10px"
    },
    child: {
      lineHeight: "20px",
      height: "fit-content",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "auto auto auto",
      backgroundColor: "#f3f3f3",
      ...shorthands.gap("12px"),
      paddingBottom:"10px"
    },
    gridItem: {
      border: "1px solid rgba(0, 0, 0, 0.8)",
      padding: "20px",
      fontSize: "30px",
      textAlign: "center"
    },
    showMoreBtn: {
      position: 'relative',
      marginTop: '10px',
      marginBottom: '20px',
      left: '50%',
      marginRight: '-50%'
    }
});
  
export const GridLayout = (props) => {
  const styles = useStyles();
  const {fileData, handleItemClick, NextLink, loading,GetData, searchResults} = props;
  const { scrollRef } =
    useStaticVirtualizerMeasure({
      defaultItemSize: 200,
    });
  const result = searchResults?.length > 0 ? searchResults : fileData;

  const directories = result.filter(file=> file?.folder);
  const files = result.filter(file => !file?.folder);

  const style = useStyles();

  return (
    <div >  
          {!loading && <div className={styles.gridContainer}>
          { directories.length > 0 && directories.map((dir, index) => (

            <div className={styles.gridItem} key={`directory${index}`}>
              <DirectoryPreview _onClick={handleItemClick} dir={dir}/>
            </div>
          ))}
          </div>}
          {!loading && <div className={styles.gridContainer}>
          {files.length > 0 && files.map((file, index) =>
            <div className={styles.gridItem} key={`file${index}`}>
              <CardFile file={file}/>
            </div>
            )}
          </div>}
          
            {NextLink
              ? !loading && (
                <div className={styles.showMoreBtn}>
                <Button appearance="primary" onClick={GetData}>
                  Load more
                </Button>
                </div>
                )
              : null}
              {loading && <LoadingFiles />}
  </div>);
};