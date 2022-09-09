import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';
import InvoiceData from './InvoiceData ';

function FinalDocument({records}) {
    const fileName = "Invoice.pdf";

    return (
        <div>
            {/*<PDFViewer width={1200} height={700} showToolbar={true}>*/}
            {/*    <PdfDocument invoicedata={records} />*/}
            {/*</PDFViewer>*/}

            <div className='download-link'>
                <PDFDownloadLink
                    document={<PdfDocument invoicedata={records} />}
                    fileName={fileName}
                >
                    {({ blob, url, loading, error }) =>
                        loading ? "Loading..." : "Download Invoice"
                    }
                </PDFDownloadLink>
            </div>
        </div>
    );
}

export default FinalDocument;