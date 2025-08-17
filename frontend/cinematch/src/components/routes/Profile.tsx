import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { supabase } from "../SupabaseClient"; // your supabase client

export default function Profile() {
  const [user, setUser] = React.useState<{
    name: string;
    email: string;
    avatar?: string;
  } | null>(null);

  React.useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser({
          name: user.user_metadata.full_name || "Anonymous",
          email: user.email || "No email",
          avatar:
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            "/static/images/avatar/2.jpg",
        });
      }
    }
    fetchUser();
  }, []);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
        px: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 2, position: "relative" }}>
        {/* User Icon */}
        <CardMedia
          component="img"
          image={user?.avatar}
          alt="User Avatar"
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            mx: "auto",
            mb: 2,
          }}
        />

        <CardContent>
          <Stack spacing={2}>
            {/* Name */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="h6">{user.name}</Typography>
            </Box>

            {/* Email */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailRoundedIcon fontSize="small" color="action" />
                <Typography variant="body1">{user.email}</Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
