import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Stack, Card, CardContent, Divider } from "@mui/material";
import NavbarContent from "../components/Nav";
import { format } from "date-fns";

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
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  if (!blog) {
    return <Typography>Loading...</Typography>;
  }

  // Format the date
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
          <Typography variant="subtitle1" color="text.secondary">
            {formattedDate} by {blog.author}
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
              Written by {blog.author}
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
    </NavbarContent>
  );
};

export default SingleBlog;
