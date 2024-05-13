import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Stack,
  Divider,
  CardActions,
  Button,
} from "@mui/material";

function FeaturedPost({ post }) {
  const limitedDescription =
    post.description.length > 300
      ? `${post.description.slice(0, 300)}...`
      : post.description;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
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
              {limitedDescription}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Continue reading
            </Button>
          </CardActions>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedPost;
