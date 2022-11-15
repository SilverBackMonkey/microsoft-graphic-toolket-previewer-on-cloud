import {
  makeStyles,
  Text,
  Card,
  CardHeader,
} from "@fluentui/react-components";
import * as React from "react";

import { getThumbnail } from "../../../utils/FileLogos";

const useStyles = makeStyles({

  card: {
    marginTop:"10px",
    marginLeft: "6px",
    backgroundColor: "#fafafa",
    width: "380px",
    maxWidth: "100%",
    height: "fit-content",
  },

});

export const DirectoryPreview = ({_onClick, dir}) => {
  const styles = useStyles();
  
  return (

        <Card
          className={styles.card}
          onClick={(e) => _onClick(dir, e)}
        >
          <CardHeader
            image={
              <img
                width="20px"
                height="20px"
                src={getThumbnail(dir)}
                alt=""
              />
            }
            header={<Text weight="semibold">{dir.name}</Text>}
          />
        </Card>

  );
};
