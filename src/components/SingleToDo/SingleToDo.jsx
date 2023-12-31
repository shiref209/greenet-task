import { useState } from "react";
import { Card, Checkbox, Stack, Typography } from "@mui/material";
import EditModal from "../EditModal/EditModal.jsx";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";

const SingleToDo = ({ content, id }) => {
  // state to manage checkbox
  const [completed, setCompleted] = useState(false);
  const hanldeCompleted = () => {
    setCompleted(!completed);
  };
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "1rem 1rem",
        bgcolor: "aliceblue",
        width: "100%",
      }}
    >
      <Checkbox color={"success"} onChange={hanldeCompleted} />
      <Typography
        variant="body1"
        textAlign={"left"}
        color={completed ? "grey" : "black"}
        sx={{
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {content}
      </Typography>
      {/* Icons container */}
      <Stack marginLeft={"auto"} gap={2} direction={{ sm: "row" }}>
        <EditModal id={id} isCompleted={completed} />
        <DeleteModal id={id} />
      </Stack>
    </Card>
  );
};

export default SingleToDo;
