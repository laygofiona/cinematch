// Got the Frontend inspiration from: https://mui.com/material-ui/getting-started/templates/

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { styled } from "@mui/material/styles";

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "rgba(42, 30, 63, 0.3)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px rgba(42, 30, 63, 0.25)",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px rgba(140, 120, 170, 0.35)", // stronger glow
    outlineColor: "rgba(140, 120, 170, 0.2)", // lighter purple outline in dark mode
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(140, 120, 170, 0.4), transparent)",
        // lighter purple glow for light mode
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 100% at 50% -15%, rgba(61, 50, 80, 0.9), transparent)",
          // deeper purple gradient for dark mode
        }),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            Cine
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: "inherit",
                color: "primary.main",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              Match
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            Dating app that helps you find your perfect match through the movies
            you love (or love to hate), letting you swipe through films,
            discover shared favorites, and start conversations that go beyond
            small talk.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ minWidth: "fit-content", padding: "1em" }}
          >
            Go to Dashboard
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
