import {
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Divider,
} from "@mui/material";

interface userPost {
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

function UserPost({ post }: { post: userPost }) {
  const limitedDescription =
    post.description.length > 300
      ? `${post.description.slice(0, 300)}...`
      : post.description;

  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "auto",
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5" mt={0.35}>
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {post.dateCreated}
          </Typography>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle1" color="text.secondary" mb={0.35}>
              Written by {post.author}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={0.35}>
              {post.category}
            </Typography>
          </Stack>
          <Divider />
          <Typography variant="subtitle1" color="text.secondary">
            {post.subtitle}
          </Typography>
          <Typography variant="subtitle1">{limitedDescription}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default UserPost;
