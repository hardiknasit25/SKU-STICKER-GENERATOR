import { useRef, useState } from 'react';
import './Main.css';
import Preview from '../Preview/Preview';
import Preview2 from '../Preview2/Preview2';

const Main = () => {

  const [isTrue, setTrue] = useState(false);
  const [isOption, setOption] = useState(true);
  const [allFieldsEmpty, setAllFieldsEmpty] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const qrCode = useRef(null);
  const productName = useRef(null);
  const skuName = useRef(null);
  const mrp = useRef(null);

  const onClickShowPreview = (event) => {
    event.preventDefault();

    if (!selectedImage && !qrCode.current.value && !productName.current.value && !skuName.current.value && !mrp.current.value) {
      setAllFieldsEmpty(true);
    } else {
      setTrue(true);
    }
  }

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  }

  const handleOptionChange = (event) => {
    if (event.target.value == 6)
      setOption(true);
    else if (event.target.value == 3)
      setOption(false);
  }

  const onClickHidePreview = () => {
    setTrue(false);
  }


  return (
    <div className='m-wrapper'>
      <div className='m-container'>
        <div className='m-input'>
          <div className='title'>
            <h2>SKU STICKER GENERATOR</h2>
          </div>
          <div className='qr-code'>
            <label>Upload your QR Code: (Upload QR Code Screen Short)</label>
            <input type='file' accept='image/*' onChange={handleImageChange}></input>
          </div>

          <div className='qr-code'>
            <label>Enter QR Code Number</label>
            <input type='text' ref={qrCode}></input>
          </div>

          <div className='qr-code'>
            <label>Enter Product Name</label>
            <input type='text' ref={productName}></input>
          </div>

          <div className='qr-code'>
            <label>Enter SKU Name</label>
            <input type='text' ref={skuName}></input>
          </div>

          <div className='qr-code'>
            <label>Enter MRP</label>
            <input type='number' ref={mrp}></input>
          </div>

          <div className='qr-code'>
            <label>Select Size</label>
            <select onClick={handleOptionChange}>
              <option value={6}>2" X 3"</option>
              <option value={3} >1.5" X 2.5"</option>
            </select>
          </div>

          <div className='l-button' onClick={onClickShowPreview}>
            <button href="" className="download-btn">
              Generate
            </button>
          </div>

          {allFieldsEmpty && <p className="error-message" style={{ color: "red" }}>Please fill in all fields.</p>}

        </div>
        {isTrue &&
          <>
            {isOption ?
              <Preview onClickHide={onClickHidePreview}
                qrImage={selectedImage}
                qrCode={qrCode.current.value}
                productName={productName.current.value}
                skuName={skuName.current.value}
                mrp={mrp.current.value} /> :

              <Preview2 onClickHide={onClickHidePreview}
                qrImage={selectedImage}
                qrCode={qrCode.current.value}
                productName={productName.current.value}
                skuName={skuName.current.value}
                mrp={mrp.current.value} />
            }
          </>

        }
      </div>
    </div >
  )
}

export default Main;