import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Icon } from '@mui/material';
import { styled } from '@mui/system';

const BinCard = styled(Card)(({ color }) => ({
    // margin: theme.spacing(2),
    // padding: theme.spacing(2), 
    margin: '16px',
    padding: '16px',
    width: 250,
    maxWidth: 300,
    height: 200,
    borderRadius: '12px',
    backgroundColor: color || '#333',
    color: 'hsl(0, 0%, 75%)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', 
    position: 'relative', 
  }));
  
  const BinIcon = styled(Box)(({ level }) => ({
    backgroundColor: level > 50 ? '#ffcccb' : '#c8e6c9', 
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    position: 'absolute', 
    top: '8px',
    right: '8px',
  }));

  const BinNumber = styled(Typography)({
    position: 'absolute',
    top: '8px',
    left: '16px',
    fontWeight: 'bold',
   
  });

  const PercentageText = styled(Typography)({
    fontSize: '4rem', 
    fontWeight: 'bold', 
    color: 'hsl(0, 0%, 90%)', 

    textAlign: 'center',
    flex: '1', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });
  

  const ContentWrapper = styled('div')({
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  });
  
  const TimestampText = styled(Typography)({
    textAlign: 'center',
    color: 'hsl(0, 0%, 60%)', 
    marginBottom: '8px', 
  });

const BinLevels = ({bin, color}) => {
    return(
      <BinCard  color={color}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <ContentWrapper>
          <Grid container alignItems="center">
            {/* <Grid item xs={2}>
              <BinIcon level={bin.level}>
                <Icon>{bin.level > 50 ? 'delete' : 'delete_outline'}</Icon>
              </BinIcon>
            </Grid> */}
            <Grid item xs={10}>
              <BinNumber variant="h6" >
                {bin.bin_no}
              </BinNumber>
              <PercentageText variant="body1">
                {bin.level}%
              </PercentageText>
            </Grid>
          </Grid>
        </ContentWrapper>
        <TimestampText variant="body2">
      {new Date(bin.timestamp * 1000).toLocaleString()}
        </TimestampText>
      </CardContent>
    </BinCard>
    );
}
export default BinLevels;