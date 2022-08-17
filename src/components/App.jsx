import 'react-toastify/dist/ReactToastify.css';
import { getImages } from '../Services/api';
import { Bars } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Container } from './Container/Container';
import { Modal } from './Modal/Modal';
import { LoaderContainer } from './Loader/Loader.styled';
import { theme } from '../StyleConfig/theme';
export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeimageURL, setActiveimageURL] = useState(null);
  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const fetchGalleryItems = () => {
      setIsLoading(true);
      getImages(searchQuery, page)
        .then(res => {
          const items = res.map(({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          }));
          setItems(prevState => [...prevState, ...items]);
          setIsLoading(false);
          if (res.length === 0) {
            return toast.error(
              'Oh, the search results were not successful :( Try again.'
            );
          }
        })
        .catch(error => {
          toast.error('Sorry, there is ' + error.message);
          setIsLoading(false);
        });
    };

    fetchGalleryItems();
  }, [page, searchQuery]);

  const closeModal = () => {
    setActiveimageURL(null);
  };
  const handleSubmit = ({ searchQuery }) => {
    if (searchQuery.trim() !== '') {
      setSearchQuery(searchQuery);
      setPage(1);
      setIsLoading(false);
      setItems([]);
      return;
    }
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} loadMore={loadMore} />

      <ToastContainer autoClose={3000} />
      {isLoading && (
        <LoaderContainer>
          <Bars color={theme.colors.searchBarBgc} />
        </LoaderContainer>
      )}
      {items.length !== 0 && (
        <ImageGallery
          items={items}
          setActiveImageURL={setActiveimageURL}
          loadMore={loadMore}
        />
      )}

      {activeimageURL && (
        <Modal activeimageURL={activeimageURL} onClose={closeModal} />
      )}
    </Container>
  );
};
