import React, { useState, useEffect } from "react";
import NavbarContent from "../components/Nav";
import { Typography, Stack } from "@mui/material";
import FeaturedPost from "../components/post";

interface Blog {
  id: string;
  category: string;
  author: string;
  title: string;
  dateCreated: string;
  subtitle: string;
  description: string;
  date: string;
}

const categories = [
  "All",
  "Travel",
  "Technology",
  "Fashion",
  "Finance",
  "Education",
  "Sports",
  "Lifestyle",
  "Business",
  "Art & Design",
  "Science",
  "Politics",
  "Real Estate",
];

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/postly/fetchBlogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBlogs(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <NavbarContent>
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid #c4c4c4",
        }}
      >
        <Typography variant="h3" sx={{ mb: 1 }}>
          The Hub
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
          p: 1,
          overflowX: "auto",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {categories.map((category, index) => (
          <Typography
            key={index}
            variant="body1"
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            {category}
          </Typography>
        ))}
      </Stack>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ width: "65%", gap: 3, mt: 1 }}>
          {blogs.map((blog, index) => (
            <FeaturedPost
              key={index}
              post={{
                id: blog.id,
                author: blog.author,
                title: blog.title,
                date: blog.date,
                category: blog.category,
                subtitle: blog.subtitle,
                description: blog.description,
                dateCreated: blog.dateCreated,
              }}
            />
          ))}
        </Stack>
        <Stack sx={{ border: "1px red solid", width: "30%" }}></Stack>
      </Stack>
    </NavbarContent>
  );
};

export default Blogs;
