// merger.js

// Define an async function to import the PDFMerger
async function importPDFMerger() {
    try {
        const { default: PDFMerger } = await import('pdf-merger-js');
        return PDFMerger;
    } catch (error) {
        throw new Error('Error importing PDFMerger:', error);
    }
}

// Define the main function to merge PDFs
async function mergedpdf(p1, p2) {
    const PDFMerger = await importPDFMerger();
    const merger = new PDFMerger();

    // Merge all pages from the first PDF
    await merger.add(p1);

    // Merge only page 2 from the second PDF
    await merger.add(p2);

    // Save the merged PDF with a timestamp as the filename
    let timestamp = new Date().getTime();
    await merger.save(`public/${timestamp}.pdf`);

    return timestamp;
}

async function mergedpdf_with_pages(p1, p2,page1,page2) {
    const PDFMerger = await importPDFMerger();
    const merger = new PDFMerger();
  
    if(page1==''){
    await merger.add(p1);

    // Merge only page 2 from the second PDF
    await merger.add(p2,page2);
    }
    else if(page2==''){
    await merger.add(p1,page1);
    // Merge only page 2 from the second PDF
    await merger.add(p2);
    }
    else{
    // Merge all pages from the first PDF
    await merger.add(p1,page1);

    // Merge only page 2 from the second PDF
    await merger.add(p2,page2);
    }
    // Save the merged PDF with a timestamp as the filename
    let timestamp = new Date().getTime();
    await merger.save(`public/${timestamp}.pdf`);

    return timestamp;
}


// Export the mergedpdf function
module.exports = { mergedpdf, mergedpdf_with_pages };
