import React, { useState, useEffect } from "react";
import UserPost from "../components/userPost";
import { Stack, Typography } from "@mui/material";
import NavbarContent from "../components/Nav";

interface userBlog {
  id: string;
  category: string;
  author: string;
  title: string;
  dateCreated: string;
  subtitle: string;
  description: string;
  date: string;
  status: string;
  visibility: string;
}

const Inventory: React.FC = () => {
  const [userBlogs, setUserBlogs] = useState<userBlog[]>([]);

  const fetchUserBlogs = async () => {
    const username = localStorage.getItem("username");
    if (!username) {
      console.log("no user found");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/postly/fetchUserBlogs/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserBlogs(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching user blogs:", error);
    }
  };

  useEffect(() => {
    fetchUserBlogs();
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
          Your blogs
        </Typography>
      </Stack>
      <Stack sx={{ width: "65%", gap: 3, mt: 2 }}>
        {userBlogs.map((blog, index) => (
          <UserPost
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
              visibility: blog.visibility,
              status: blog.status,
            }}
          />
        ))}
      </Stack>
    </NavbarContent>
  );
};

export default Inventory;
