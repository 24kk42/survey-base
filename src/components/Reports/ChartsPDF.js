import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { centerFooter, centerTitle } from '../Chart/PieChart';

export default async function ChartsPDF(html, heightOfPapers, setBackdropLoading) {
  let doc_width = 8.27;
  let doc_height = 11.69;
  //let aspect = doc_height / doc_width;
  let dpi = 160;
  let img_width = doc_width * dpi;
  let img_height = doc_height * dpi;
  let win_width = img_width;
  let win_height = img_height;
  let jsPDFOpts = {
    orientation: 'portrait',
    unit: 'in',
    format: [doc_width, doc_height]
  };
  let pdf = new jsPDF(jsPDFOpts);
  let htmls = [];

  let htmlCopy = html.cloneNode(true);

  let pageIndex = 0;
  let cumulativeHeight = 0;

  let barCharts = htmlCopy.getElementsByClassName("barChart");
  for(let i = 0; i < barCharts.length; i++) {
    await formatHtml(barCharts[i]);
  }
  let pieCharts = htmlCopy.getElementsByClassName("pieChart");
  for(let i = 0; i < pieCharts.length; i++) {
    await formatHtml(pieCharts[i]);
  }

  await addToCanvas();
  pdf.save('grafikler.pdf');
  setBackdropLoading(false);

  async function formatHtml(paper) {
    let labels = paper.getElementsByClassName("noDataLabel");
    if(labels.length > 0) {
      return;
    }

    //Center date footer
    centerFooter(paper);

    //Center title
    centerTitle(paper);
    

    //Make background transparent 
    paper.style.backgroundColor = "transparent";
    paper.style.color = "black";

    //Make grid black
    let lines = paper.getElementsByTagName("line");
    for(let i = 0; i < lines.length; i++) {
      lines[i].setAttribute("stroke", "black");
    }

    //Make text black
    let texts = paper.getElementsByTagName("text");
    for(let i = 0; i < texts.length; i++) {
      texts[i].setAttribute("fill", "black");
      texts[i].setAttribute("style", "fill: 'black'");
    }

    cumulativeHeight += heightOfPapers;
    
    //Remove button
    let buttons = paper.getElementsByTagName("button");
    for(let j = 0; j < buttons.length; j++) {buttons[j].remove();}

    //If the page is going to overflow, add a new page
    if(cumulativeHeight - (pageIndex + 1) * 1600 > 0) {
      await addToCanvas();
      pageIndex++;
      pdf.addPage();
    }

    if(!htmls[pageIndex]) {
      htmls[pageIndex] = document.createElement("div");
    }
    htmls[pageIndex].style.backgroundColor = "transparent";
    htmls[pageIndex].appendChild(paper.cloneNode(true));
  }

  async function addToCanvas() {
    let htmlPage = htmls[pageIndex];
    htmlPage.style.position = "fixed"; 
    htmlPage.style.left = 0; 
    //htmlPage.style.top = "4000px";
    htmlPage.style.zIndex = -10;
    document.body.appendChild(htmlPage);
    let html2canvasOpts = {
      x: -50,
      //y: 3950,
      y: -50,
      scrollX: 0,
      scrollY: 0,
      scale: img_width/win_width,
      width: img_width,
      height: img_height,
      windowWidth: win_width,
      windowHeight: win_height,
    };
    let canvas = await html2canvas(htmlPage, html2canvasOpts);
    pdf.addImage(canvas, 'JPG', 0, 0, doc_width+.16, doc_height);
    document.body.removeChild(htmlPage);
  }
}