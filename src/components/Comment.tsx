import { useEffect, useState } from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

interface CommentProps {
  comment: any;
}

const calculateTimeDifference = (createdAt: string): string => {
  const currentTime = new Date();
  const createdTime = new Date(createdAt);

  const difference = currentTime.getTime() - createdTime.getTime();

  const hoursDifference = Math.floor(difference / (1000 * 60 * 60));

  if (hoursDifference === 0) {
    return "Just now";
  } else {
    return `${hoursDifference} hour${hoursDifference === 1 ? "" : "s"} ago`;
  }
};

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [timeElapsed, setTimeElapsed] = useState<string>("");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [like, setLike] = useState<number>(0);

  useEffect(() => {
    const elapsedTime = calculateTimeDifference(comment.dateCreated);
    setTimeElapsed(elapsedTime);

    const interval = setInterval(() => {
      const elapsedTime = calculateTimeDifference(comment.dateCreated);
      setTimeElapsed(elapsedTime);
    }, 60000);

    return () => clearInterval(interval);
  }, [comment.dateCreated]);

  const handleReaction = (type: "like" | "dislike") => {
    if (type === "like") {
      if (isLiked) {
        setIsLiked(false);
        setLike(like - 1);
      } else {
        setIsLiked(true);
        setLike(like + 1);
        if (isDisliked) {
          setIsDisliked(false);
        }
      }
    } else if (type === "dislike") {
      if (isDisliked) {
        setIsDisliked(false);
      } else {
        setIsDisliked(true);
        if (isLiked) {
          setIsLiked(false);
          setLike(like - 1);
        }
      }
    }
  };

  return (
    <Stack sx={{ display: "flex", flexDirection: "row", mt: 5 }}>
      <Stack>
        <Avatar />
      </Stack>
      <Stack sx={{ ml: 1.3 }}>
        <Stack
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography>{comment.made_by}</Typography>
          <Typography sx={{ fontSize: "12.25px", color: "#808080", ml: 0.65 }}>
            {timeElapsed}
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="body1">{comment.content}</Typography>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mt: 0.75,
          }}
        >
          {isLiked ? (
            <ThumbUpAltIcon onClick={() => handleReaction("like")} />
          ) : (
            <ThumbUpOffAltIcon onClick={() => handleReaction("like")} />
          )}
          <Stack sx={{ ml: 0.5 }}>{like}</Stack>
          {isDisliked ? (
            <ThumbDownAltIcon
              sx={{ ml: 1.25 }}
              onClick={() => handleReaction("dislike")}
            />
          ) : (
            <ThumbDownOffAltIcon
              sx={{ ml: 1.25 }}
              onClick={() => handleReaction("dislike")}
            />
          )}
          <Typography sx={{ fontSize: "16px", ml: 2 }}>Reply</Typography>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mt: 0.75,
          }}
        >
          <KeyboardArrowDownIcon />
          <Typography variant="body1" sx={{ ml: 1 }}>
            0 replies
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Comment;
