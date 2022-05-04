import {
  Box,
  BoxProps,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

type ObjectMenuProps = {
  chakra?: BoxProps
  onClickReset?: () => void
  onClickItem?: (key: string, value?: string) => void
}

export const ObjectMenu: React.FC<ObjectMenuProps> = ({
  chakra,
  onClickReset,
  onClickItem,
}) => {
  const handleClickItem = (key: string, value?: string) => {
    if (typeof onClickReset === 'function' && key === 'reset') {
      onClickReset()
    }
    if (typeof onClickItem === 'function') {
      onClickItem(key, value)
    }
  }

  return (
    <Box {...chakra}>
      <Menu
        isLazy={true}
      >
        <MenuButton
          as={IconButton}
          aria-label='Menu'
          icon={<HamburgerIcon />}
          bg={'white'}
        />
        <MenuList>
          <MenuItem onClick={() => handleClickItem('reset')}>
            Reset
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}
