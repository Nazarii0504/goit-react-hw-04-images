import PropTypes from 'prop-types';

import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';

export const ImageGallery = ({ items, setActiveImageURL, loadMore }) => {
  return (
    <>
      <ImageGalleryList>
        {items.map(item => {
          return (
            <ImageGalleryItem
              item={item}
              key={item.id}
              onClick={() => {
                setActiveImageURL(item.largeImageURL);
              }}
            />
          );
        })}
      </ImageGalleryList>
      <Button onClick={loadMore}>Load More</Button>
    </>
  );
};
ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      item: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
  setActiveImageURL: PropTypes.func,
  loadMore: PropTypes.func,
};
