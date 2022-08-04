import {
  Box,
  Center,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { FC } from 'react';
import { LoginModalButton } from '../tools/LoginModalButton';
import DarkModeSwitch from './DarkModeSwitch';

interface NavBarProps {
  enabled: string[];
}

export const NavBar: FC<NavBarProps> = ({ enabled }) => {
  const { isOpen, onToggle } = useDisclosure();
  const navbarBackgroundColor = useColorModeValue('gray.200', 'gray.800');
  const navbarBorderColor = useColorModeValue('teal.600', 'teal.600');
  const logoColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.700');
  const hamburgerColor = useColorModeValue('teal.700', 'teal.600');

  return (
    <Box position="sticky" top="0px" zIndex={2}>
      <Flex
        bg={navbarBackgroundColor}
        minH={'60px'}
        borderBottomWidth="1px"
        borderBottomColor={navbarBorderColor}
        py={{ base: 2 }}
        px={[2, 4]}
        direction="row"
        width="100%"
        alignContent={'center'}
        alignItems={'center'}
      >
        <Box
          display={['flex', 'flex', 'none', 'none']}
          width={['30px', '30px', '80px']}
        >
          <IconButton
            onClick={onToggle}
            color={hamburgerColor}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Box>
        <Box display={['flex', 'flex', 'none', 'none']}>
          <DarkModeSwitch />
        </Box>
        <Spacer display={['flex', 'flex', 'none', 'none']} />
        <Flex>
          <NextLink href="/">
            <Center
              width="100px"
              borderWidth={'1px'}
              borderColor={logoColor}
              borderRadius="5px"
              fontFamily={'heading'}
              alignItems="center"
              color={logoColor}
              _hover={{ cursor: 'pointer' }}
            >
              Logo
            </Center>
          </NextLink>
          <Flex display={['none', 'none', 'flex', 'flex']} ml={4}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Spacer />
        <Stack
          direction={'row'}
          spacing={6}
          display={['none', 'none', 'flex', 'flex']}
        >
          {enabled.includes('auth') && <LoginModalButton />}
          <DarkModeSwitch />
        </Stack>
        <Stack direction={'row'} display={['flex', 'flex', 'none', 'none']}>
          {enabled.includes('auth') && <LoginModalButton />}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const bgPopover = useColorModeValue('gray.400', 'gray.700'); 
  const bgStack = useColorModeValue('gray.400', 'gray.700');
  return (
    <Stack direction={'row'} spacing={[0, 1, 2, 4]}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} {...navItem}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Button
                variant="navbar"
                minHeight="36px"
                width={['80px', '80px', '100px', '120px']}
              >
                <NextLink href={navItem.href}>{navItem.label}</NextLink>
              </Button>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                bg={bgPopover}
                p={3}
                rounded={'xl'}
                width="fit-content"
              >
                <Stack
                  bg={bgStack}
                  rounded={'xl'}
                >
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({
  label,
  href,
  subLabel,
}: {
  label: any;
  href: any;
  subLabel: any;
}) => {
  return (
    <NextLink href={href}>
      <Box
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{
          bg: useColorModeValue('gray.500', 'gray.900'),
          cursor: 'pointer',
        }}
        role={'group'}
      >
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'teal.200' }}
              fontWeight={500}
              textAlign="left"
            >
              {label}
            </Text>
            <Text fontSize={'sm'} textAlign="left">
              {subLabel}
            </Text>
          </Box>
        </Stack>
      </Box>
    </NextLink>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('gray.200', 'gray.800')}
      color={useColorModeValue('teal.600', 'teal.600')}
      p={4}
      display={['auto', 'auto', 'none', 'none', 'none']}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children }: { label: any; children?: any }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        px={2}
        justify={'space-between'}
        align={'left'}
        border="1px"
        bg={useColorModeValue('gray.500', 'gray.900')}
        _hover={{
          bg: useColorModeValue('gray.400', 'gray.700'),
          color: useColorModeValue('teal.200', 'teal.200'),
          fontWeight: '800',
          cursor: 'pointer',
        }}
      >
        <NextLink href={label.href ?? '/'}>
          <Text>{label}</Text>
        </NextLink>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
          _hover={{ cursor: 'pointer' }}
        >
          {children &&
            children.map((child: any) => (
              <NextLink key={child.label} href={child.href}>
                <Box py={2}>{child.label}</Box>
              </NextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'Two Sub Nav',
    href: '/',
    children: [
      {
        label: 'About Us...',
        subLabel: '...the team and our mission',
        href: '/',
      },
      {
        label: 'Our Program...',
        subLabel: '...overview of the program',
        href: '/',
      },
    ],
  },
  {
    label: 'One Sub Nav',
    href: '/',
    children: [
      {
        label: 'Developers...',
        subLabel: '...build on Elrond',
        href: '/',
      },
    ],
  },
  {
    label: 'No Sub Nav',
    href: '/',
  },
];
