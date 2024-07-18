import { useState } from "react";
import {
  ButtonSka,
  DrawerSka,
  ModalSka,
  PopoverButtonSka,
  SpaceSka,
  StackSka,
  useMessageSka,
} from "ska-studio-components";
import { PokemonData, Sprites } from "./Pokedex";

interface Props {
  data: PokemonData;
  itemSprites: Sprites;
  onSelectd: any;
}

export const Pokemon = ({ itemSprites, data, onSelectd }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [messageApi, contextHolder] = useMessageSka();

  const openMsg = () => {
    messageApi.open({
      type: "success",
      content: `Capturou ${data.name}`,
    });
  };

  function catchIt() {
    onSelectd(data.name, itemSprites.front_default);
    openMsg();
  }

  return (
    <SpaceSka>
      {contextHolder}
      {/* //Popover */}
      <PopoverButtonSka textButtonOpen="popover">
        <StackSka>
          <img height={150} src={itemSprites.front_default} />
          <ButtonSka onClick={catchIt}>Catch</ButtonSka>
        </StackSka>
      </PopoverButtonSka>

      {/* //Drawer */}
      <DrawerSka open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <StackSka>
          <img height={150} width={150} src={itemSprites.front_default} />
          <ButtonSka onClick={catchIt}>Catch</ButtonSka>
        </StackSka>
      </DrawerSka>
      <ButtonSka variant="secondary" onClick={() => setOpenDrawer(true)}>
        Drawer
      </ButtonSka>

      {/* //Modal */}
      <ModalSka
        open={openModal}
        onClose={() => setOpenModal(false)}
        closable
        okCaption="catch"
        onOk={catchIt}
      >
        <StackSka>
          <img height={150} src={itemSprites.front_default} />
        </StackSka>
      </ModalSka>
      <ButtonSka variant="tertiary" onClick={() => setOpenModal(true)}>
        Modal
      </ButtonSka>
    </SpaceSka>
  );
};
