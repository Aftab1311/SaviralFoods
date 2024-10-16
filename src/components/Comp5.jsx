import React from 'react';

const Comp5 = () => {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      position: 'relative',
      marginTop: '20px',
      // minHeight: '1000px',
      padding: '20px',
    },
    section: {
      position: 'relative',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    topLeaves: {
      marginLeft: '-160px',
      marginBottom: '-50px',
      '@media (maxWidth: 768px)': {
        marginLeft: '0',
        textAlign: 'left',
      },
    },
    leavesImage: {
      width: '150px',
      maxWidth: '100%',
    },
    title: {
      fontSize: '16px',
      color: '#333',
      marginBottom: '-10px',
      marginTop: '10px',
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: '10px',
      backgroundColor: 'white',
      fontWeight: 'bold',
      color: '#333',
      position: 'relative',
      zIndex: 1,
      top: '45px',
      maxWidth: '180px',
      margin: '0 auto',
      '@media (maxWidth: 768px)': {
        top: '25px',
      },
    },
    mainHeading: {
      fontSize: '48px',
      color: '#333',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'visible',
      '@media (maxWidth: 768px)': {
        fontSize: '36px',
        flexDirection: 'column',
      },
    },
    paragraph: {
      margin: '30px auto',
      maxWidth: '900px',
      fontSize: '16px',
      color: '#666',
      lineHeight: '1.8',
    },
    signatureSection: {
      margin: '40px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    ownerName: {
      fontSize: '18px',
      color: '#333',
      margin: '5px 0',
    },
    ownerTitle: {
      fontSize: '14px',
      color: '#7BB241',
    },
    signatureImage: {
      width: '100%',
      maxWidth: '300px',
      marginBottom: '10px',
    },
    vegetablesImage: {
      width: '300px',
      maxWidth: '100%',
      marginLeft: '-170px',
      '@media (maxWidth: 768px)': {
        marginLeft: '0',
      },
    },
    slogan: {
      fontSize: '28px',
      marginTop: '-190px',
      color: '#333',
      fontStyle: 'italic',
      '@media (maxWidth: 768px)': {
        marginTop: '20px',
      },
    },
  };

  return (
    <div style={styles.container}>
      <section style={styles.section}>
        <div style={styles.topLeaves}>
          <img src="/images/left_mint_leave.png" alt="Leaves" style={styles.leavesImage} />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h1 style={styles.title}>
            Saviral Foods <span style={{ color: '#333', fontWeight: 'normal' }}>Fresh since 1990</span> 
          </h1>
          <div style={{ marginTop: '-20px', gap: '0px' }}>
            <div style={styles.subtitle}>100% Fresh GUARANTEE</div>
            <h2 style={styles.mainHeading}>
              <span style={{ fontWeight: 'normal' }}>
                WE DO <span style={{ fontWeight: 'bold' }}>HEALTHY</span>
              </span>
            </h2>
          </div>
        </div>

        <p style={styles.paragraph}>
        At Saviral Foods, we're passionate about providing you with the purest, most Fresh foods. That's why we've made a commitment to offering 100% Fresh products. Our dedication to Fresh practices ensures that our products are free from harmful synthetic pesticides, herbicides, and genetically modified organisms (GMOs).
        </p>

        <div style={styles.signatureSection}>
          {/* <div>
            <h3 style={styles.ownerName}>Gabriel Johnson</h3>
            <p style={styles.ownerTitle}>The Maangerams Owner</p>
          </div> */}
          
          <div>
            {/* <img src="/images/hero.jpeg" alt="Signature" style={styles.signatureImage} className='rounded-full'/> */}
          </div>
        </div>

        <div style={{ position: 'relative', marginTop: '-80px' }}>
          <img src="/images/spinach.png" alt="Vegetables" style={styles.vegetablesImage} />
        </div>

        <p style={styles.slogan}>Live Fresh, Live Healthy</p>
      </section>
    </div>
  );
};

export default Comp5;
