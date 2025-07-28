const btnAcak = document.getElementById("btnAcak");
const btnJpg = document.getElementById("btnJpg");
const btnPdf = document.getElementById("btnPdf");
const result = document.getElementById("result");
const captureArea = document.getElementById("captureArea");

btnAcak.addEventListener("click", bagiKelompok);
btnJpg.addEventListener("click", downloadJPG);
btnPdf.addEventListener("click", downloadPDF);

function bagiKelompok() {
  const jumlahKelompok = parseInt(document.getElementById("jumlahKelompok").value) || 5;
  let siswa = Array.from({ length: 36 }, (_, i) => i + 1);

  // Acak array
  siswa.sort(() => Math.random() - 0.5);

  // Bagi menjadi kelompok
  let kelompok = [];
  for (let i = 0; i < jumlahKelompok; i++) kelompok[i] = [];
  siswa.forEach((s, index) => kelompok[index % jumlahKelompok].push(s));

  // Tampilkan hasil
  result.innerHTML = "";
  kelompok.forEach((k, i) => {
    const div = document.createElement("div");
    div.className = "group";
    div.innerHTML = `
      <h3>Kelompok ${i + 1}</h3>
      <ol>${k.map(n => `<li>Siswa ${n}</li>`).join("")}</ol>`;
    result.appendChild(div);
  });
}

async function downloadJPG() {
  const canvas = await html2canvas(captureArea, { backgroundColor: "#ffffff" });
  const link = document.createElement("a");
  link.download = "pembagian-kelompok.jpg";
  link.href = canvas.toDataURL("image/jpeg");
  link.click();
}

async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const canvas = await html2canvas(captureArea, { backgroundColor: "#ffffff" });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, width, height);
  pdf.save("pembagian-kelompok.pdf");
}
