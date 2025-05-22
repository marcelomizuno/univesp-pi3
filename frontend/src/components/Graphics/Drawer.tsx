import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react"

type DrawerProps = {
      texto: string,
}


export const CustomDrawer = ({texto}:DrawerProps) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          Ajuda
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>            
            <Drawer.Header>
              <Drawer.Title>Ajuda</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body p={6}>                 
              <p>
                {texto}
              </p>
              
              
            </Drawer.Body>           
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}