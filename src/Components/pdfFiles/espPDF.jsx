import React from 'react';
import { Document, Page, Text, View, Link } from '@react-pdf/renderer';

// Estilos para el documento
const styles = {
  page: {
    fontFamily: 'Helvetica',
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
};

// Componente PDF
export default function espPDF({ name, checkInDate, checkOutDate }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>¡Enhorabuena, {name}!</Text>
          <Text style={styles.subtitle}>¡Regalo especial!</Text>
          <Text style={styles.text}>Estancia en Cal Masses</Text>
          <Text style={styles.text}>Carrer de la Riera, 7</Text>
          <Text style={styles.text}>08519 Folgueroles</Text>
          <Text style={styles.text}>Tel: 938 12 34 56</Text>
          <Text style={styles.text}>
            <Link src="http://www.calmasses.com">www.calmasses.com</Link>
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Reserva</Text>
          <Text style={styles.text}>Nombre: {name}</Text>
          <Text style={styles.text}>Fecha de entrada: {checkInDate}</Text>
          <Text style={styles.text}>Fecha de salida: {checkOutDate}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>¡Disfruta de tu estancia!</Text>
          <Text style={styles.text}>Esperamos que tengas una experiencia inolvidable en Cal Masses.</Text>
        </View>
      </Page>
    </Document>
  );
}
