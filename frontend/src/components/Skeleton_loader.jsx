import { Box, Skeleton, Typography } from '@mui/material';
import React, { useEffect } from 'react';


const Skeleton_loader = () => {

  return (
    <Box>
        <Typography variant="h1" sx={{ bgcolor: '#15142F'}}> <Skeleton width={'100%'} sx={{ bgcolor: '#35334F' }} /> </Typography>
        <Typography variant="h2" sx={{ bgcolor: '#15142F'}}> <Skeleton width={'100%'} sx={{ bgcolor: '#35334F' }} /> </Typography>
        <Typography variant="h2" sx={{ bgcolor: '#15142F'}}> <Skeleton width={'100%'} sx={{ bgcolor: '#35334F' }} /> </Typography>
        <Typography variant="h3" sx={{ bgcolor: '#15142F'}}> <Skeleton width={'100%'} sx={{ bgcolor: '#35334F' }} /> </Typography>

    </Box>

  );
};

export default Skeleton_loader;
