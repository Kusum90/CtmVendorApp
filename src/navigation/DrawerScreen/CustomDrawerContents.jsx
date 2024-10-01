import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 15;

  const [activeItem, setActiveItem] = useState('');
  const [isShopOpen, setShopOpen] = useState(false);
  const [isContentOpen, setContentOpen] = useState(false);
  const [isFinanceOpen, setFinanceOpen] = useState(false);
  const [isSocialOpen, setSocialOpen] = useState(false);

  const handleSectionPress = (section, isOpenSetter, isOpen) => {
    isOpenSetter(!isOpen);
    setActiveItem(isOpen ? '' : section);
  };

  const handleSubItemPress = (section, route, params = {}) => {
    setActiveItem(section); // Set active item
    props.navigation.navigate(route, params); // Navigate to the specified route with params
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
            onPress={() => handleSubItemPress('Followers', 'FollowersScreen')}
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
            onPress={() => handleSubItemPress('ChatBox', 'ChatBoxScreen')}
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
            screen: 'SettingsScreen',
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
        onPress={() => {
          props.navigation.navigate('Support');
          setActiveItem('Support');
        }}
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
      <TouchableOpacity
        onPress={() => {
          alert('Logout pressed');
          setActiveItem('Logout');
        }}
        style={[
          styles.menuItem,
          activeItem === 'Logout' ? styles.activeMenuItem : null,
        ]}>
        <LogoutIcon
          color={activeItem === 'Logout' ? 'green' : 'black'}
          width={20}
          height={20}
        />
        <Text
          style={[
            styles.menuLabel,
            activeItem === 'Logout' ? styles.activeMenuLabel : null,
          ]}>
          Logout
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  drawerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuLabel: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  arrowOpen: {
    transform: [{rotate: '180deg'}],
    marginLeft: 'auto',
  },
  arrowClosed: {
    marginLeft: 'auto',
  },
  subMenu: {
    paddingLeft: 40,
    backgroundColor: '#f9f9f9',
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  subMenuLabel: {
    marginLeft: 10,
    fontSize: 14,
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
