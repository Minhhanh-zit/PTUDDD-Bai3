import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

export default function App() {

  // STATE

  // Quản lý màn hình hiện tại
  const [currentScreen, setCurrentScreen] = useState(1);

  // Dữ liệu nhập
  const [userName, setUserName] = useState('');
  const [mssv, setMssv] = useState('');

  // Thông báo lỗi
  const [userNameError, setUserNameError] = useState('');
  const [mssvError, setMssvError] = useState('');

  // VALIDATE + CHUYỂN SCREEN
  const handleNext = () => {
    let isValid = true;

    // Kiểm tra UserName
    if (userName.trim() === '') {
      setUserNameError('UserName không được để trống');
      isValid = false;
    } else {
      setUserNameError('');
    }

    // Kiểm tra MSSV:
    // B + 2 chữ cái A-Z + năm 22-26 + 4 chữ số
    const mssvPattern = /^B[A-Z]{2}(?:22|23|24|25|26)[0-9]{4}$/;

    if (mssv.trim() === '') {
      setMssvError('MSSV không được để trống');
      isValid = false;
    } else if (!mssvPattern.test(mssv.trim())) {
      setMssvError(
        'MSSV phải có dạng B + 2 chữ cái + năm từ 22 đến 26 + 4 chữ số. Ví dụ: BIT246755'
      );
      isValid = false;
    } else {
      setMssvError('');
    }

    // Nếu hợp lệ thì sang Screen 2
    if (isValid) {
      setCurrentScreen(2);
    }
  };

  // SCREEN 2
  if (currentScreen === 2) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        <View style={styles.screen2Container}>
          {/* Nút Back */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentScreen(1)}
          >
            <Ionicons
              name="arrow-back"
              size={26}
              color="#000000"
            />

            <Text style={styles.backText}>
              Back
            </Text>
          </TouchableOpacity>

          {/* Nội dung Screen 2 */}
          <View style={styles.screen2Content}>
            <Text style={styles.screen2Title}>
              Screen 2
            </Text>

            <View style={styles.infoCard}>
              {/* UserName */}
              <Text style={styles.infoLabel}>
                UserName
              </Text>

              <Text style={styles.infoValue}>
                {userName}
              </Text>

              <View style={styles.divider} />

              {/* MSSV */}
              <Text style={styles.infoLabel}>
                MSSV
              </Text>

              <Text style={styles.infoValue}>
                {mssv}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // SCREEN 1
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Giúp giao diện né bàn phím */}
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Cho phép cuộn khi bàn phím xuất hiện */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/*GIAO DIỆN CHÍNH */}
            <View style={styles.content}>

              {/* Khối 1 */}
              <View style={[styles.largeBox, styles.box1]}>
                <Text style={styles.whiteNumber}>
                  1
                </Text>
              </View>

              {/* Khối 2 */}
              <View style={[styles.largeBox, styles.box2]}>
                <Text style={styles.whiteNumber}>
                  2
                </Text>
              </View>

              {/* Hàng gồm 4 phần bằng nhau */}
              <View style={styles.middleRow}>

                {/* Ô 3 */}
                <View style={[styles.middleBox, styles.box3]}>
                  <Text style={styles.blackNumber}>
                    3
                  </Text>
                </View>

                {/* Ô 4 */}
                <View style={[styles.middleBox, styles.box4]}>
                  <Text style={styles.whiteNumber}>
                    4
                  </Text>
                </View>

                {/* Ô 5 */}
                <View style={[styles.middleBox, styles.box5]}>
                  <Text style={styles.whiteNumber}>
                    5
                  </Text>
                </View>

                {/* Ô thứ 4 để trống */}
                <View
                  style={[
                    styles.middleBox,
                    styles.blankBox,
                  ]}
                />
              </View>

              {/* Khối 6 */}
              <View style={styles.box6}>
                <Text style={styles.whiteNumber}>
                  6
                </Text>
              </View>

              {/*FORM NHẬP DỮ LIỆU*/}
              <View style={styles.formContainer}>

                <Text style={styles.formTitle}>
                  Nhập thông tin sinh viên
                </Text>

                {/* UserName */}
                <TextInput
                  style={[
                    styles.input,
                    userNameError
                      ? styles.inputError
                      : null,
                  ]}
                  placeholder="Nhập UserName"
                  placeholderTextColor="#999999"
                  value={userName}
                  returnKeyType="next"
                  onChangeText={(text) => {
                    setUserName(text);

                    if (text.trim() !== '') {
                      setUserNameError('');
                    }
                  }}
                />

                {userNameError !== '' && (
                  <Text style={styles.errorText}>
                    {userNameError}
                  </Text>
                )}

                {/* MSSV */}
                <TextInput
                  style={[
                    styles.input,
                    mssvError
                      ? styles.inputError
                      : null,
                  ]}
                  placeholder="Nhập MSSV, ví dụ: BIT246755"
                  placeholderTextColor="#999999"
                  value={mssv}
                  autoCapitalize="characters"
                  maxLength={9}
                  returnKeyType="done"
                  onChangeText={(text) => {
                    const normalized = text
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, '')
                      .slice(0, 9);

                    setMssv(normalized);

                    if (normalized.trim() !== '') {
                      setMssvError('');
                    }
                  }}
                />

                {mssvError !== '' && (
                  <Text style={styles.errorText}>
                    {mssvError}
                  </Text>
                )}
              </View>
            </View>

            {/*PHẦN DƯỚI*/}
            <View style={styles.bottomContainer}>
              <Text style={styles.footer}>
                Chu Thị Minh Hạnh - BIT246755
              </Text>

              <TouchableOpacity
                style={styles.clickButton}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={styles.clickButtonText}>
                  Click me
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// STYLE
const styles = StyleSheet.create({

  // CHUNG
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },

  keyboardView: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,

    width: '100%',
    maxWidth: 430,

    alignSelf: 'center',

    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
  },

  content: {
    width: '100%',
  },

  // KHỐI 1 VÀ 2
  largeBox: {
    width: '100%',
    height: 75,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 12,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  box1: {
    backgroundColor: '#3282E8',
  },

  box2: {
    backgroundColor: '#FF4141',
    marginTop: 8,
  },

  // HÀNG 3 - 4 - 5 - TRỐNG
  middleRow: {
    width: '100%',
    height: 135,

    flexDirection: 'row',

    marginTop: 8,

    gap: 8,
  },

  middleBox: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 12,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3,

    elevation: 2,
  },

  box3: {
    backgroundColor: '#FFD21F',
  },

  box4: {
    backgroundColor: '#31B46E',
  },

  box5: {
    backgroundColor: '#7A3FE0',
  },

  // Ô trắng hòa vào nền
  blankBox: {
    backgroundColor: '#F4F6F8',
    shadowOpacity: 0,
    elevation: 0,
  },

  // KHỐI 6
  box6: {
    width: '100%',
    height: 105,

    marginTop: 8,

    backgroundColor: '#FF7417',

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 12,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  // CHỮ SỐ
  whiteNumber: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
  },

  blackNumber: {
    color: '#111111',
    fontSize: 34,
    fontWeight: '700',
  },

  // FORM
  formContainer: {
    marginTop: 14,
  },

  formTitle: {
    textAlign: 'center',

    color: '#333333',

    fontSize: 17,
    fontWeight: '600',

    marginBottom: 4,
  },

  input: {
    width: '100%',
    height: 48,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#D6DADF',
    borderRadius: 12,

    paddingHorizontal: 14,

    fontSize: 16,
    color: '#222222',

    marginTop: 8,
  },

  inputError: {
    borderColor: '#E53935',
    borderWidth: 1.5,
  },

  errorText: {
    color: '#E53935',

    fontSize: 13,

    marginTop: 4,
    marginLeft: 4,
  },
 
  // FOOTER + CLICK ME
  bottomContainer: {
    marginTop: 'auto',

    alignItems: 'center',

    paddingTop: 18,
    paddingBottom: 4,
  },

  footer: {
    color: '#222222',

    fontSize: 15,
    fontWeight: '600',

    marginBottom: 10,

    textAlign: 'center',
  },

  clickButton: {
    minWidth: 140,
    height: 46,

    paddingHorizontal: 24,

    backgroundColor: '#111111',

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 23,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,

    elevation: 3,
  },

  clickButtonText: {
    color: '#FFFFFF',

    fontSize: 16,
    fontWeight: '700',
  },

  // SCREEN 2
  screen2Container: {
    flex: 1,

    width: '100%',
    maxWidth: 430,

    alignSelf: 'center',

    paddingHorizontal: 18,
    paddingTop: 8,
  },

  // Nút Back góc trái trên
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',

    alignSelf: 'flex-start',

    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  backText: {
    marginLeft: 5,

    color: '#000000',

    fontSize: 16,
    fontWeight: '600',
  },

  screen2Content: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    paddingBottom: 80,
  },

  screen2Title: {
    color: '#222222',

    fontSize: 30,
    fontWeight: '700',

    marginBottom: 24,
  },

  infoCard: {
    width: '100%',

    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    padding: 20,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
  },

  infoLabel: {
    color: '#777777',

    fontSize: 14,

    marginBottom: 5,
  },

  infoValue: {
    color: '#222222',

    fontSize: 20,
    fontWeight: '600',
  },

  divider: {
    height: 1,

    backgroundColor: '#EAEAEA',

    marginVertical: 18,
  },
});