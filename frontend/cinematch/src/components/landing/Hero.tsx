// Got the Frontend inspiration from: https://mui.com/material-ui/getting-started/templates/

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // 👈 import Framer Motion

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
    boxShadow: "0 0 24px 12px rgba(140, 120, 170, 0.35)",
    outlineColor: "rgba(140, 120, 170, 0.2)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(140, 120, 170, 0.4), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 100% at 50% -15%, rgba(61, 50, 80, 0.9), transparent)",
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
          {/* Logo with fade */}
          <motion.img
            src="/CineMatch_logo.svg"
            alt="Logo"
            style={{ width: 200, height: 200, marginRight: "8px" }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          />

          {/* Title */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
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
          </motion.div>

          {/* Subtitle */}
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

          {/* Button */}
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              minWidth: "fit-content",
              padding: "0.8em",
              fontWeight: "1000",
            }}
            component={Link}
            to="/swipe"
          >
            Go to Dashboard
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
