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
    Link,
  } from "@fluentui/react-components";
  import * as React from "react";
  
  import {
    Open16Regular,
    MoreHorizontal24Filled
  } from "@fluentui/react-icons";
  import { getThumbnail} from "../../../utils/FileLogos";
import FilePreviewer from "./FilePreviewer";
import { FileDownloadAsset } from "../table/TableDatas";

  const useStyles = makeStyles({
  
    description: {
      ...shorthands.margin(0, 0, "12px"),
    },
  
    card: {
      width: "393px",
      height: "380px",
    },

    text: {
      ...shorthands.margin(0),
    },
  });
  

export  const CardFile = (props) => {
    const styles = useStyles();
    let {file} = props;
    const logo = getThumbnail(file);
    return (
      <Card className={styles.card} {...props}>
        <FilePreviewer file={file} />
        <CardHeader
          image={
            <img
                width={30}
                height={30}
              src={logo}
              alt="Microsoft PowerPoint logo"
            />
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
                    <MenuItem>                      
                      <Link
                          to={file['webUrl']}
                          target="_blank"
                          className="file__download"
                        >
                          {/* <img src={downloadImage} alt="download" width={20} /> */}
                          Open<i className="fa fa-download"></i>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to={file[FileDownloadAsset]}
                        target="_blank"
                        className="file__download"
                      >
                        {/* <img src={downloadImage} alt="download" width={20} /> */}
                        Download<i className="fa fa-download"></i>
                      </Link>
                    </MenuItem>
                    <MenuItem>Upload</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </Toolbar>
          }
        />
  
        <CardFooter>
          <Link
              to={file['webUrl']}
              target="_blank"
              className="file__download"
            >
              {/* <img src={downloadImage} alt="download" width={20} /> */}
              <Button appearance="primary" icon={<Open16Regular />}>
                Open
            </Button>
          </Link>
          <Link
              to={file[FileDownloadAsset]}
              target="_blank"
              className="file__download"
            >
              {/* <img src={downloadImage} alt="download" width={20} /> */}
              <Button ><img width={20} height={20} src="/download.png"/> Download</Button>
            </Link>
        </CardFooter>
      </Card>
    );
  };
 