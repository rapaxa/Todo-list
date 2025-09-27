export const getTaskSxStyle = (currentTheme: 'light' | 'dark') => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',
    p: 2,
    mb: 1.5,
    borderRadius: 2,
    boxShadow: 2,
    backgroundColor: currentTheme === 'dark' ? 'rgba(168,178,205,0.35)' : 'rgba(168,178,205,0.19)',
    transition: '0.3s ease',
    '&:hover': {
      boxShadow: 4,
      transform: 'scale(1.01)',
    },
  },
});
