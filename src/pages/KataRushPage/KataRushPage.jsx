import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KataTemplate from '../../components/KataTemplate/KataTemplate';
import kataService from '../../services/kata.services';
import './KataRushPage.css'
import Loader from '../../components/Loader/Loader';

const KataRushPage = () => {

    const [katas, setKatas] = useState([])

    // const [kata1, kata2, kata3, kata4, kata5, kata6, kata7, kata8, kata9, kata10] = katas

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadKatas()
    }, [])

    const loadKatas = () => {
        kataService
            .getAllKatas()
            .then(({ data }) => {
                setKatas(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (

        isLoading ? <Loader />

            :

            <div className='kataRushContent'>

                <h1>Welcome to <i> Kata Rush </i> 🔥</h1>

                <KataTemplate katas={katas} />

            </div >
    )
}

export default KataRushPage
