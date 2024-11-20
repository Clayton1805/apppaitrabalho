import { View } from "react-native";
import { Input } from "../styledComponents/utils/Input.styled";
import { ScrollContainerScreen } from "../styledComponents/utils/ScrollContainerScreen.styled";
import { TextStyled } from "../styledComponents/utils/TextStyled.styled";
import { ContainerStyled } from "../styledComponents/utils/ContainerStyled.styled";
import { ButtonStyled } from "../styledComponents/components/ButtonStyled.styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL, PASSWORD } from "../utils/objEnv";
import { useSheetNameStore } from "../store/useSheetNameStore";
import { useObjFormStore } from "../store/useObjFormStore";
import { useHeadersStore } from "../store/useHeadersStore";
import { formattedDate } from "../utils/formattedDate";

export function Insert() {
  const { headers, setHeaders } = useHeadersStore();
  const { sheetName, setSheetName } = useSheetNameStore();
  const { objForm, setObjForm } = useObjFormStore();
  const [retorno, setRetorno] = useState("");

  useEffect(() => getHeaders(), [sheetName]);
  useEffect(() => console.log("objForm", objForm), [objForm]);

  const getHeaders = () => {
    if (headers[sheetName].length === 0) {
      axios
        .get(
          `${URL}?password=${PASSWORD}&returnHeaders=1&nameSheet=${sheetName}`
        )
        .then(({ data }) => {
          console.log("OOOOIIIIIIIII24", headers);
          setHeaders({ ...headers, [sheetName]: data.headers });
        })
        .catch(() => {
          console.log("DEU RUIM2");
        });
    }
  };

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
    setObjForm({});
  };

  return (
    <ScrollContainerScreen>
      <ContainerStyled marginTop={10} directionRow justifyContentCenter>
        <ButtonStyled
          title={"VISITA"}
          widthPercentage={45}
          onPress={() => {
            // setHeaders([]);
            setRetorno("");
            setSheetName("Visita");
          }}
          borderRadius={10}
          fontSize={"large"}
          backgroundColor={sheetName === "Visita" ? "secondary" : "transparent"}
          color={sheetName === "Visita" ? "black" : "secondary"}
        />
        <ButtonStyled
          title={"CADASTRAR"}
          widthPercentage={45}
          onPress={() => {
            // setHeaders([]);
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
        {headers[sheetName].map((header) => (
          <View key={header}>
            <TextStyled marginTop={3}>{header + ":"}</TextStyled>
            <Input
              widthPercentage={100}
              onChangeText={(text) =>
                setObjForm({ ...objForm, [header]: text })
              }
              value={
                header === "DATA"
                  ? objForm[header] ?? formattedDate(new Date())
                  : objForm[header]
              }
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
