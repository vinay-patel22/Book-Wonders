import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// Define the ConfirmationDialog component
const ConfirmationDialog = (props) => {
  // Destructure the props object
  const { open, onClose, onConfirm, title, description } = props;
  
  // Render the dialog component
  return (
    <Dialog open={open} onClose={() => onClose()}>
      {/* Dialog title */}
      <DialogTitle>{title}</DialogTitle>
      
      <DialogContent>
        {/* Dialog content text */}
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      
      <DialogActions>
        {/* Cancel button */}
        <Button
          variant="contained"
          onClick={() => onClose()}
          sx={{
            color: "white",
            backgroundColor: "#f14d54",
            "&:hover": {
              backgroundColor: "#f14d54",
            },
            marginLeft: "8px",
            width: "100px",
          }}
        >
          Cancle
        </Button>
        
        {/* Ok button */}
        <Button
          variant="contained"
          onClick={() => onConfirm()}
          sx={{
            color: "white",
            backgroundColor: "#80BF32",
            "&:hover": {
              backgroundColor: "#80BF32",
            },
            marginLeft: "8px",
            width: "100px",
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Export the ConfirmationDialog component as the default export
export default ConfirmationDialog;
