async function checkWebGPU() {
  console.log(navigator.gpu);
  if (!navigator.gpu) {
    throw Error("WebGPU not supported.");
  }

  const adapter = await navigator.gpu.requestAdapter();
  console.log(adapter);
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }
}

checkWebGPU();
