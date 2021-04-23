import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Form1 from 'content/assets/images/forms/1696.jpg';

class ComponentToPrint extends React.PureComponent {
    render() {
        return (
            <img src={Form1} alt="SSN Form 1696 Last Page" />
        );
    }
}

const PrintableForm1 = () => {
    const componentRef = useRef();
    return (
        <div>
            <ReactToPrint
                trigger={() => <button type="button">Print Appointment of Representative</button>}
                content={() => componentRef.current}
            />
            <ComponentToPrint ref={componentRef} />
        </div>
    );
};

export default PrintableForm1;
