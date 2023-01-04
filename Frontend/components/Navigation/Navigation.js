import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const StyledTab = styled(Tab)({
  "&.MuiTab-root": {
    color: "#bdf6ff",
    background: "#202124",
  },
  "&.Mui-selected": {
    color: "#00bcd5",
  },
});

export default function Navigation() {
  const [value, setValue] = useState("Home");
  const router = useRouter();
  const pathName = router.pathname;

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        setValue("Home");
        return pathName === "/" ? null : router.push("/");
      case 1:
        setValue("Edit");
        return pathName === "/edit" ? null : router.push("/edit");
      default:
        setValue("Home");
    }
  };

  return (
    <Box sx={{ width: "100%", marginTop: "10px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#00bcd5",
            height: "3px",
            top: "40px",
          },
        }}
        centered
      >
        <StyledTab label="Home"/>
        <StyledTab label="Edit"/>
        <StyledTab label="About"/>
        <StyledTab label="Contact"/>
        <StyledTab label="Login"/>
      </Tabs>
    </Box>
  );
}
