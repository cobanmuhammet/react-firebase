import React, { useState } from 'react'
import app from "../../firebaseConfig"
import { Slide, toast, ToastContainer } from 'react-toastify'
import { getDatabase, push, ref, set } from 'firebase/database'
import { Link } from 'react-router-dom'

const Add = () => {
    const [inputValue1, setInputValue1] = useState('')
    const [inputValue2, setInputValue2] = useState('')

    const saveData = async () => {
        try {
            const db = getDatabase(app)
            const newDocRef = push(ref(db, "dogal/meyveler"))

            await set(newDocRef, {
                meyveIsmi: inputValue1,
                meyveAciklamasi: inputValue2
            })

            toast.success("Data Kaydedildi.")
            setInputValue1('')
            setInputValue2('')
        } catch (err) {
            console.error("Veri kaydedilirken hata oluştu:", err)
            toast.error("Data Kaydedilirken Hata Oluştu.")
        }
    }


    return (
        <div className="flex flex-col items-center space-y-4 p-6 min-h-screen">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                limit={2}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                transition={Slide}
            />
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Meyve Bilgisi Ekle</h2>
                <input type="text" value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} placeholder="Meyve İsmi"
                    className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="text" value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} placeholder="Meyve Açıklaması"
                    className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button onClick={saveData} className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition">
                    Kaydet
                </button>
            </div>
            <div className='flex space-x-4'>
                <Link to={'/'} className="w-[200px] h-[50px] flex items-center justify-center  px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                    Görüntüleme
                </Link>
            </div>
        </div>

    )
}

export default Add