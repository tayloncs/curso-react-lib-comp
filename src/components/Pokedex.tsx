import { useEffect, useState } from "react";
import {
  ColumnsTable,
  IconSka,
  PaginationData,
  StackSka,
  TableParams,
  TableSka,
  TagSka,
  TypographySka,
  colorPalette,
} from "ska-studio-components";
import { fecthPokemon, fetchPokedex } from "../services/api";
import { Pokemon } from "./Pokemon";
import { Bag, BagType } from "./Bag";

type TypePokemon = {
  type: {
    name: string;
  };
};

export type Sprites = {
  back_default: string;
  front_default: string;
};

export type PokemonData = {
  name: string;
  height: number;
  weight: number;
  types: TypePokemon[];
  sprites: Sprites;
};

export const typeColor = {
  grass: "green",
  poison: "pink",
  fire: "red",
  water: "blue",
  flying: "cyan",
};

export const Pokedex = () => {
  const [pokedex, setPokedex] = useState<PokemonData[]>([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [bag, setBag] = useState<BagType[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  const [pagination, setPagination] = useState({
    pageSize: 10,
    total: 151,
    current: 1,
  });

  useEffect(() => {
    getPokedex(pagination);
    const schemaColumns = getColumns();
    setColumns(schemaColumns);
  }, []);

  async function getPokedex(params: PaginationData) {
    setLoadingTable(true);
    if (params.current && params.pageSize) {
      const offsetPage = (params.current - 1) * params.pageSize;
      const limitRows = params.pageSize;

      const paramsTable = { limit: limitRows, offset: offsetPage };

      const listPokemon = await fetchPokedex(paramsTable);

      setPagination({ total: 151, pageSize: params.pageSize, current: params.current });

      const list = await listPokemon.results.map((item: any, index: number) => ({
        ...item,
        key: index,
      }));

      const newList = await Promise.all(list.map((p: any) => fecthPokemon(p.name)));
      console.log("newList :", newList);

      setPokedex(newList.map((item) => ({ ...item, key: item.name })));
    }
    setTimeout(() => {
      setLoadingTable(false);
    }, 500);
  }

  function handleTable(params: TableParams) {
    getPokedex(params.pagination);
  }

  function addBag(name: string, sprite: any) {
    setBag((value) => {
      return (value = [...value, { name, sprite }]);
    });
  }

  function getColumns() {
    return [
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
        sorter: true, //Mostra que habilita o icon
        render(text, data, index) {
          return <TypographySka.Text>{text}</TypographySka.Text>;
        },
      },
      {
        key: "height",
        title: "Altura",
        dataIndex: "height",
        render(item, data, index) {
          const value = (Number(item) / 10).toFixed(1);

          return <TypographySka.Text>{value} m</TypographySka.Text>;
        },
      },
      {
        key: "weight",
        title: "Peso",
        dataIndex: "weight",
        render(item, data, index) {
          const value = (Number(item) / 10).toFixed(1);

          return <TypographySka.Text>{value} kg</TypographySka.Text>;
        },
      },

      {
        key: "types",
        title: "Tipo",
        dataIndex: "types",
        render(item: TypePokemon[], data, index) {
          return (
            <StackSka row>
              {item.map((obj: TypePokemon) => (
                <TagSka color={typeColor[obj.type.name as keyof typeof typeColor]}>
                  {obj.type.name}
                </TagSka>
              ))}
            </StackSka>
          );
        },
      },

      {
        key: "sprites",
        title: "Imagens",
        dataIndex: "sprites",
        width: 250, //ajustar colunas
        render(item: Sprites, data, index) {
          return <Pokemon key={index} itemSprites={item} data={data} onSelectd={addBag} />;
        },
      },
    ] as ColumnsTable[];
  }

  return (
    <StackSka justifyContent="center" alignItems="center" padding={20}>
      <StackSka
        row
        width={"100%"}
        justifyContent="space-around"
        alignContent="center"
        border={`3px outset ${colorPalette.darkGray300}`}
        backgroundColor={colorPalette.darkBlue500}
      >
        <IconSka iconName="TbPokeball" color={colorPalette.white} size="xxlarge" />
        <TypographySka.Title
          underline
          level={2}
          align="center"
          style={{ color: colorPalette.white }}
        >
          Tabela de pokemon
        </TypographySka.Title>
        <IconSka iconName="TbPokeball" color={colorPalette.white} size="xxlarge" />
      </StackSka>
      <StackSka padding={"5%"}>
        <TableSka
          name={"pokedex"}
          columns={columns}
          data={pokedex}
          handleTable={handleTable}
          pagination={pagination}
          loading={loadingTable}
        />
      </StackSka>
      <Bag itemsBag={bag} />
    </StackSka>
  );
};
