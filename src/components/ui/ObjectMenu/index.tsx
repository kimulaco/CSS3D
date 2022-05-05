import {
  Box,
  BoxProps,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { AiOutlineEllipsis } from 'react-icons/ai'

type ObjectMenuProps = {
  chakra?: BoxProps
  onClickReset?: () => void
  onClickAddObject?: () => void
  onClickItem?: (key: string, value?: string) => void
}

export const ObjectMenu: React.FC<ObjectMenuProps> = ({
  chakra,
  onClickReset,
  onClickAddObject,
  onClickItem,
}) => {
  const handleClickItem = (key: string, value?: string) => {
    if (typeof onClickReset === 'function' && key === 'reset') {
      onClickReset()
    }
    if (typeof onClickAddObject === 'function' && key === 'addObject') {
      onClickAddObject()
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
          icon={<AiOutlineEllipsis />}
          bg={'white'}
        />
        <MenuList py={'0'} overflow={'hidden'}>
          <MenuItem
            fontSize={'sm'}
            onClick={() => handleClickItem('addObject')}
          >
            Add object
          </MenuItem>
          <MenuItem
            fontSize={'sm'}
            onClick={() => handleClickItem('reset')}
          >
            Reset
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}
