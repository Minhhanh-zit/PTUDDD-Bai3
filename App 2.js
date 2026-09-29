import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Khối 1 */}
      <View style={[styles.bigBox, styles.box1]}>
        <Text style={styles.whiteNumber}>1</Text>
      </View>

      {/* Khối 2 */}
      <View style={[styles.bigBox, styles.box2]}>
        <Text style={styles.whiteNumber}>2</Text>
      </View>

      {/* Hàng gồm 4 ô bằng nhau */}
      <View style={styles.middleRow}>
        <View style={[styles.middleBox, styles.box3]}>
          <Text style={styles.blackNumber}>3</Text>
        </View>

        <View style={[styles.middleBox, styles.box4]}>
          <Text style={styles.whiteNumber}>4</Text>
        </View>

        <View style={[styles.middleBox, styles.box5]}>
          <Text style={styles.whiteNumber}>5</Text>
        </View>

        {/* Ô trắng */}
        <View style={[styles.middleBox, styles.blankBox]} />
      </View>

      {/* Khối 6 */}
      <View style={styles.box6}>
        <Text style={styles.whiteNumber}>6</Text>
      </View>

      {/* Thông tin sinh viên */}
      <Text style={styles.footer}>
        Chu Thị Minh Hạnh - BIT246755
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingTop: 7,
  },

  bigBox: {
    width: '100%',
    height: 92,
    justifyContent: 'center',
    alignItems: 'center',
  },

  box1: {
    backgroundColor: '#2F80ED',
  },

  box2: {
    backgroundColor: '#FF3D3D',
    marginTop: 8,
  },

  middleRow: {
    width: '100%',
    height: 192,
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },

  middleBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  box3: {
    backgroundColor: '#FFD21E',
  },

  box4: {
    backgroundColor: '#2FB16E',
  },

  box5: {
    backgroundColor: '#7B3FE4',
  },

  blankBox: {
    backgroundColor: '#FFFFFF',
  },

  box6: {
    width: '100%',
    height: 160,
    backgroundColor: '#FF7210',
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  whiteNumber: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
  },

  blackNumber: {
    color: '#000000',
    fontSize: 40,
    fontWeight: 'bold',
  },

  footer: {
    marginTop: 'auto',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 18,
    color: '#222222',
  },
});