import { useState } from "react";
import "./Node.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { green, red } from "@mui/material/colors";
import PersonPinIcon from "@mui/icons-material/PersonPin";

function Node(props) {
  const { currentNode } = props;

  return (
    <div id={`node-${currentNode.row}-${currentNode.col}`}>
      {currentNode.startNode && (
        <PersonPinIcon
          sx={{ color: green[600] }}
          fontSize="large"
          className="startIcon"
        />
      )}
      {currentNode.finishNode && (
        <LocationOnIcon
          sx={{ color: red[600] }}
          fontSize="large"
          className="startIcon"
        />
      )}
    </div>
  );
}

export default Node;
