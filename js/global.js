// ----------Script for editors panel----------//

var sidePanel = document.getElementsByClassName("dev")[0];

var editorPanelLeft = window
  .getComputedStyle(sidePanel, null)
  .getPropertyValue("left");

// Function to open editor panel

document.getElementsByClassName("view-editor")[0].addEventListener("click", () => {
  sidePanel.style.left = "0px";
  sidePanel.style.opacity = "1";
});

// Function to close editor panel
document.getElementsByClassName("panel-close")[0].addEventListener("click", () => {
  sidePanel.style.left = editorPanelLeft;
  sidePanel.style.opacity = "0";
});