import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';



const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);

    const {clearError, getCharacter, getComic, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData()
        // eslint-disable-next-line
    }, [id]);

    const onDataLoaded = (data) => {
        setData(data);
    }

    const updateData = () => {
        clearError();
        // eslint-disable-next-line
        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
        }
    }

    return (
        <>
            <AppBanner />
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;