export const cardTemplate = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return`<a class="gallery__link" href="${largeImageURL}">
 <div class="photo-card" style="" >
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image" width="345" />
   <div class="info" width="400">
     <p class="info-item">
       <b>Likes: <span class="info-item__value">${likes}</span></b>
      </p>
     <p class="info-item">
        <b>Views: <span class="info-item__value">${views}</span></b>
      </p>
      <p class="info-item">
        <b>Comments: <span class="info-item__value">${comments}</span></b>
      </p>
      <p class="info-item">
       <b>Downloads: <span class="info-item__value">${downloads}</span></b>
    </p>
   </div>
 </div>
 </a>`}




