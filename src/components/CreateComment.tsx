import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Button, Stack, TextField } from "@mui/material";

function CreateComment() {
  const { postId } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log("postId:", postId);
  }, [postId]);
  
  const handleSubmit = async () => {
    try {
      const data = {
        made_by: localStorage.getItem("username"),
        content: content,
        postId: postId,
      };
      const response = await fetch(
        `http://localhost:5000/postly/createComment/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Comment failed");
      }

      console.log("Comment successful");
    } catch (error) {
      console.error("Error commenting:", error);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: 4,
          height: 75,
          alignItems: "center",
        }}
      >
        <Avatar />
        <Stack
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            ml: 1,
            mt: 1,
          }}
        >
          <TextField
            id="standard-basic"
            placeholder="Add a comment..."
            inputProps={{
              style: {
                fontSize: "15px",
              },
            }}
            variant="standard"
            onChange={handleContentChange}
            fullWidth
          />
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <Button
              variant="outlined"
              sx={{ fontSize: "12px", borderRadius: "20px", height: 27.5 }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              sx={{ fontSize: "12px", borderRadius: "20px", height: 27.5 }}
              onClick={handleSubmit}
            >
              Comment
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default CreateComment;
