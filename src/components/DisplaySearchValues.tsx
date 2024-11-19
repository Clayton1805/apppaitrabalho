import { useState } from "react";
import { ContainerStyled } from "../styledComponents/utils/ContainerStyled.styled";
import { TextStyled } from "../styledComponents/utils/TextStyled.styled";
import { Button, TouchableOpacity, View } from "react-native";
import { TouchableOpacityStyled } from "../styledComponents/utils/TouchableOpacityStyled.styled";
import axios from "axios";
import { URL, PASSWORD } from "@env";
import { formattedDate } from "../utils/formattedDate";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootDrawerParamList, RootStackParamList } from "../routes";
import { useSheetNameStore } from "../store/useSheetNameStore";
import { useObjFormStore } from "../store/useObjFormStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styled from "styled-components/native";

// type Props = CompositeNavigationProp<>;

const Ola = styled.TouchableOpacity`
  position: "absolute";
`;

export function DisplaySearchValues({
  obj,
  navigation,
  family = false,
}: {
  obj: { [key: string]: any };
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList>,
    BottomTabNavigationProp<
      RootDrawerParamList,
      keyof RootDrawerParamList,
      undefined
    >
  >;
  family?: boolean;
}) {
  const setSheetName = useSheetNameStore(({ setSheetName }) => setSheetName);
  const setObjForm = useObjFormStore(({ setObjForm }) => setObjForm);

  const [allValues, setAllValues] = useState(false);
  const [visites, setVisites] = useState<{ [key: string]: any }[]>([]);
  const [visitesIsVisible, setVisitesIsVisible] = useState(false);
  let searchValuesKeys = Object.keys(obj);
  if (!allValues) {
    searchValuesKeys = searchValuesKeys.slice(0, 4);
  }

  const searchVisites = () => {
    if (visites.length === 0) {
      axios
        .get(
          `${URL}?password=${PASSWORD}&nameSheet=Visita&field=CRA&value=${obj.CRA}`
        )
        .then(({ data: { data } }) => {
          console.log("OOOOIIIIIIIII24 searchVisites data", data);
          setVisites(data);
        })
        .catch(() => {
          console.log("DEU RUIM2 search");
        });
    }
  };

  return (
    <ContainerStyled
      widthPercentage={95}
      backgroundColor="secondary"
      marginBottom={15}
      borderRadius={10}
      paddingTop={5}
    >
      <View
        style={{
          position: "absolute",
          width: "100%",
        }}
      >
        <View style={{ alignItems: "flex-end", marginRight: 8, marginTop: 8 }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              if (family) {
                navigation.navigate("Family", { objFirstSearch: obj });
              } else {
                setAllValues(!allValues);
              }
            }}
            style={{ zIndex: 100 }}
          >
            {family ? (
              <MaterialIcons name="family-restroom" size={24} color="black" />
            ) : (
              <AntDesign
                name={allValues ? "eye" : "eyeo"}
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {searchValuesKeys.map((key, index) => (
        <ContainerStyled
          key={key + obj.CRA + index}
          alignItemsCenter={false}
          widthPercentage={95}
        >
          <TextStyled marginTop={3} color="black" fontSize={"span"}>
            {key + ":"}
          </TextStyled>
          <TextStyled marginTop={3} color="black" selectable>
            {obj[key]}
          </TextStyled>
        </ContainerStyled>
      ))}
      <ContainerStyled widthPercentage={100} alignItemsCenter={false}>
        <TouchableOpacityStyled
          backgroundColor="gray"
          borderRadius={10}
          activeOpacity={0.6}
          onPress={() => {
            setObjForm({
              CRA: "" + obj.CRA,
              DATA: formattedDate(new Date()),
            });
            setSheetName("Visita");
            navigation.navigate("Inserir");
          }}
          marginBottom={4}
          directionRow
        >
          <TextStyled color="black">Adicionar Visita </TextStyled>
          <AntDesign name="arrowright" size={20} color="black" />
        </TouchableOpacityStyled>
      </ContainerStyled>
      <ContainerStyled widthPercentage={100} alignItemsCenter={false}>
        <TouchableOpacityStyled
          backgroundColor="gray"
          borderRadius={10}
          activeOpacity={0.6}
          onPress={() => {
            searchVisites();
            setVisitesIsVisible(!visitesIsVisible);
          }}
          directionRow
        >
          <TextStyled color="black">Visitas </TextStyled>
          <FontAwesome
            name={visitesIsVisible ? "angle-double-up" : "angle-double-down"}
            size={20}
            color="black"
          />
        </TouchableOpacityStyled>
      </ContainerStyled>
      {visitesIsVisible &&
        visites.map(({ CRA, DATA, OBSERVAÇÃO }, index) => {
          const data = new Date(DATA);
          return (
            <ContainerStyled
              key={CRA + index + "Visites"}
              alignItemsCenter={false}
              widthPercentage={95}
              marginBottom={10}
            >
              <TextStyled marginTop={3} color="black" fontSize={"span"}>
                {formattedDate(data)}
              </TextStyled>
              <TextStyled marginTop={3} color="black" selectable>
                {OBSERVAÇÃO}
              </TextStyled>
            </ContainerStyled>
          );
        })}
    </ContainerStyled>
  );
}
