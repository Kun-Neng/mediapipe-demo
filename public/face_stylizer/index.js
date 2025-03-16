// import { FaceStylizer, FilesetResolver, MPImage } from "https://cdn.skypack.dev/@mediapipe/tasks-vision@0.10.6";
import { FaceStylizer, FilesetResolver, MPImage } from "./vision_bundle.mjs";

async function createFaceStylizer() {
  const dropdown = document.querySelector("#styleSelector");
  const selectedStyleModel = dropdown.options[dropdown.selectedIndex].value;

  if (faceStylizer !== undefined) {
    console.log("Clean up any existing Face Stylizer instance");
    faceStylizer.close();
  }

  const vision = await FilesetResolver.forVisionTasks(
    // "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.6/wasm"
    "./wasm"
  );

  faceStylizer = await FaceStylizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: selectedStyleModel
    }
  });
}

async function selectPortraitImage(event) {
  const element = event.currentTarget;
  let selectedFileImage = element.files[0];

  if (FileReader && selectedFileImage) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      portraitImage.src = fileReader.result;
    }
    fileReader.readAsDataURL(selectedFileImage);
  }
}

async function generateStyledFace() {
  try {
    const faceStylizerResult = faceStylizer.stylize(portraitImage);
    const imageData = faceStylizerResult.getAsImageData();

    const canvas = document.querySelector("#faceCanvas");
    // canvas.setAttribute("width", `${portraitImage.naturalWidth}px`);
    // canvas.setAttribute("height", `${portraitImage.naturalHeight}px`);
    canvas.setAttribute("width", "256px");
    canvas.setAttribute("height", "256px");

    const ctx = canvas.getContext("2d");
    ctx.putImageData(imageData, 0, 0);
  } catch (error) {
    console.error(error);
    alert("生成圖片發生錯誤");
  }
}

let faceStylizer;
createFaceStylizer();
document.querySelector("#changeStyle").addEventListener("click", createFaceStylizer);

const portraitImage = document.querySelector("#portraitImage");
document.querySelector("#portraitInput").addEventListener("change", selectPortraitImage);
document.querySelector("#generate").addEventListener("click", generateStyledFace);
