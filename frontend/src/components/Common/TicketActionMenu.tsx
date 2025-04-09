import { IconButton } from "@chakra-ui/react" ;
import { BsThreeDotsVertical } from "react-icons/bs";
import { MenuContent, MenuRoot, MenuTrigger } from "../ui/menu";
import * as React from "react";

//import type { UserPublic } from "@/client"
import DeleteUser from "../Admin/DeleteUser"
import EditUser from "../Admin/EditUser"
/*
interface UserActionsMenuProps {
  user: UserPublic
  disabled?: boolean
}
*/

export const TicketActionsMenu = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="ghost" color="inherit">
          <BsThreeDotsVertical />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        
      </MenuContent>
    </MenuRoot>
  )
}