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
export default function catPDF({ name, checkInDate, checkOutDate }) {
    return (
        <Document>
          <Page size="A4" style={estils.pagina}>
            <View style={styles.section}>
              <Text style={styles.title}>Felicitats, {name}!</Text>
              <Text style={styles.subtitle}>Regal especial!</Text>
              <Text style={styles.text}>Estada a Cal Masses</Text>
              <Text style={styles.text}>Carrer de la Riera, 7</Text>
              <Text style={styles.text}>08519 Folgueroles</Text>
              <Text style={styles.text}>Tel: 938 12 34 56</Text>
              <Text style={styles.text}>
                <Link src="http://www.calmasses.com">www.calmasses.com</Link>
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Reserva</Text>
              <Text style={styles.text}>Nom: {name}</Text>
              <Text style={styles.text}>Data d'entrada: {checkInDate}</Text>
              <Text style={styles.text}>Data de sortida: {checkOutDate}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Gaudeix de la teva estada!</Text>
              <Text style={styles.text}>Esperem que tinguis una experiència inoblidable a Cal Masses.</Text>
            </View>
          </Page>
        </Document>
      );
}
