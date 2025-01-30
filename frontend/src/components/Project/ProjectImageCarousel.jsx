import React from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';

const ProjectImageCarousel = ({ project }) => {
  const hasSingleImage = project.images.length === 1;

  const carouselSettings = {
    dots: true,
    infinite: !hasSingleImage, // Prevent infinite scroll if only one image
    speed: 350,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    lazyLoad: 'ondemand',
    autoplay: project.images.length > 1, // Disable autoplay if only one image
    autoplaySpeed: 3000
  };

  return (
    <div style={{ backgroundColor: "#18142F" }}>
      {/* Show loading image if no images are available */}
      {project.images.length === 0 && (
        <Box
          component="img"
          src="/static/loading_algo.gif"
          loading="lazy"
          sx={{
            width: '100%',
            maxWidth: '100%',
            aspectRatio: '4 / 3',
            borderRadius: '10px',
            background: '#18142F',
          }}
        />
      )}

      {/* Show images or a carousel */}
      {project.images.length > 0 && (
        <Box
          sx={{
            width: '100%',
            maxWidth: '100%',
            aspectRatio: '4 / 3',
            borderRadius: '10px',
            background: '#18142F',
            overflow: 'hidden',
          }}
        >
          <Slider {...carouselSettings} style={{ marginLeft: "2.5%", maxWidth: '95%', overflow: 'hidden', borderRadius: '10px' }}>
            {project.images.map((image, index) => (
              <Box
                key={index}
                sx={{
                  width: '100%',
                  maxWidth: '100%',
                  aspectRatio: '4 / 3',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center', // Ensures proper positioning
                  justifyContent: 'center',
                  background: '#18142F',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={image}
                  loading="lazy"
                  alt={`Project image ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    border: 'none',
                    display: 'block',
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      )}
    </div>
  );
};

export default React.memo(ProjectImageCarousel);
