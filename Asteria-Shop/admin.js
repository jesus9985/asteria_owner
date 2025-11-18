function checkPass() {
  const input = document.getElementById("password").value;
  if (input === "asteriafn") {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("upload-box").style.display = "block";
  } else {
    document.getElementById("wrong").style.display = "block";
  }
}

async function upload() {
  const file = document.getElementById("fileInput").files[0];

  const reader = new FileReader();

  reader.onload = async () => {
    const base64 = reader.result.split(",")[1];

    await fetch("/.netlify/functions/upload", {
      method: "POST",
      body: JSON.stringify({
        fileName: file.name,
        fileData: base64
      })
    });

    alert("Uploaded!");
  };

  reader.readAsDataURL(file);
}
