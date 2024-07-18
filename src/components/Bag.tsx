import { useState } from "react";
import { BreadcrumbFlexSka, StackSka, TypographySka } from "ska-studio-components";

export type BagType = {
  name: string;
  sprite: any;
};
interface Props {
  itemsBag?: BagType[];
}

export const Bag = ({ itemsBag }: Props) => {
  const [view, setView] = useState<any>();
  return (
    <StackSka>
      <StackSka width={500}>
        {!!itemsBag?.length && (
          <BreadcrumbFlexSka
            onClick={(value) => setView(value)}
            items={itemsBag?.map((item) => ({
              caption: item.name,
              id: item.name,
              sprite: item.sprite,
            }))}
          />
        )}
      </StackSka>
      {view && (
        <StackSka alignItems="center">
          <TypographySka>{view.name}</TypographySka>
          <img height={150} width={150} src={view.sprite} />
        </StackSka>
      )}
    </StackSka>
  );
};
