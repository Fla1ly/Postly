import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Stack, Card, CardContent, Divider } from "@mui/material";
import NavbarContent from "../components/Nav";
import { format } from "date-fns";
import Comment from "../components/Comment";
import CreateComment from "../components/CreateComment.tsx";

interface Blog {
  category: string;
  author: string;
  title: string;
  dateCreated: string;
  subtitle: string;
  description: string;
}

const SingleBlog: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/postly/fetchBlog/${postId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setBlog(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/postly/fetchComments/${postId}`
        );
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  useEffect(() => {
    fetchBlog();
  }, [postId]);

  if (!blog) {
    return <Typography>Loading...</Typography>;
  }

  const formattedDate = format(new Date(blog.dateCreated), "MMMM d, yyyy");

  return (
    <NavbarContent>
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid #c4c4c4",
          mb: 4,
        }}
      >
        <Typography variant="h3" sx={{ mb: 1 }}>
          {blog.title}
        </Typography>
      </Stack>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {blog.title}
          </Typography>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 2,
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" color="text.secondary">
              {formattedDate} by {blog.author}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {blog.category}
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {blog.subtitle}
          </Typography>
          <Typography variant="body1">{blog.description}</Typography>
        </CardContent>
      </Card>
      <Stack
        sx={{
          width: "100%",
          justifyContent: "center",
        }}
      >
        <CreateComment />
        <Stack sx={{ width: "50%", mb: 3, mt: 3 }}>
          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </Stack>
      </Stack>
    </NavbarContent>
  );
};

export default SingleBlog;
