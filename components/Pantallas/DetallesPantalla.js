/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export const DetallesPantalla = ({route}) => {
  const {movie} = route.params;
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const api_url = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=edcf6f8a`;
    fetch(api_url)
      .then(data => {
        return data.json();
      })
      .then(resultado => {
        setDatos(resultado);
        console.log(datos);
      });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        {datos.Poster === 'N/A' ? (
          <View style={styles.borde}>
            <Image
              style={styles.images}
              source={require('../image/nofound.jpg')}
            />
          </View>
        ) : (
          <View>
            <Image style={styles.images} source={{uri: datos.Poster}} />
          </View>
        )}
        <View style={styles.container2}>
          <Text style={styles.txt}>Fecha de exhibicion:{datos.Released}</Text>
          <Text style={styles.txt}>Actores:{datos.Actors}</Text>
          <Text style={styles.txt}>Sipnosis{datos.Plot}</Text>
          <Text style={styles.txt}>Genero de pelicula:{datos.Genre}</Text>
          <Text style={styles.txt}>Productora:{datos.Production}</Text>
          <Text style={styles.txt}>Premios:{datos.Awards}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  images: {
    width: 350,
    height: 550,
    margin: 5,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 2,
  },
  txt: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 30,
  },
});
