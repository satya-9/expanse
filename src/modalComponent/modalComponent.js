import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const item = props.results;

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="md"
    >
      <DialogTitle style={{ marginLeft: "10px", fontWeight: "bold" }}>
        {item.title}
      </DialogTitle>
      <DialogContent>
        <div style={{ display: "flex",flexDirection:"row" }}>
          <div>
            <p className="spotLightText" style={{ textAlign: "justify" }}>
              {item?.explanation}
            </p>
            <p className="spotLightText" style={{ textAlign: "left" }}>
              <b>Author:</b> {item.copyright}
            </p>
          </div>
          {item.media_type === "image" && (
            <img className="shimmer" style={{ float: "left" }} src={item.url} />
          )}
          {item.media_type === "video" && (
            <iframe className="shimmer" src={item.url} title={item.title} />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
