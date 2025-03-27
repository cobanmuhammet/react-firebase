import React, { useEffect, useState } from 'react'
import app from "../../firebaseConfig"
import { Slide, toast, ToastContainer } from 'react-toastify'
import { getDatabase, push, ref, set, get } from 'firebase/database'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Update = () => {
    const [inputValue1, setInputValue1] = useState('')
    const [inputValue2, setInputValue2] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const db = getDatabase(app)
        const snapshot = await get(ref(db, "dogal/meyveler/" + id))

        if (snapshot.exists()) {
            const myData = snapshot.val()
            setInputValue1(myData.meyveIsmi)
            setInputValue2(myData.meyveAciklamasi)
        } else {
            console.log("Veri bulunamadı.")
        }
    }

    const updateData = async () => {
        try {
            const db = getDatabase(app)
            await set(ref(db, "dogal/meyveler/" + id), {
                meyveIsmi: inputValue1,
                meyveAciklamasi: inputValue2
            })
            toast.success("Data Güncellendi.")
            setInputValue1('')
            setInputValue2('')
            setTimeout(() => {
                navigate('/listing')
            }, 2500)
        } catch (err) {
            console.error("Data güncellenirken hata oluştu:", err)
            toast.error("Data güncellenirken Hata Oluştu.")
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
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Meyve Güncelle</h2>
            <input type="text" value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} placeholder="Meyve İsmi"
                className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="text" value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} placeholder="Meyve Açıklaması"
                className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button onClick={updateData} className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition">
                Güncelle
            </button>
        </div>
        <Link to={'/'} className="w-[200px] h-[50px] flex items-center justify-center  px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Görüntüleme
        </Link>

    </div>

)
}

export default Update