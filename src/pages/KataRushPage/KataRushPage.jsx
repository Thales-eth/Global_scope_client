import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KataTemplate from '../../components/KataTemplate/KataTemplate';
import kataService from '../../services/kata.services';
import './KataRushPage.css'
import Loader from '../../components/Loader/Loader';

const KataRushPage = () => {

    const [katas, setKatas] = useState([])

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

            <KataTemplate katas={katas} />

    )
}

export default KataRushPage
