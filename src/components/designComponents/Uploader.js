import React, { useEffect, useState } from 'react';
import { storage } from '../../firebasecfg';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../contexts/AuthContext';
import { v4 } from 'uuid';

const Uploader = () => {
    const [image, setImage] = useState(null);
    const [imageList, setImageList] = useState([]);
    const {currentUser} = useAuth();
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleUpload = () => {
        if(image === null) return;
        setLoading(true);
        const imageRef = ref(storage, `${currentUser.uid + '/' + image.name + v4()}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev => [...prev, url]));
            })
            setSuccess("Image Uploaded");
            setLoading(false);
            setImage(null);
            setTimeout(() => {
                setSuccess('');
            },4000);
        }).catch((err) => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        if(imageList.length !== 0) return;
        const imageListRef = ref(storage, `${currentUser.uid + '/'}`);
        listAll(imageListRef).then((res) => {
            res.items.map((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        })
    },[]);

  return (
    <div className='container mx-auto p-4 flex items-center flex-col'>
        <div className='flex flex-col mx-auto items-center space-y-2'>
            {success && <div className='bg-green-400 mb-2 text-black text-center'>
                {success}
            </div>}
            <input type='file' className='ml-10' accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
            <button disabled={loading} onClick={handleUpload} type='submit' className='mr-10 px-3 mt-2 w-[185px] py-1 rounded-xl bg-[#989DD0] text-purple-900 transition-all duration-100 hover:text-[#989DD0] hover:bg-purple-900'>Submit</button>
        </div>
        <div className='flex flex-col mt-6 flex-wrap items-center space-x-2 space-y-2 justify-center md:flex-row'>
            {imageList.map((imgURL) => {
                return(
                    <img src={imgURL} width='300px' />
                )
            })}
        </div>
    </div>
  )
}
export default Uploader