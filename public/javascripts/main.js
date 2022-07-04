const dragArea = document.querySelector('.drag-area');

let supported = BarcodeDetector.getSupportedFormats();

const barcodeDetector = new BarcodeDetector(supported);

let file;

dragArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dragArea.classList.add('active');
});

dragArea.addEventListener('dragleave', () => {
    dragArea.classList.remove('active')
});

dragArea.addEventListener('drop', (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    

    let fileType = file.type;

    let validExt = ["image/jpeg", "image/png", "image/jpg"];

    console.log(file);

    if(validExt.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileUrl = fileReader.result;
            let imgEl = document.createElement('img');
            imgEl.src = fileUrl;
            
            // Start detecting codes on to the video element
            barcodeDetector.detect(imgEl).then(codes => {
             // If no codes exit function
            if (codes.length === 0) alert("No QR found!");
            else{
                for (const barcode of codes)  {
                    window.open(barcode.rawValue, '_blank').focus();
                }
            }
            }).catch(err => {
                alert("QR scan failed try again!");
            })
            
        }

        fileReader.readAsDataURL(file);
    } else {
        alert("Unsupported file type!");
    }
    dragArea.classList.remove('active');
});


const detectCode = () => {
    // Start detecting codes on to the video element
    barcodeDetector.detect(file).then(codes => {
      // If no codes exit function
      if (codes.length === 0) return;
      
      for (const barcode of codes)  {
        // Log the barcode to the console
        console.log(barcode)
      }
    }).catch(err => {
      // Log an error if one happens
      console.error(err);
    })
  }
