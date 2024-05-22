import NavBarContent from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Button } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <NavBarContent>
      <Stack
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ display: "inline", marginRight: "10px" }}
                >
                  Welcome!
                </Typography>
                {isLoggedIn ? (
                  <Typography
                    variant="h2"
                    sx={{ display: "inline", marginLeft: "10px" }}
                  >
                    <strong>{localStorage.getItem("username")}</strong>
                  </Typography>
                ) : null}
              </Stack>
              {!isLoggedIn && (
                <>
                  <Typography variant="h5">Get started quickly!</Typography>
                  <Typography variant="h6">
                    Sign up or log in to get started
                  </Typography>
                  <Stack
                    sx={{
                      display: "flex",
                      gap: 1,
                      flexDirection: "row",
                      width: "100%",
                      mb: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ width: "100%" }}
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ width: "100%" }}
                      onClick={() => navigate("/signup")}
                    >
                      Signup
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          </Stack>
          <Stack>
            <img
              src="https://source.unsplash.com/random/800x600"
              alt="random"
              style={{ width: "100%", height: "100%" }}
            />
          </Stack>
        </Stack>
      </Stack>
    </NavBarContent>
  );
}
