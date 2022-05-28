import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// import Thumbnail from './thumbnails';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function StyleSelector({productInfo, currentStyle, setCurrentStyle}) {
  const { productId } = useGlobalContext();

  // console.log("prod info?", productInfo)

  // Click a style
  const onStyleClick = (index) => {
    console.log('onclick index', index);
    setCurrentStyle(index);
  };

  return (
    <>
      {productInfo.length && <Wrapper>
        <ProductStyle>Style: {productInfo[currentStyle] ? productInfo[currentStyle].name : 'howdy, this is a style?'}</ProductStyle>
        <AllThumbnails>
          {productInfo.map((item, index) => (
            <Thumbnails key={index} src={item.photos[0].thumbnail_url ? item.photos[0].thumbnail_url : 'https://img.icons8.com/stickers/344/gambit.png'} onClick={() => onStyleClick(index)} />
          ))}
        </AllThumbnails>
      </Wrapper>}
    </>
  );
}

const Wrapper = styled.div`
  padding: 4em;
  align-items: flex-end;
`;

const AllThumbnails = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  max-width: 350px;
`;

const ProductStyle = styled.h2`
  color: pink;
  text-transform: uppercase;
`;
// const AllThumbnails = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
//   align-content: space-around;
// `
// grid-template-columns: 25% 25% 25% 25%;

const Thumbnails = styled.img`
  border-radius: 50%;
  width: 18%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border: 2px solid purple;
  box-sizing: border-box;
  margin: 10px;
  `;
