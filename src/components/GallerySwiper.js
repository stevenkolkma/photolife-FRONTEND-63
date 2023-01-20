import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectAllGalleries } from "../store/gallery/selectors";
import "./PhotoSwiper.css";
import Swiper from "swiper";
export const PhotoSwiper = () => {
  const allGalleries = useSelector(selectAllGalleries);
  const [randomPhotos, setRandomPhotos] = useState([]);

  useEffect(() => {
    if (allGalleries.length > 0) {
      const photos = allGalleries.map((gallery) => {
        const randomIndex = Math.floor(Math.random() * gallery.photos.length);
        return gallery.photos[randomIndex];
      });
      setRandomPhotos(photos);
    }
  }, [allGalleries]);

  useEffect(() => {
    if (randomPhotos.length > 0) {
      const mySwiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: false,
        pagination: false,
        loop: true,
      });
    }
  }, [randomPhotos]);

  return (
    <div className="swiper-container" style={{ height: "400px" }}>
      <div className="swiper-wrapper">
        {randomPhotos.map((photo) => (
          <div className="swiper-slide" key={photo.id}>
            <img
              src={photo.imageUrl}
              alt={photo.name}
              style={{ height: "100%", width: "50%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
