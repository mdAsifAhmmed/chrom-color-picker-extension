const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorCode = document.querySelector(".colorpickercode");

btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async (clickValue) => {
      const [data] = clickValue;
      if (data.result) {
        const color = data.result.sRGBHex;
        colorGrid.style.backgroundColor = color;
        colorCode.innerHTML = `${color}`;
        try{
            await navigator.clipboard.writeText(color)
        }catch(err){console.log(err)}
      }
    }
  );
});


pickColor = async () => {
  try {
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
  } catch (err) {
    console.log(err);
  }
};
pickColor();
