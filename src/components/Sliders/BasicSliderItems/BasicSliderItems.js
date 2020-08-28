import React, { useState, useEffect } from 'react';
import { map } from "lodash";
import noImage from "../../../assets/png/avatarNoImage.png"
import Slider from "react-slick";
import { Link } from "react-router-dom";
import firebase from "../../../utils/Firebase";
import "firebase/storage";

import "./BasicSliderItems.scss";

export default function BasicSliderItems(props) {

    const {data, folderImage,urlName } = props
    const settings = {
        dots:false,
        infinite: true,
        slidesToShow:3,
        slidesToScroll:1,
        centerMode:true,
        speed: 400,
        rows:3,
        className:"basic-slider-items__list"

    };
    return (
        <div className="basic-slider-items" >
            <div>
                <Slider {...settings}>
                {map(data, item => (
                    <RenderItem key={item.id} item={item} banner={item.banner} folderImage={folderImage} urlName={urlName} />
                ))}
                </Slider>
            </div>
        </div>
    );
}

function RenderItem(props){
    const { item, folderImage, urlName } = props;

    const [imageUrl, setImageUrl] = useState(null);


    useEffect(() => {
        firebase.storage().ref(`procesos/${folderImage}/${item.name}/${item.banner}`).getDownloadURL().then( url => {
            setImageUrl(url);
        })
    }, [item,folderImage,]);

    return (
        <Link to={`/${urlName}/${item.id}`}>
        <div className="basic-slider-items__list-item" >
            {item.banner === "NoImage" ? (<div className="avatar" style={{backgroundImage: `url('${noImage}')`}} />): (<div className="avatar" style={{backgroundImage: `url('${imageUrl}')`}} />)}
            
            <h3>{item.name}</h3>
        </div>
        </Link>
    );
}
