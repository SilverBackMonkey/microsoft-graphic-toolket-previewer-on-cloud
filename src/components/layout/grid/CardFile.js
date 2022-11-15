import {
    makeStyles,
    shorthands,
    Button,
    Caption1,
    Body1,
    Card,
    CardHeader,
    CardFooter,

    Toolbar,
    ToolbarButton,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
  } from "@fluentui/react-components";
  import * as React from "react";
  import {saveAs} from "file-saver";
  import {
    ArrowDownload16Regular,
    MoreHorizontal24Filled
  } from "@fluentui/react-icons";
  import { getThumbnail} from "../../../utils/FileLogos";
import FilePreviewer from "./FilePreviewer";

import {} from '@fluentui/react-icons'
import { downloadFile } from "../../../utils/SPFileManager";
import OpenDialogViewer from "./drivers/DialogViewer";
import { fileDownloadLink } from "../../../utils/constant";
  const useStyles = makeStyles({
  
    description: {
      ...shorthands.margin("12px", 0, "12px"),
    },
  
    card: {
      width: "380px",
      height: "380px",
      marginTop:"10px",
      marginLeft: "6px",
    },

    text: {
      ...shorthands.margin(0),
    },
  });
  

export  const CardFile = (props) => {
    const styles = useStyles();
    let {file} = props;
    const FileLog = getThumbnail(file);
    const openFile = (e) => {
      e.preventDefault();

      saveAs(
        file?.webUrl,
        file?.name
      );
    }
    return (
        <Card className={styles.card} {...props}>

        <FilePreviewer file={file} />
        <CardHeader
          image={
            // eslint-disable-next-line jsx-a11y/alt-text
            <img src={FileLog} width="25px" height="25px"/>
          }
          header={
            <Body1>
              <b>{file.name}</b>
            </Body1>
          }
          description={<Caption1>Developer</Caption1>}
          action={
            <Toolbar aria-label="Default" {...props}>
              <Menu>
                <MenuTrigger>
                  <ToolbarButton aria-label="More" icon={<MoreHorizontal24Filled />} />
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem onClick={(e)=>openFile(e)}>                      
                          {/* <img src={downloadImage} alt="download" width={20} /> */}
                          Open
                    </MenuItem>
                    <MenuItem onClick={(e) => downloadFile(file[fileDownloadLink])}>
                        Download
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </Toolbar>
          }
        />
  
        <CardFooter>
              <OpenDialogViewer file={file} />
              <Button icon={<ArrowDownload16Regular />} onClick={(e) => downloadFile(file[fileDownloadLink])}>
                  Download
              </Button>
            
        </CardFooter>
      </Card>
    );
  };
 