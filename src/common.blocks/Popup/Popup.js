const popupStyles = {
  basicStyles: {
    width: '60%',
    minHeight: '220px',
    height: '220px',
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-100px',
    marginLeft: '-30%',
    backgroundColor: '#fff',
    borderRadius: '20px',
    zIndex: 100,
    padding: '10px',
    boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)',
  },
};

popupStyles.bigHeightStyles = Object.assign({}, popupStyles.basicStyles, {
  minHeight: '345px',
  height: '345px',
  marginTop: '-185px',
  marginLeft: '-33%',
});

export default popupStyles;
