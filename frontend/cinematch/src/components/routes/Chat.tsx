import Box from "@mui/material/Box"; // Material Box
import MyMessages from "../chat/MyMessages";
import { CssVarsProvider } from "@mui/joy/styles";

import { useLockBodyScroll } from "@uidotdev/usehooks";

const Chat = () => {
  useLockBodyScroll();
  return (
    <>
      <CssVarsProvider>
        <Box sx={{ display: "flex" }}>
          <Box component="main" className="MainContent" sx={{ flex: 1 }}>
            <MyMessages />
          </Box>
        </Box>
      </CssVarsProvider>
    </>
  );
};

export default Chat;
