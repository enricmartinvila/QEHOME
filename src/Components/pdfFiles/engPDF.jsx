import React from 'react';
import { Document, Page, Text, View, PDFViewer, Image } from '@react-pdf/renderer';
import logoImg from '/logo/logo.png';
import imgs from '/logo/SliderHab1.png';
import imgsrc from '/logo/SliderLav2.png';
import imgsrc2 from '/logo/SliderMen2.png';

export default function EngPDF({ name, checkInDate, checkOutDate }) {
  const styles = {
    page: {},
    section: {
      marginBottom: 10,
      alignItems: 'center',
    },
    section2: {
      marginBottom: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 10,
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
    logo: {
      width: 420,
      height: 175,
    },
    image: {
      width: 600,
      height: 200,
    },
    image2: {
      width: 600,
      height: 337.25,
    },
    imgConatiner: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 20,
    },
    ultimateText: {
      marginTop: 10,
      fontSize: 12,
    },
  };

  return (
    <PDFViewer width="100%" height="600px">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View>
              <Image src={logoImg} style={styles.logo} />
            </View>
            <Text style={styles.title}>Congratulations, {name} !</Text>
            {/* Use <Text> to wrap the date strings and apply fontWeight: 'bold' */}
            <Text style={styles.subtitle}>
              Enjoy your stay from <Text style={{ fontWeight: 'bold' }}>{checkInDate}</Text> to <Text style={{ fontWeight: 'bold' }}>{checkOutDate}</Text>
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.ultimateText}>We hope you have an unforgettable experience at Cal Masses.</Text>
          </View>
          <View style={styles.imgConatiner}>
            <Image src={imgs} style={styles.image} />
            <Image src={imgsrc} style={styles.image} />
          </View>
          {/* <Image src={imgsrc2} style={styles.image2} /> */}
        </Page>
      </Document>
    </PDFViewer>
  );
}
