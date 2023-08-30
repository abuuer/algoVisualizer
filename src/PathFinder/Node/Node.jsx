import { useState } from "react";
import "./Node.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import { lightGreen, deepOrange } from "@mui/material/colors";
import PersonPinIcon from "@mui/icons-material/PersonPin";

function Node(props) {
  const { currentNode } = props;

  return (
    <div id={`node-${currentNode.row}-${currentNode.col}`}>
      {currentNode.startNode && (
        <PersonPinIcon
          sx={{ color: lightGreen[700] }}
          fontSize="medium"
          className="startIcon"
        />
      )}
      {currentNode.finishNode && (
        <LocationOnIcon
          sx={{ color: deepOrange[500] }}
          fontSize="medium"
          className="startIcon"
        />
      )}
    </div>
  );
}

export default Node;
