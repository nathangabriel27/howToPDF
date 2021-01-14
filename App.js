import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as FileSystem from 'expo-file-system';


import htmlFerias from './src/demonstrativos/Ferias'
import htmlDemonstrativoMensal from './src/demonstrativos/DemonstrativoMensal'
import htmlInforRendimentos from './src/demonstrativos/InforRendimentos'

import { data } from './src/demonstrativos/jsonMensal'



export default function App() {
  const teste = 'nathan teste 3'

  /*   const createPDF = async (html) => {
      try {
        {
          let filePath = await Print.printToFileAsync({
            html: htmlContent,
            width: 612,
            height: 792,
            base64: false
          });
  
          alert('PDF Generated', filePath.uri);
          console.log(filePath);
        }
      } catch (err) {
        console.error(err);
      }
    }; */

  const createAndSavePDF = async (html) => {
    try {
      console.log('createAndSavePDF');
      const { uri } = await Print.printToFileAsync({
        html: html,
      });
      const dialogTitle = 'nathan'

      console.log("URI", uri);
      await FileSystem.documentDirectory + uri;
      await Sharing.shareAsync(uri);

    } catch (error) {
      console.error(error);
    }
  };


  function createLines(params) {
    data.Resumo.Descontos.Desc.map(function (item) {

      var criação = `
      <tr>
      <td style="border: solid thin #444;border-bottom:none;border-top:none;">${item.Label.split(' |')[0]}</td>
      <td align="right"
        style="border: solid thin #444;border-bottom:none;border-top:none;border-left:none;padding: 5px;">${item.Label.split('|')[1].replace('Ref.:', '').trim()}
      </td>
      <td align="right" colspan="2"
        style="border: solid thin #444;border-bottom:none;border-top:none;border-left:none;padding: 5px;">&nbsp;
      </td>
      <td align="right" colspan="2" style="border: solid thin #444;border-bottom:none;border-top:none;">${item.Valor}
      </td>
      </tr>
      `
      console.log(criação);
    });
    //console.log("TEStes",doubles);
  }



  return (
    <View style={styles.container}>

      <Text>Criando PDF apartir de HTML </Text>

      <TouchableOpacity style={styles.button} onPress={() => createAndSavePDF(htmlInforRendimentos)}>
        <Text>informe de rendimentos </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => createAndSavePDF(htmlFerias)}>
        <Text>ferias </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => createAndSavePDF(htmlDemonstrativoMensal)}>
        <Text>Demonstrtivo mensal </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => createLines()}>
        <Text>TEstes criação de linhas </Text>
      </TouchableOpacity>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

