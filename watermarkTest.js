const fs = require('fs')
const { PDFDocument, PDFName, StandardFonts, rgb, degrees, rotate } = require('pdf-lib')

const PDF_PATH = process.cwd()
const URI = 'https://pdf-lib.js.org/'

const go = async () => {
  const pdf = await PDFDocument.create()
  const page = pdf.addPage()
  const helveticaFont = await pdf.embedFont(StandardFonts.Helvetica)
  page.drawText(URI, {
    x: 23,
    y: 43,
    size: 20,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(90),
  })
  const link = createPageLinkAnnotation(pdf, '', page)
  page.node.set(PDFName.of('Annots'), pdf.context.obj([link]))
  const pdfBytes = await pdf.save()  
  fs.writeFileSync(`${PDF_PATH}/test.pdf`, pdfBytes)
}

const createPageLinkAnnotation = (pdf) =>
  pdf.context.register(
    pdf.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [0, 30, 40, 300 ],
      Border: [0, 0, 2],
      C: [0, 0, 1],
      A: {
        Type: 'Action',
        S: 'URI',
        URI,
      }
    }),
  )

go().catch(err => console.log(err))
