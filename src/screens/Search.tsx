// import { StackScreenProps } from "@react-navigation/stack";
import { Text, Button, TextInput, TouchableOpacity, View } from "react-native";
// import { RootStackLoginParamList } from "../routes/stackLogin.routes";
import { Input } from "../styledComponents/utils/Input.styled";
import { ScrollContainerScreen } from "../styledComponents/utils/ScrollContainerScreen.styled";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { ContainerScreen } from "../styledComponents/utils/ContainerScreen.styled";
// import { storage } from "../storageDevice/MMKV";
import { LogoAppLogin } from "../styledComponents/components/LogoAppLogin.styled";
import { TextStyled } from "../styledComponents/utils/TextStyled.styled";
import { ContainerStyled } from "../styledComponents/utils/ContainerStyled.styled";
import { InputLogin } from "../styledComponents/screens/Login/InputLogin.styled";
import { ButtonStyled } from "../styledComponents/components/ButtonStyled.styled";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { ContainerLoginStyled } from "../styledComponents/screens/Login/ContainerLoginStyled.styled";
import { TouchableOpacityLoginStyled } from "../styledComponents/screens/Login/TouchableOpacityLoginStyled.styled";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import styled from "styled-components/native";
import { URL, PASSWORD } from "@env";
import { DisplaySearchValues } from "../components/DisplaySearchValues";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootDrawerParamList, RootStackParamList } from "../routes";
import { useHeadersStore } from "../store/useHeadersStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";

const DropdownStyled = styled(Dropdown)<any>`
  height: 40px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 10px;
  border-radius: 5px;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.colors.error : theme.colors.secondary};
`;

type Props = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList>,
  BottomTabScreenProps<RootDrawerParamList>
>;

export function Search({ navigation }: Props) {
  const { headers, setHeaders } = useHeadersStore();

  const [searchValues, setSearchValues] = useState<{ [key: string]: any }[]>(
    []
  );
  const [dropdown, setDropdown] = useState(null);
  const [valor, setValor] = useState("");

  const getHeaders = () => {
    console.log("headers", headers);
    if (headers.Pessoa.length === 0) {
      axios
        .get(`${URL}?password=${PASSWORD}&returnHeaders=1&nameSheet=Pessoa`)
        .then(({ data }) => {
          console.log("OOOOIIIIIIIII24", headers);
          setHeaders({
            ...headers,
            Pessoa: data.headers,
          });
        })
        .catch(() => {
          console.log("DEU RUIM2");
        });
    }
  };
  const search = () => {
    axios
      .get(
        `${URL}?password=${PASSWORD}&nameSheet=Pessoa&field=${dropdown}&value=${valor}&strongSearch=${
          dropdown === "CRA" ? 1 : 0
        }`
      )
      .then(({ data: { data } }) => {
        console.log("OOOOIIIIIIIII24 search data", data);
        setSearchValues(data);
      })
      .catch(() => {
        console.log("DEU RUIM2 search");
      });
  };

  useEffect(() => getHeaders(), []);
  useEffect(() => console.log("dropdown", dropdown), [dropdown]);

  return (
    <ScrollContainerScreen>
      <ContainerStyled
        // marginTop={20}
        widthPercentage={95}
        alignItemsCenter={false}
      >
        <TextStyled marginTop={3}>Campo:</TextStyled>
        <DropdownStyled
          placeholder={"placeholder"}
          placeholderStyle={{ color: "#9e9e9e", fontSize: 14 }}
          labelField={"header"}
          valueField={"header"}
          data={headers.Pessoa.map((header: string) => ({ header }))}
          onChange={(obj: any) => {
            console.log("OBJ", obj);
            setDropdown(obj.header);
          }}
          value={dropdown}
          autoScroll={false}
        />
        <TextStyled marginTop={3}>Valor:</TextStyled>
        <Input
          widthPercentage={100}
          onChangeText={(text) => setValor(text)}
          value={valor}
        />
        {/* <TextStyled fontSize={"large"}>{sheetName}</TextStyled> */}
      </ContainerStyled>
      <ButtonStyled
        title={"Pesquisar"}
        onPress={() => search()}
        widthPercentage={35}
        marginTop={10}
        marginBottom={20}
      />
      {searchValues.map((obj, index) => (
        <DisplaySearchValues
          obj={obj}
          key={"DisplaySearchValues" + obj.CRA + index}
          navigation={navigation}
          family={true}
        />
      ))}
    </ScrollContainerScreen>
  );
}
