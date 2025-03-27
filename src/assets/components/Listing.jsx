import React, { useEffect, useState } from 'react'
import app from "../../firebaseConfig"
import { getDatabase, ref, get, set } from 'firebase/database'
import { Link, useNavigate } from 'react-router-dom'
import { Slide, toast, ToastContainer } from 'react-toastify'

const Listing = () => {
    const [fruits, setFruits] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const db = getDatabase(app)
        const snapshot = await get(ref(db, "dogal/meyveler"))

        if (snapshot.exists()) {
            const myData = snapshot.val()
            const meyveler = Object.keys(myData).map(meyveId => {
                return {
                    ...myData[meyveId],
                    meyveId: meyveId
                }
            })

            setFruits(meyveler)
        } else {
            console.log("Veri bulunamadı.")
        }
    }

    const deleteData = async (meyveId) => {
        try {
            const db = getDatabase(app)
            await set(ref(db, "dogal/meyveler/" + meyveId), null)
            toast.success("Data Silindi.")
            setFruits(fruits.filter(fruit => fruit.meyveId !== meyveId))
        } catch (err) {
            console.error("Data silinirken hata oluştu:", err)
            toast.error("Data Silinirken Hata Oluştu.")
        }
    }

    return (
        <div className="flex flex-col items-center space-y-4 p-4 min-h-screen">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                {fruits.map((fruit, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 hover:shadow-2xl transition">
                        <h3 className="text-lg font-bold text-gray-800">{fruit.meyveIsmi}</h3>
                        <p className="text-gray-600">{fruit.meyveAciklamasi}</p>
                        <div className='w-full flex space-x-4 justify-center items-center'>
                            <button className="mt-5 w-[100px] h-[30px] flex items-center justify-center  px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all ease-in-out delay-100"
                                onClick={() => navigate(`/update/${fruit.meyveId}`)}>Güncelle</button>
                            <button className="mt-5 w-[100px] h-[30px] flex items-center justify-center  px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all ease-in-out delay-100"
                                onClick={() => deleteData(fruit.meyveId)}>Sil</button>
                        </div>
                    </div>
                ))}
            </div>
            <Link to={'/add'} className="w-[200px] h-[50px] flex items-center justify-center  px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
                Ekleme
            </Link>
        </div>

    )
}

export default Listing