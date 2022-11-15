import { Button, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components";
import { Dismiss24Regular, Open16Regular } from "@fluentui/react-icons";
import { FileLoading } from "./FileLoading";

export default function OpenDialogViewer(props) {
  const file = props.file;
  debugger;
  return (
    <>
    <Dialog>
      <DialogTrigger action="open">
        <Button icon={<Open16Regular />} iconPosition="before">Open</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle
            action={
              <DialogTrigger action="close">
                <Button
                  appearance="subtle"
                  aria-label="close"
                  icon={<Dismiss24Regular />}
                />
              </DialogTrigger>
            }
          >
            {file?.name}
          </DialogTitle>
          <DialogContent slot="<FileLoading file={file}/>">
            {/* <Image src={props.url} width="500px" height="600px" fit="contain"/> */}
            {/* {file?.webUrl && 
              <FileLoading file={file}/>
            } */}
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  </>);
}