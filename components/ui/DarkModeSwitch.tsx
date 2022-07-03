import { useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = {
    light: 'teal.600',
    dark: 'teal.600',
  };

  const iconBgColor = {
    light: 'gray.500',
    dark: 'gray.900',
  };

  const iconHoverBgColor = {
    light: 'gray.400',
    dark: 'gray.600',
  };

  return (
    <IconButton
      aria-label="Toggle Dark Mode"
      icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      color={iconColor[colorMode]}
      backgroundColor={iconBgColor[colorMode]}
      borderColor={iconColor[colorMode]}
      width="36px"
      height="36px"
      borderWidth="1px"
      _hover={{ 
        backgroundColor: iconHoverBgColor[colorMode],
        color: iconColor[colorMode],
        transform: 'scale(1.02)',
      }}
    />
  );
};

export default DarkModeSwitch;
