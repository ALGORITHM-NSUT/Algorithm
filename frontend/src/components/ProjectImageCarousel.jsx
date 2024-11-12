import React from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';

// Define default settings for the slider
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

const ProjectImageCarousel = ({ project }) => {
  return (
    <div style={{ backgroundColor: "#18142F" }}>
      {/* Display loading image if no images are available */}
      {project.images.length === 0 && (
        <Box
          component="img"
          src="/static/loading_algo.gif"
          loading="lazy"
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            aspectRatio: '4 / 3',
            borderRadius: '10px',
            overflow: 'hidden',
            background: '#18142F',
          }}
        />
      )}

      {/* Display images or a carousel if images are available */}
      {project.images.length > 0 && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            aspectRatio: '4 / 3',
            borderRadius: '10px',
            overflow: 'hidden',
            background: '#18142F',
          }}
        >
          {/* Show a single image if there's only one */}
          {project.images.length === 1 ? (
            <Box
              component="img"
              src={project.images[0]}
              loading="lazy"
              alt="Project image"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 1,
              }}
            />
          ) : (
            /* Carousel for multiple images */
            <Slider {...carouselSettings} style={{ marginLeft: "2.5%", maxWidth: '95%', overflow: 'hidden', borderRadius: '10px', zIndex: 1, background: '#18142F' }}>
              {project.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '100%',
                    aspectRatio: '4 / 3',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: '#18142F',
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    loading="lazy"
                    alt={`Project image ${index + 1}`}
                    sx={{
                      background: '#18142F',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      border: 'none',
                      margin: 0,
                      padding: 0,
                      display: 'block',
                    }}
                  />
                </Box>
              ))}
            </Slider>
          )}
        </Box>
      )}
    </div>
  );
};

export default ProjectImageCarousel;
