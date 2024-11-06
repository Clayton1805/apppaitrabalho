// import { StackScreenProps } from "@react-navigation/stack";
import { Text, Button, TextInput, TouchableOpacity, View } from "react-native";
// import { RootStackLoginParamList } from "../routes/stackLogin.routes";
import { Input } from "../styledComponents/utils/Input.styled";
import { ScrollContainerScreen } from "../styledComponents/utils/ScrollContainerScreen.styled";
// import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
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
import { URL, PASSWORD } from "@env";

export function Insert() {
  const [headers, setHeaders] = useState([]);
  const [sheetName, setSheetName] = useState("Visita");

  const getHeaders = () => {
    axios
      .get(`${URL}?password=${PASSWORD}&returnHeaders=1&nameSheet=${sheetName}`)
      .then(({ data: { headers } }) => {
        console.log("OOOOIIIIIIIII24", headers);
        setHeaders(headers);
      })
      .catch(() => {
        console.log("DEU RUIM2");
      });
  };

  useEffect(() => getHeaders(), [sheetName]);
  // useEffect(() => getHeaders(), []);

  const [objForm, setObjForm] = useState<{ [key: string]: string }>({});

  const [retorno, setRetorno] = useState("");

  const postFormHandleSubmit = () => {
    const url = Object.keys(objForm).reduce(
      (total, chave) => total + "&" + chave + "=" + objForm[chave],
      `${URL}?password=${PASSWORD}&nameSheet=${sheetName}`
    );
    console.log("url: " + url);
    axios
      .post(url)
      .then(({ data: { OK } }) => {
        console.log("OOOOIIIIIIIII");
        setRetorno(OK);
      })
      .catch(() => console.log("DEU RUIM"));
  };

  return (
    <ScrollContainerScreen>
      <ContainerStyled marginTop={10} directionRow justifyContentCenter>
        <ButtonStyled
          title={"Visita"}
          widthPercentage={35}
          onPress={() => {
            setHeaders([]);
            setRetorno("");
            setSheetName("Visita");
          }}
          borderRadius={10}
          fontSize={"large"}
          backgroundColor={sheetName === "Visita" ? "secondary" : "transparent"}
          color={sheetName === "Visita" ? "black" : "secondary"}
        />
        <ButtonStyled
          title={"Pessoa"}
          widthPercentage={35}
          onPress={() => {
            setHeaders([]);
            setRetorno("");
            setSheetName("Pessoa");
          }}
          borderRadius={10}
          fontSize={"large"}
          backgroundColor={sheetName === "Pessoa" ? "secondary" : "transparent"}
          color={sheetName === "Pessoa" ? "black" : "secondary"}
        />
      </ContainerStyled>
      <ContainerStyled
        marginTop={20}
        widthPercentage={95}
        alignItemsCenter={false}
      >
        {/* <TextStyled fontSize={"large"}>{sheetName}</TextStyled> */}
        {headers.map((header) => (
          <View key={header}>
            <TextStyled marginTop={3}>{header + ":"}</TextStyled>
            <Input
              widthPercentage={100}
              onChangeText={(text) =>
                setObjForm({ ...objForm, [header]: text })
              }
              value={objForm[header]}
            />
          </View>
        ))}
      </ContainerStyled>
      <TextStyled marginTop={3}>{retorno}</TextStyled>
      <ButtonStyled
        title={"SALVAR"}
        onPress={() => postFormHandleSubmit()}
        widthPercentage={35}
        marginTop={10}
        marginBottom={50}
      />
    </ScrollContainerScreen>
  );
}
