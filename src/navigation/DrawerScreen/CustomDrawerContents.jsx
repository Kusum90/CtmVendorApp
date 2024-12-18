import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { wp,hp,FontSize } from '../../utils/responsiveUtils';
import { logoutUser } from '../../redux/Auth/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

// Use RefundIcon for all icons (you can replace it with your actual SVG file)
import ShopIcon from '../../assets/svg/DrawerSVG/ShopIcon';
import ProductIcon from '../../assets/svg/BottomTabSVG/ProductIcon';
import OrderIcon from '../../assets/svg/BottomTabSVG/OrderIcon';
import CouponIcon from '../../assets/svg/DrawerSVG/CouponIcon';
import CustomerIcon from '../../assets/svg/DrawerSVG/CustomerIcon';
import RefundIcon from '../../assets/svg/DrawerSVG/RefundIcon';
import AddToMyStoreIcon from '../../assets/svg/DrawerSVG/AddToMyStoreIcon';

import FinanceIcon from '../../assets/svg/DrawerSVG/FinanceIcon';
import PaymentsIcon from '../../assets/svg/DrawerSVG/PaymentsIcon';
import LedgerBookIcon from '../../assets/svg/DrawerSVG/LedgerBookIcon';
import ReportIcon from '../../assets/svg/DrawerSVG/ReportIcon';

import SocialIcon from '../../assets/svg/DrawerSVG/SocialIcon';
import FollowersIcon from '../../assets/svg/DrawerSVG/FollowersIcon';
import ChatIcon from '../../assets/svg/BottomTabSVG/ChatIcon';

import SettingIcon from '../../assets/svg/DrawerSVG/SettingIcon';
import LogoutIcon from '../../assets/svg/DrawerSVG/LogoutIcon';
import SupportIcon from '../../assets/svg/DrawerSVG/SupportIcon';

import ArrowIcon from '../../assets/svg/DrawerSVG/ArrowIcon';

const CustomDrawerContent = props => {
  const dispatch = useDispatch();
  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 15;

  const [activeItem, setActiveItem] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShopOpen, setShopOpen] = useState(false);
  const [isContentOpen, setContentOpen] = useState(false);
  const [isFinanceOpen, setFinanceOpen] = useState(false);
  const [isSocialOpen, setSocialOpen] = useState(false);


  // Check for token in AsyncStorage
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      console.log('token found'+token);
      
      setIsLoggedIn(!!token); // Set to true if token exists, false otherwise
    };
    checkLoginStatus();
  }, []);
 

  const handleSectionPress = (section, isOpenSetter, isOpen) => {
    isOpenSetter(!isOpen);
    setActiveItem(isOpen ? '' : section);
  };

  const handleSubItemPress = (section, route, params = {}) => {
    setActiveItem(section); // Set active item
    props.navigation.navigate(route, params); // Navigate to the specified route with params
  };

  const [logoutLoading, setLogoutLoading] = useState(false); // Add a loading state

const handleLogout = async () => {
  setLogoutLoading(true); // Start loading
  try {
    await dispatch(logoutUser()).unwrap(); // Execute logout API call
    await AsyncStorage.removeItem('userToken'); // Remove token from storage
    setIsLoggedIn(false); // Update state
    props.navigation.navigate('LoginScreen'); // Navigate to Login screen
  } catch (error) {
    console.log('Logout Error:', error); // Debugging
    Alert.alert("Error", "Failed to log out. Please try again.");
  } finally {
    setLogoutLoading(false); // Stop loading
  }
};

  
  

  return (
    <DrawerContentScrollView {...props} style={{paddingTop}}>
      {/* Header Section */}
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>MAIN MENU</Text>
      </View>

      {/* Home Section */}
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Home');
          setActiveItem('Home');
        }}
        style={[
          styles.menuItem,
          activeItem === 'Home' ? styles.activeMenuItem : null,
        ]}>
        <ArrowIcon
          color={activeItem === 'Home' ? 'green' : 'black'}
          width={30}
          height={30}
        />
        <Text
          style={[
            styles.menuLabel,
            activeItem === 'Home' ? styles.activeMenuLabel : null,
          ]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Shop Section */}
      <TouchableOpacity
        onPress={() => handleSectionPress('Shop', setShopOpen, isShopOpen)}
        style={[
          styles.menuItem,
          activeItem === 'Shop' ? styles.activeMenuItem : null,
        ]}>
        <ShopIcon
          color={activeItem === 'Shop' ? 'green' : 'black'}
          width={20}
          height={20}
        />
        <Text
          style={[
            styles.menuLabel,
            activeItem === 'Shop' ? styles.activeMenuLabel : null,
          ]}>
          Shop
        </Text>
        <ArrowIcon
          style={isShopOpen ? styles.arrowOpen : styles.arrowClosed}
          width={30}
          height={30}
        />
      </TouchableOpacity>
      {isShopOpen && (
        <View style={styles.subMenu}>
          <TouchableOpacity
            onPress={() => handleSubItemPress('Products', 'ProductScreenNav')}
            style={[
              styles.subMenuItem,
              activeItem === 'Products' ? styles.activeMenuItem : null,
            ]}>
            <ProductIcon
              color={activeItem === 'Products' ? 'green' : 'black'}
              width={18}
              height={18}
            />
            <Text
              style={[
                styles.subMenuLabel,
                activeItem === 'Products' ? styles.activeMenuLabel : null,
              ]}>
              Products
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSubItemPress('Orders', 'OrderScreenNav')}
            style={[
              styles.subMenuItem,
              activeItem === 'Orders' ? styles.activeMenuItem : null,
            ]}>
            <OrderIcon
              color={activeItem === 'Orders' ? 'green' : 'black'}
              width={18}
              height={18}
            />
            <Text
              style={[
                styles.subMenuLabel,
                activeItem === 'Orders' ? styles.activeMenuLabel : null,
              ]}>
              Orders
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleSubItemPress('Coupons', 'Stack', {
                screen: 'CouponNav',
                params: {
                  screen: 'CouponScreen',
                },
              })
            }
            style={[
              styles.subMenuItem,
              activeItem === 'Coupons' ? styles.activeMenuItem : null,
            ]}>
            <CouponIcon
              color={activeItem === 'Coupons' ? 'green' : 'black'}
              width={18}
              height={18}
            />
            <Text
              style={[
                styles.subMenuLabel,
                activeItem === 'Coupons' ? styles.activeMenuLabel : null,
              ]}>
              Coupons
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleSubItemPress('Customer', 'Stack', {
                screen: 'CustomerNav',
                params: {
                  screen: 'CustomersScreen',
                },
              })
            }
            style={[
              styles.subMenuItem,
              activeItem === 'Customer' ? styles.activeMenuItem : null,
            ]}>
            <CustomerIcon
              color={activeItem === 'Customer' ? 'green' : 'black'}
              width={18}
              height={18}
            />
            <Text
              style={[
                styles.subMenuLabel,
                activeItem === 'Customer' ? styles.activeMenuLabel : null,
              ]}>
              Customer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
           onPress={() =>
            handleSubItemPress('Refunds', 'Stack', {
              screen: 'RefundNav',
              params: {
                screen: 'RefundScreen',
              },
            })
          }
            style={[
              styles.subMenuItem,
              activeItem === 'Refunds' ? styles.activeMenuItem : null,
            ]}>
            <RefundIcon
              color={activeItem === 'Refunds' ? 'green' : 'black'}
              width={18}
              height={18}
            />
            <Text
              style={[
                styles.subMenuLabel,
                activeItem === 'Refunds' ? styles.activeMenuLabel : null,
              ]}>
              Refunds
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
           onPress={() =>
            handleSubItemPress('AddToStore', 'Stack', {
              screen: 'AddToStoreNav',
              params: {
                screen: 'AddtomyStoreScreen',
              },
            })
          }
            style={[
              styles.subMenuItem,
              activeItem === 'AddToStore' ? styles.activeMenuItem : null,
            ]}>
            <AddToMyStoreIcon
              color={activeItem === 'AddToStore' ? 'green' : 'black'}
              width={18}
              height={18}
            />
            <Text
              style={[
                styles.subMenuLabel,
                activeItem === 'AddToStore' ? styles.activeMenuLabel : null,
              ]}>
              Add To My Store
            </Text>
          </TouchableOpacity>
        </View>
      )}


      {/* Content Section */}
      <TouchableOpacity
        onPress={() => handleSectionPress('Content', setContentOpen, isContentOpen)}
        style={[
          styles.menuItem,
          activeItem === 'Content' ? styles.activeMenuItem : null,
        ]}>
        <ShopIcon
          color={activeItem === 'Content' ? 'green' : 'black'}
          width={20}
          height={20}
        />
        <Text
          style={[
            styles.menuLabel,
            activeItem === 'Content' ? styles.activeMenuLabel : null,
          ]}>
          Content
        </Text>
        <ArrowIcon
          style={isContentOpen ? styles.arrowOpen : styles.arrowClosed}
          width={30}
          height={30}
        />
      </TouchableOpacity>
      {isContentOpen && (
        <View style={styles.subMenu}>
          <TouchableOpacity
            onPress={() =>
              handleSubItemPress('Media', 'Stack', {
                screen: 'MediaScreenNav',
                params: {
                  screen: 'MediaSCreen',
                },
              })
            }
            style={[
              styles.subMenuItem,
              activeItem === 'Media' ? styles.activeMenuItem : null,
            ]}>
            <PaymentsIcon
              color={activeItem === 'Media' ? 'green' : 'black'}
              width={18}
              height={18}
            />
            <Text
              style={[
                styles.subMenuLabel,
                activeItem === 'Media' ? styles.activeMenuLabel : null,
              ]}>
              Media
            </Text>
          </TouchableOpacity>
          </View>
      )}


      {/* Finance Section */}
      <TouchableOpacity
        onPress={() =>
          handleSectionPress('Finance', setFinanceOpen, isFinanceOpen)
        }
        style={[
          styles.menuItem,
          activeItem === 'Finance' ? styles.activeMenuItem : null,
        ]}>
        <FinanceIcon
          color={activeItem === 'Finance' ? 'green' : 'black'}
          width={20}
          height={20}
        />
        <Text
          style={[
            styles.menuLabel,
            activeItem === 'Finance' ? styles.activeMenuLabel : null,
          ]}>
          Finance
        </Text>
        <ArrowIcon
          style={isFinanceOpen ? styles.arrowOpen : styles.arrowClosed}
          width={30}
          height={30}
        />
      </TouchableOpacity>
      {isFinanceOpen && (
        <View style={styles.subMenu}>
          <TouchableOpacity
            onPress={() =>
              handleSubItemPress('Payments', 'Stack', {
                screen: 'PaymentsScreenNav',
                params: {
                  screen: 'PaymentSCreen',
                },
              })
            }
            style={[
              styles.subMenuItem,
              activeItem === 'Payments' ? styles.activeMenuItem : null,
            ]}>
            <PaymentsIcon
              color={activeItem === 'Payments' ? 'green' : 'black'}
              width={18}
              height={18}
            />
            <Text
              style={[
                styles.subMenuLabel,
                activeItem === 'Payments' ? styles.activeMenuLabel : null,
              ]}>
              Payments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleSubItemPress('LedgerBook', 'Stack', {
                screen: 'LedgerBookScreenNav',
                params: {
                  screen: 'LedgerBookScreen',
                },
              })
            }
            style={[
              styles.subMenuItem,
              activeItem === 'LedgerBook' ? styles.activeMenuItem : null,
            ]}>
            <LedgerBookIcon
              color={activeItem === 'LedgerBook' ? 'green' : 'black'}
              width={18}
              height={18}
            />
            <Text
              style={[
                styles.subMenuLabel,
                activeItem === 'LedgerBook' ? styles.activeMenuLabel : null,
              ]}>
              Ledger Book
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSubItemPress('Reports', 'ReportsScreen')}
            style={[
              styles.subMenuItem,
              activeItem === 'Reports' ? styles.activeMenuItem : null,
            ]}>
            <ReportIcon
              color={activeItem === 'Reports' ? 'green' : 'black'}
              width={18}
              height={18}
            />
            <Text
              style={[
                styles.subMenuLabel,
                activeItem === 'Reports' ? styles.activeMenuLabel : null,
              ]}>
              Reports
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Social Section */}
      <TouchableOpacity
        onPress={() =>
          handleSectionPress('Social', setSocialOpen, isSocialOpen)
        }
        style={[
          styles.menuItem,
          activeItem === 'Social' ? styles.activeMenuItem : null,
        ]}>
        <SocialIcon
          color={activeItem === 'Social' ? 'green' : 'black'}
          width={20}
          height={20}
        />
        <Text
          style={[
            styles.menuLabel,
            activeItem === 'Social' ? styles.activeMenuLabel : null,
          ]}>
          Social
        </Text>
        <ArrowIcon
          style={isSocialOpen ? styles.arrowOpen : styles.arrowClosed}
          width={30}
          height={30}
        />
      </TouchableOpacity>
      {isSocialOpen && (
        <View style={styles.subMenu}>
          <TouchableOpacity
             onPress={() =>
              handleSubItemPress('Followers', 'Stack', {
                screen: 'FollowersScreenNav',
                params: {
                  screen: 'FollowersScreen',
                },
              })
            }
            style={[
              styles.subMenuItem,
              activeItem === 'Followers' ? styles.activeMenuItem : null,
            ]}>
            <FollowersIcon
              color={activeItem === 'Followers' ? 'green' : 'black'}
              width={18}
              height={18}
            />
            <Text
              style={[
                styles.subMenuLabel,
                activeItem === 'Followers' ? styles.activeMenuLabel : null,
              ]}>
              Followers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleSubItemPress('ChatBox', 'Stack', {
                screen: 'ChatBoxScreenNav',
                params: {
                  screen: 'ChatBoxScreen',
                },
              })
            }
            style={[
              styles.subMenuItem,
              activeItem === 'ChatBox' ? styles.activeMenuItem : null,
            ]}>
            <ChatIcon
              color={activeItem === 'ChatBox' ? 'green' : 'black'}
              width={18}
              height={18}
            />
            <Text
              style={[
                styles.subMenuLabel,
                activeItem === 'ChatBox' ? styles.activeMenuLabel : null,
              ]}>
              Chat Box
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Setting Section */}
      <TouchableOpacity
        onPress={() => {
          setActiveItem('Setting');
          props.navigation.navigate('Stack', {
            screen: 'SettingsScreenNav',
            params: {
              screen: 'StoreSettings',
            },
          });
        }}
        style={[
          styles.menuItem,
          activeItem === 'Setting' ? styles.activeMenuItem : null,
        ]}>
        <SettingIcon
          color={activeItem === 'Setting' ? 'green' : 'black'}
          width={20}
          height={20}
        />
        <Text
          style={[
            styles.menuLabel,
            activeItem === 'Setting' ? styles.activeMenuLabel : null,
          ]}>
          Setting
        </Text>
      </TouchableOpacity>

      {/* Support Section */}
      <TouchableOpacity
        onPress={() =>
          handleSubItemPress('Support', 'Stack', {
            screen: 'SupportScreenNav',
            params: {
              screen: 'SupportScreen',
            },
          })
        }
        style={[
          styles.menuItem,
          activeItem === 'Support' ? styles.activeMenuItem : null,
        ]}>
        <SupportIcon
          color={activeItem === 'Support' ? 'green' : 'black'}
          width={20}
          height={20}
        />
        <Text
          style={[
            styles.menuLabel,
            activeItem === 'Support' ? styles.activeMenuLabel : null,
          ]}>
          Support
        </Text>
      </TouchableOpacity>

      {/* Logout Section */}
      {isLoggedIn && (
  <TouchableOpacity
    onPress={() => {
      Alert.alert(
        "Confirm Logout", // Alert title
        "Are you sure you want to log out?", // Alert message
        [
          {
            text: "Cancel", // Cancel button
            onPress: () => console.log("Logout cancelled"), // Log for Cancel
            style: "cancel", // Visually distinguishes the Cancel button
          },
          {
            text: "Yes", // Confirm button
            onPress: handleLogout, // Call the logout logic directly
          },
        ],
        { cancelable: false } // Prevents dismissing the alert by tapping outside
      );
    }}
    disabled={logoutLoading} // Disable button if logout is in progress
    style={[
      styles.menuItem,
      activeItem === 'Logout' ? styles.activeMenuItem : null,
      logoutLoading ? styles.disabledMenuItem : null, // Add disabled style
    ]}
  >
    {logoutLoading ? (
      <ActivityIndicator size="small" color="green" /> // Show loader if logging out
    ) : (
      <>
        <LogoutIcon
          color={activeItem === 'Logout' ? 'green' : 'black'}
          width={20}
          height={20}
        />
        <Text
          style={[
            styles.menuLabel,
            activeItem === 'Logout' ? styles.activeMenuLabel : null,
          ]}
        >
          Logout
        </Text>
      </>
    )}
  </TouchableOpacity>
)}


    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: wp(4), // Responsive padding
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  drawerTitle: {
    fontSize: FontSize(12), // Responsive font size
    fontWeight: 'bold',
    color: '#999',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2), // Responsive vertical padding
    paddingHorizontal: wp(5), // Responsive horizontal padding
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuLabel: {
    marginLeft: wp(2), // Responsive margin
    fontSize: FontSize(16), // Responsive font size
    fontWeight: '500',
    color: '#333',
  },
  arrowOpen: {
    transform: [{ rotate: '180deg' }],
    marginLeft: 'auto',
  },
  arrowClosed: {
    marginLeft: 'auto',
  },
  subMenu: {
    paddingLeft: wp(10), // Responsive left padding
    backgroundColor: '#f9f9f9',
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.5), // Responsive vertical padding
    paddingHorizontal: wp(5), // Responsive horizontal padding
  },
  subMenuLabel: {
    marginLeft: wp(2), // Responsive margin
    fontSize: FontSize(14), // Responsive font size
    fontWeight: '400',
    color: '#666',
  },
  activeMenuItem: {
    backgroundColor: '#e0f7e9',
  },
  activeMenuLabel: {
    color: 'green',
  },
});
export default CustomDrawerContent;
