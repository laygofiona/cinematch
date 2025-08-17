import * as React from "react";
// Only use CssVarsProvider if you plan to use Joy UI components somewhere
import CssBaseline from "@mui/material/CssBaseline"; // Use Material baseline
import Box from "@mui/material/Box"; // Material Box
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MyMessages from "./components/MyMessages";

const Chat = () => {
  return (
    <h1>Chat</h1>
    //   <CssBaseline />
    //   <Box sx={{ display: "flex", minHeight: "100dvh" }}>
    //     <Sidebar />
    //     <Header />
    //     <Box component="main" className="MainContent" sx={{ flex: 1 }}>
    //       <MyMessages />
    //     </Box>
    //   </Box>
  );
};

export default Chat;
