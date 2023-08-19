import { useState } from "react";
import "./Node.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { green, red } from "@mui/material/colors";

function Node(props) {
  const { currentNode } = props;


  return (
    <div className={`node`}>
      {currentNode.startNode && (
        <LocationOnIcon
          sx={{ color: green[600] }}
          fontSize="large"
          className="startIcon"
        />
      )}
      {currentNode.finishNode && (
        <SportsScoreIcon
          sx={{ color: red[600] }}
          fontSize="large"
          className="startIcon"
        />
      )}
    </div>
  );
}

export default Node;
