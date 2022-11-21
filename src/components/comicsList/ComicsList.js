import { useState, useEffect } from 'react';
import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';
// import uw from '../../resources/img/UW.png';
// import xMen from '../../resources/img/x-men.png';

const ComicsList = (props) => {
    const [comicList, setComicList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(53450);
    const [comicEnded, setComicEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicListLoaded)
    }

    const onComicListLoaded = (newComicList) => {
        let ended = false;
        if (newComicList.length < 8) {
            ended = true
        }

        setComicList(comicList => [...comicList, ...newComicList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicEnded(comicEnded => ended);
    }

    function renderComics(arr) {
        const items = arr.map((item,i) => {
            // let imgStyle = {'objectFit': 'cover'}
            // if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            //     imgStyle = {'objectFit': 'unset'}
            // }
            return (
                <li className="comics__item"
                    tabIndex={0}
                    // ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    // onClick={() => {
                    //     props.onCharSelected(item.id)
                    //     focusOnItem(i)
                    // }}
                    // onKeyPress={(e) => {
                    //     if (e.key === ' ' || e.key === 'Enter') {
                    //         props.onCharSelected(item.id)
                    //         focusOnItem(i)
                    //     }
                    // }}
                    >
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderComics(comicList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': comicEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;