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
import { URL, PASSWORD } from "../utils/objEnv";
import { DisplaySearchValues } from "../components/DisplaySearchValues";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootDrawerParamList, RootStackParamList } from "../routes";
import { useHeadersStore } from "../store/useHeadersStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";

type Props = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, "Family">,
  BottomTabScreenProps<RootDrawerParamList>
>;

export function Family({ navigation, route }: Props) {
  const { objFirstSearch } = route.params;
  const [searchFamilyValues, setSearchFamilyValues] = useState<
    { [key: string]: any }[]
  >([]);

  const searchFamily = () => {
    const url = `${URL}?password=${PASSWORD}&nameSheet=Pessoa&field=CRA%20da%20M%C3%A3e%20ou%20Respons%C3%A1vel&value=${objFirstSearch["CRA da Mãe ou Responsável"]}&strongSearch=1`;
    console.log("oi", url);
    axios
      .get(url)
      .then(({ data: { data } }) => {
        console.log("OOOOIIIIIIIII24 search data AAAA", data);
        setSearchFamilyValues(data);
      })
      .catch(() => {
        console.log("DEU RUIM2 search");
      });
  };

  useEffect(() => searchFamily(), []);

  return (
    <ScrollContainerScreen>
      <DisplaySearchValues obj={objFirstSearch} navigation={navigation} />
      {searchFamilyValues.map(
        (obj, index) =>
          obj.CRA !== objFirstSearch.CRA && (
            <DisplaySearchValues
              obj={obj}
              key={"DisplaySearchFamilyValues" + obj.CRA + index}
              navigation={navigation}
            />
          )
      )}
    </ScrollContainerScreen>
  );
}
