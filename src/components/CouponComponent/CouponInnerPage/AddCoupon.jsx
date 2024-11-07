// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Switch,
//   ScrollView,
//   Modal,
//   FlatList,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { createCoupon, fetchProducts } from '../../../redux/Coupon/CouponSlice';
// import { Picker } from '@react-native-picker/picker';
// import CommonCalendar from '../../../utils/datepicker';
// import { wp,hp,FontSize } from '../../../utils/responsiveUtils';

// const AddCoupon = () => {
//   const dispatch = useDispatch();
//   const loading = useSelector((state) => state.coupons.loading);
//   const products = useSelector((state) => state.coupons.products);

//   const [activeTab, setActiveTab] = useState('restriction');
//   const [formData, setFormData] = useState({
//     couponCode: '',
//     description: '',
//     discountType: 'Percentage Discount',
//     couponAmount: '',
//     expiry: '',
//     allowFreeShipping: false,
//     showOnStore: false,
//     minimumSpend: 0,
//     maximumSpend: 0,
//     individualUseOnly: false,
//     excludeSaleItems: false,
//     products: [], // Selected products
//     excludedProducts: [], // Excluded products
//     emailRestrictions: '', // Email restriction input
//     usageLimitPerCoupon: 0,
//     limitUsageToXItems: 0,
//     usageLimitPerUser: 0,
//   });

//   const [productSearch, setProductSearch] = useState(''); // Search for products
//   const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on search
//   const [selectedProducts, setSelectedProducts] = useState([]); // Selected products for the coupon
//   const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
//   const [selectAll, setSelectAll] = useState(false); // State for "Select All" switch

//   const [isExcludeModalVisible, setIsExcludeModalVisible] = useState(false);
//   const [excludedProducts, setExcludedProducts] = useState([]); // Selected products to exclude
//   const [isCalendarVisible, setIsCalendarVisible] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);

//   // Fetch products only when the user types something in the search box
//   useEffect(() => {
//     if (productSearch.length > 0) {
//       dispatch(fetchProducts(productSearch)); // Fetch products based on search term
//     } else {
//       setFilteredProducts([]); // Clear filtered products if search is empty
//     }
//   }, [productSearch, dispatch]);

//   // Update filtered products when products list is updated
//   useEffect(() => {
//     setFilteredProducts(products);
//     if (selectAll && products.length > 0) {
//       setSelectedProducts(products.map((product) => product.title)); // Select all products if "Select All" is enabled
//     }
//   }, [products, selectAll]);

//   const handleProductSelect = (product) => {
//     if (selectedProducts.includes(product)) {
//       setSelectedProducts(selectedProducts.filter((p) => p !== product));
//     } else {
//       setSelectedProducts([...selectedProducts, product]);
//     }
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     setIsCalendarVisible(false);
//   };

//   const handleExcludeProductSelect = (product) => {
//     if (excludedProducts.includes(product)) {
//       setExcludedProducts(excludedProducts.filter((p) => p !== product));
//     } else {
//       setExcludedProducts([...excludedProducts, product]);

//       // If a product is excluded, remove it from the selected products list
//       if (selectedProducts.includes(product)) {
//         setSelectedProducts(selectedProducts.filter((p) => p !== product));
//       }
//     }
//   };

//   const handleSaveCoupon = () => {
//     const parsedExpiryDate = new Date(formData.expiry).toISOString(); // Convert to ISO string

//     const couponData = {
//       ...formData,
//       expiry: parsedExpiryDate,
//       couponAmount: formData.couponAmount.toString(),
//       minimumSpend: parseFloat(formData.minimumSpend),
//       maximumSpend: parseFloat(formData.maximumSpend),
//       usageLimitPerCoupon: parseInt(formData.usageLimitPerCoupon),
//       limitUsageToXItems: parseInt(formData.limitUsageToXItems),
//       usageLimitPerUser: parseInt(formData.usageLimitPerUser),
//       products: selectedProducts,
//       excludedProducts: excludedProducts || [],
//       emailRestrictions: formData.emailRestrictions ? [formData.emailRestrictions] : [],
//     };

//     console.log('Coupon Data:', couponData);
//     dispatch(createCoupon(couponData));
//   };

//   const renderProductModal = () => (
//     <Modal
//       visible={isModalVisible}
//       animationType="slide"
//       onRequestClose={() => setIsModalVisible(false)}
//       transparent={true}
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Search and Select Products</Text>
  
//           {/* Select All Products Switch */}
//           <View style={styles.switchContainer}>
//             <Text>Select All Products</Text>
//             <Switch
//               value={selectAll}
//               onValueChange={(value) => {
//                 setSelectAll(value);
//                 if (value) {
//                   setSelectedProducts(products.map((product) => product.title)); // Select all products
//                   setFilteredProducts(products); // Show all products below when select all is enabled
//                 } else {
//                   setSelectedProducts([]); // Clear selected products
//                   setFilteredProducts([]); // Clear filtered products when deselecting all
//                 }
//               }}
//             />
//           </View>
  
//           {/* Disable search box if Select All is enabled */}
//           <TextInput
//             style={[styles.searchInput, { backgroundColor: selectAll ? '#ddd' : '#fff' }]} // Grey out if disabled
//             placeholder="Search product..."
//             value={productSearch}
//             onChangeText={(text) => setProductSearch(text)}
//             editable={!selectAll} // Disable when select all is active
//           />
  
//           {/* Display the filtered products or all products */}
//           {filteredProducts.length > 0 ? (
//             <FlatList
//               data={filteredProducts}
//               keyExtractor={(item) => item._id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.productItem}
//                   onPress={() => handleProductSelect(item.title)}
//                 >
//                   <Text
//                     style={{
//                       color: selectedProducts.includes(item.title) ? 'green' : 'black',
//                     }}
//                   >
//                     {item.title}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             />
//           ) : (
//             <Text>No products found</Text>
//           )}
  
//           <View style={styles.modalActions}>
//             <TouchableOpacity
//               style={styles.doneButton}
//               onPress={() => setIsModalVisible(false)}
//             >
//               <Text style={styles.doneButtonText}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
  

//   const renderExcludeProductModal = () => (
//     <Modal
//       visible={isExcludeModalVisible}
//       animationType="slide"
//       onRequestClose={() => setIsExcludeModalVisible(false)}
//       transparent={true}
//     >
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Text style={styles.modalTitle}>Exclude Products</Text>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search product to exclude..."
//             value={productSearch}
//             onChangeText={(text) => setProductSearch(text)}
//           />

//           {filteredProducts.length > 0 ? (
//             <FlatList
//               data={filteredProducts}
//               keyExtractor={(item) => item._id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.productItem}
//                   onPress={() => handleExcludeProductSelect(item.title)}
//                 >
//                   <Text
//                     style={{
//                       color: excludedProducts.includes(item.title) ? 'red' : 'black',
//                     }}
//                   >
//                     {item.title}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             />
//           ) : (
//             <Text>No products found</Text>
//           )}

//           <View style={styles.modalActions}>
//             <TouchableOpacity
//               style={styles.doneButton}
//               onPress={() => setIsExcludeModalVisible(false)}
//             >
//               <Text style={styles.doneButtonText}>Done</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );

//   const renderRestrictionContent = () => (
//     <>
//       <Text style={styles.sectionTitle}>Include Products</Text>
//       <TouchableOpacity
//         style={styles.selectProductButton}
//         onPress={() => setIsModalVisible(true)}
//       >
//         <Text style={styles.selectProductText}>Select Products</Text>
//       </TouchableOpacity>
//       {selectedProducts.length > 0 && (
//         <View style={styles.selectedProductsContainer}>
//           {selectedProducts.map((product, index) => (
//             <Text key={index} style={styles.selectedProduct}>
//               {product}
//             </Text>
//           ))}
//         </View>
//       )}

//       {/* Exclude Products */}
//       <Text style={styles.sectionTitle}>Exclude Products</Text>
//       <TouchableOpacity
//         style={styles.selectProductButton}
//         onPress={() => setIsExcludeModalVisible(true)}
//       >
//         <Text style={styles.selectProductText}>Exclude Products</Text>
//       </TouchableOpacity>
//       {excludedProducts.length > 0 && (
//         <View style={styles.selectedProductsContainer}>
//           {excludedProducts.map((product, index) => (
//             <Text key={index} style={styles.selectedProduct}>
//               {product}
//             </Text>
//           ))}
//         </View>
//       )}

//       {/* Email Restrictions */}
//       {/* <Text style={styles.sectionTitle}>Email Restriction</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.emailRestrictions}
//         onChangeText={(value) => setFormData({ ...formData, emailRestrictions: value })}
//         placeholder="Enter email restrictions"
//       /> */}

//       <Text style={styles.sectionTitle}>Minimum Spend</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.minimumSpend.toString()}
//         onChangeText={(value) => setFormData({ ...formData, minimumSpend: value })}
//         placeholder="Minimum Spend"
//         keyboardType="numeric"
//       />

//       <Text style={styles.sectionTitle}>Maximum Spend</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.maximumSpend.toString()}
//         onChangeText={(value) => setFormData({ ...formData, maximumSpend: value })}
//         placeholder="Maximum Spend"
//         keyboardType="numeric"
//       />
//     </>
//   );

//   const renderLimitsContent = () => (
//     <>
//       <Text style={styles.sectionTitle}>Limits</Text>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Usage limit per coupon</Text>
//         <TextInput
//           style={styles.input}
//           value={formData.usageLimitPerCoupon?.toString()}
//           onChangeText={(value) => setFormData({ ...formData, usageLimitPerCoupon: value })}
//           placeholder="Usage limit per coupon"
//           keyboardType="numeric"
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Limit usage to X items</Text>
//         <TextInput
//           style={styles.input}
//           value={formData.limitUsageToXItems?.toString()}
//           onChangeText={(value) => setFormData({ ...formData, limitUsageToXItems: value })}
//           placeholder="Limit usage to X items"
//           keyboardType="numeric"
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Usage limit per user</Text>
//         <TextInput
//           style={styles.input}
//           value={formData.usageLimitPerUser?.toString()}
//           onChangeText={(value) => setFormData({ ...formData, usageLimitPerUser: value })}
//           placeholder="Usage limit per user"
//           keyboardType="numeric"
//         />
//       </View>
//     </>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       {renderProductModal()}
//       {renderExcludeProductModal()}
//       <Text style={styles.title}>Create New Coupon</Text>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Coupon Code</Text>
//         <TextInput
//           style={styles.input}
//           value={formData.couponCode}
//           onChangeText={(value) => setFormData({ ...formData, couponCode: value })}
//           placeholder="Enter Coupon Code"
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Description</Text>
//         <TextInput
//           style={styles.input}
//           value={formData.description}
//           onChangeText={(value) => setFormData({ ...formData, description: value })}
//           placeholder="Description"
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Discount Type</Text>
//         <Picker
//           selectedValue={formData.discountType}
//           onValueChange={(itemValue) => setFormData({ ...formData, discountType: itemValue })}
//           style={styles.picker}
//         >
//           <Picker.Item label="Percentage Discount" value="Percentage Discount" />
//           <Picker.Item label="Fixed Product Discount" value="Fixed Product Discount" />
//         </Picker>
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Coupon Amount</Text>
//         <TextInput
//           style={styles.input}
//           value={formData.couponAmount.toString()}
//           onChangeText={(value) => setFormData({ ...formData, couponAmount: value })}
//           placeholder="Coupon Amount"
//           keyboardType="numeric"
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Expiry Date</Text>
//         <TouchableOpacity style={styles.filterButton} onPress={() => setIsCalendarVisible(true)}>
//           <Text style={styles.filterText}>{selectedDate || 'yyyy-mm-dd'}</Text>
//         </TouchableOpacity>
//       </View>

//       <Modal visible={isCalendarVisible} animationType="slide" transparent={true}>
//         <View style={styles.modalContainer}>
//           <View style={styles.calendarWrapper}>
//             <CommonCalendar onDateChange={handleDateChange} />
//             <TouchableOpacity style={styles.closeButton} onPress={() => setIsCalendarVisible(false)}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>



//       <View style={styles.switchContainer}>
//         <View style={styles.switchItem}>
//           <Text style={styles.label}>Allow Free Shipping</Text>
//           <Switch
//             value={formData.allowFreeShipping}
//             onValueChange={(value) => setFormData({ ...formData, allowFreeShipping: value })}
//           />
//         </View>
//         <View style={styles.switchItem}>
//           <Text style={styles.label}>Show on Store</Text>
//           <Switch
//             value={formData.showOnStore}
//             onValueChange={(value) => setFormData({ ...formData, showOnStore: value })}
//           />
//         </View>
//       </View>
//       <View style={{ padding: 20 }}>
//         {/* Tab Navigation */}
//         <View style={styles.tabsContainer}>
//           <TouchableOpacity
//             style={[styles.tabButton, activeTab === 'restriction' && styles.activeTab]}
//             onPress={() => setActiveTab('restriction')}
//           >
//             <Text style={styles.tabText}>Restriction</Text>
//             {activeTab === 'restriction' && <View style={styles.underline} />}
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.tabButton, activeTab === 'limits' && styles.activeTab]}
//             onPress={() => setActiveTab('limits')}
//           >
//             <Text style={styles.tabText}>Limits</Text>
//             {activeTab === 'limits' && <View style={styles.underline} />}
//           </TouchableOpacity>
//         </View>

//         {/* Render Content based on Active Tab */}
//         {activeTab === 'restriction' && renderRestrictionContent()}
//         {activeTab === 'limits' && renderLimitsContent()}
//       </View>
//       <TouchableOpacity style={styles.saveButton} onPress={handleSaveCoupon} disabled={loading}>
//         <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Add Coupon'}</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#373737',
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   searchInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   tabButton: {
//     flex: 1,
//     padding: 10,
//     alignItems: 'center',
//   },
//   activeTab: {
//     fontWeight: 'bold',
//   },
//   tabText: {
//     fontSize: 18,
//     color: '#373737',
//   },
//   underline: {
//     height: 3,
//     backgroundColor: 'green',
//     width: '100%',
//     marginTop: 5,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//     color: '#373737',
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: '#373737',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//   },
//   productItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   switchContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   switchItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   saveButton: {
//     backgroundColor: 'green',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     margin: 20,
//     borderRadius: 10,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   modalActions: {
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   doneButton: {
//     backgroundColor: 'green',
//     padding: 10,
//     borderRadius: 5,
//   },
//   doneButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   selectedProductsContainer: {
//     marginTop: 10,
//   },
//   selectedProduct: {
//     color: 'green',
//     fontSize: 16,
//     marginRight: 10,
//   },
//   selectProductButton: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   selectProductText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)', // Transparent background for modal
//   },
//   calendarWrapper: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     width: '90%',
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#007bff',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   filterButton: {
//     backgroundColor: '#f1f1f1',
//     borderRadius: wp(2),
//     padding: wp(2.5),
//     marginHorizontal: wp(1.5),
//   },
//   filterText: {
//     color: '#666',
//     fontSize: FontSize(14),
//   },
// });

// export default AddCoupon;














import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, fetchProducts } from '../../../redux/Coupon/CouponSlice';
import { Picker } from '@react-native-picker/picker';
import CommonCalendar from '../../../utils/datepicker';
import { wp,hp,FontSize } from '../../../utils/responsiveUtils';

const AddCoupon = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.coupons.loading);
  const products = useSelector((state) => state.coupons.products);

  const [activeTab, setActiveTab] = useState('restriction');
  const [formData, setFormData] = useState({
    couponCode: '',
    description: '',
    discountType: 'Percentage Discount',
    couponAmount: '',
    expiry: '',
    allowFreeShipping: false,
    showOnStore: false,
    minimumSpend: 0,
    maximumSpend: 0,
    individualUseOnly: false,
    excludeSaleItems: false,
    products: [], // Selected products
    excludedProducts: [], // Excluded products
    emailRestrictions: '', // Email restriction input
    usageLimitPerCoupon: 0,
    limitUsageToXItems: 0,
    usageLimitPerUser: 0,
  });

  const [productSearch, setProductSearch] = useState(''); // Search for products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on search
  const [selectedProducts, setSelectedProducts] = useState([]); // Selected products for the coupon
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [selectAll, setSelectAll] = useState(false); // State for "Select All" switch

  const [isExcludeModalVisible, setIsExcludeModalVisible] = useState(false);
  const [excludedProducts, setExcludedProducts] = useState([]); // Selected products to exclude
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch products only when the user types something in the search box
  useEffect(() => {
    if (productSearch.length > 0) {
      dispatch(fetchProducts(productSearch)); // Fetch products based on search term
    } else {
      setFilteredProducts([]); // Clear filtered products if search is empty
    }
  }, [productSearch, dispatch]);

  // Update filtered products when products list is updated
  useEffect(() => {
    setFilteredProducts(products);
    if (selectAll && products.length > 0) {
      setSelectedProducts(products.map((product) => product.title)); // Select all products if "Select All" is enabled
    }
  }, [products, selectAll]);

  const handleProductSelect = (product) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleDateChange = (date) => {
    // Check if the date is a valid Date object
    const selectedDate = date instanceof Date ? date : new Date(date);
    
    // Ensure the date is valid
    if (!isNaN(selectedDate.getTime())) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      setFormData({ ...formData, expiry: formattedDate });
      setIsCalendarVisible(false); // Close the calendar after selecting the date
    } else {
      console.error('Invalid date selected:', date); // Log invalid date for debugging
    }
  };

  const handleExcludeProductSelect = (product) => {
    if (excludedProducts.includes(product)) {
      setExcludedProducts(excludedProducts.filter((p) => p !== product));
    } else {
      setExcludedProducts([...excludedProducts, product]);

      // If a product is excluded, remove it from the selected products list
      if (selectedProducts.includes(product)) {
        setSelectedProducts(selectedProducts.filter((p) => p !== product));
      }
    }
  };

  const handleSaveCoupon = () => {
    console.log('Coupon data saved:', formData);
    
  

    const couponData = {
      ...formData,
      expiry: formData.expiry, 
      couponAmount: formData.couponAmount.toString(),
      minimumSpend: parseFloat(formData.minimumSpend),
      maximumSpend: parseFloat(formData.maximumSpend),
      usageLimitPerCoupon: parseInt(formData.usageLimitPerCoupon),
      limitUsageToXItems: parseInt(formData.limitUsageToXItems),
      usageLimitPerUser: parseInt(formData.usageLimitPerUser),
      products: selectedProducts,
      excludedProducts: excludedProducts || [],
      emailRestrictions: formData.emailRestrictions ? [formData.emailRestrictions] : [],
    };

    console.log('Coupon Data:', couponData);
    dispatch(createCoupon(couponData));
  };

  const renderProductModal = () => (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      onRequestClose={() => setIsModalVisible(false)}
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Search and Select Products</Text>
  
          {/* Select All Products Switch */}
          <View style={styles.switchContainer}>
            <Text>Select All Products</Text>
            <Switch
              value={selectAll}
              onValueChange={(value) => {
                setSelectAll(value);
                if (value) {
                  setSelectedProducts(products.map((product) => product.title)); // Select all products
                  setFilteredProducts(products); // Show all products below when select all is enabled
                } else {
                  setSelectedProducts([]); // Clear selected products
                  setFilteredProducts([]); // Clear filtered products when deselecting all
                }
              }}
            />
          </View>
  
          {/* Disable search box if Select All is enabled */}
          <TextInput
            style={[styles.searchInput, { backgroundColor: selectAll ? '#ddd' : '#fff' }]} // Grey out if disabled
            placeholder="Search product..."
            value={productSearch}
            onChangeText={(text) => setProductSearch(text)}
            editable={!selectAll} // Disable when select all is active
          />
  
          {/* Display the filtered products or all products */}
          {filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.productItem}
                  onPress={() => handleProductSelect(item.title)}
                >
                  <Text
                    style={{
                      color: selectedProducts.includes(item.title) ? 'green' : 'black',
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text>No products found</Text>
          )}
  
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
  

  const renderExcludeProductModal = () => (
    <Modal
      visible={isExcludeModalVisible}
      animationType="slide"
      onRequestClose={() => setIsExcludeModalVisible(false)}
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Exclude Products</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search product to exclude..."
            value={productSearch}
            onChangeText={(text) => setProductSearch(text)}
          />

          {filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.productItem}
                  onPress={() => handleExcludeProductSelect(item.title)}
                >
                  <Text
                    style={{
                      color: excludedProducts.includes(item.title) ? 'red' : 'black',
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text>No products found</Text>
          )}

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setIsExcludeModalVisible(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderRestrictionContent = () => (
    <>
      {/* Include Products Section */}
      <Text style={styles.sectionTitle}>Include Products</Text>
      <TouchableOpacity
        style={styles.selectProductButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectProductText}>Select Products</Text>
      </TouchableOpacity>
      {selectedProducts.length > 0 && (
        <View style={styles.selectedProductsContainer}>
          {selectedProducts.map((product, index) => (
            <Text key={index} style={styles.selectedProduct}>
              {product}
            </Text>
          ))}
        </View>
      )}

      {/* Exclude Products Section */}
      <Text style={styles.sectionTitle}>Exclude Products</Text>
      <TouchableOpacity
        style={styles.selectProductButton}
        onPress={() => setIsExcludeModalVisible(true)}
      >
        <Text style={styles.selectProductText}>Exclude Products</Text>
      </TouchableOpacity>
      {excludedProducts.length > 0 && (
        <View style={styles.selectedProductsContainer}>
          {excludedProducts.map((product, index) => (
            <Text key={index} style={styles.selectedProduct}>
              {product}
            </Text>
          ))}
        </View>
      )}

      {/* Minimum Spend */}
      <Text style={styles.sectionTitle}>Minimum Spend</Text>
      <TextInput
        style={styles.input}
        value={formData.minimumSpend.toString()}
        onChangeText={(value) => setFormData({ ...formData, minimumSpend: value })}
        placeholder="Minimum Spend"
        keyboardType="numeric"
      />

      {/* Maximum Spend */}
      <Text style={styles.sectionTitle}>Maximum Spend</Text>
      <TextInput
        style={styles.input}
        value={formData.maximumSpend.toString()}
        onChangeText={(value) => setFormData({ ...formData, maximumSpend: value })}
        placeholder="Maximum Spend"
        keyboardType="numeric"
      />

      {/* Usage Limit Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usage limit per coupon</Text>
        <TextInput
          style={styles.input}
          value={formData.usageLimitPerCoupon?.toString()}
          onChangeText={(value) => setFormData({ ...formData, usageLimitPerCoupon: value })}
          placeholder="Usage limit per coupon"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usage limit per user</Text>
        <TextInput
          style={styles.input}
          value={formData.usageLimitPerUser?.toString()}
          onChangeText={(value) => setFormData({ ...formData, usageLimitPerUser: value })}
          placeholder="Usage limit per user"
          keyboardType="numeric"
        />
      </View>
    </>
  )

  return (
    <ScrollView style={styles.container}>
      {renderProductModal()}
      {renderExcludeProductModal()}
      <Text style={styles.title}>Create New Coupon</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Coupon Code</Text>
        <TextInput
          style={styles.input}
          value={formData.couponCode}
          onChangeText={(value) => setFormData({ ...formData, couponCode: value })}
          placeholder="Enter Coupon Code"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={formData.description}
          onChangeText={(value) => setFormData({ ...formData, description: value })}
          placeholder="Description"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Discount Type</Text>
        <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.discountType}
          onValueChange={(itemValue) => setFormData({ ...formData, discountType: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="Percentage Discount" value="Percentage Discount" />
          <Picker.Item label="Fixed Product Discount" value="Fixed Product Discount" />
        </Picker>
      </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Coupon Amount</Text>
        <TextInput
          style={styles.input}
          value={formData.couponAmount.toString()}
          onChangeText={(value) => setFormData({ ...formData, couponAmount: value })}
          placeholder="Coupon Amount"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Expiry Date</Text>
        <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
          <TextInput
            style={styles.input}
            value={formData.expiry}
            placeholder="Select Expiry Date"
            editable={false} // Prevent editing directly
          />
        </TouchableOpacity>
      </View>

      <Modal visible={isCalendarVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.calendarWrapper}>
          <CommonCalendar
          visible={isCalendarVisible}
          onClose={() => setIsCalendarVisible(false)}
          onDateChange={handleDateChange}
          selectedDate={selectedDate}
        />
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsCalendarVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



      <View style={styles.switchContainer}>
        <View style={styles.switchItem}>
          <Text style={styles.label}>Allow Free Shipping</Text>
          <Switch
            value={formData.allowFreeShipping}
            onValueChange={(value) => setFormData({ ...formData, allowFreeShipping: value })}
          />
        </View>
        <View style={styles.switchItem}>
          <Text style={styles.label}>Show on Store</Text>
          <Switch
            value={formData.showOnStore}
            onValueChange={(value) => setFormData({ ...formData, showOnStore: value })}
          />
        </View>
      </View>
      <View style={{ padding: 20 }}>
        {/* Tab Navigation */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'restriction' && styles.activeTab]}
            onPress={() => setActiveTab('restriction')}
          >
            <Text style={styles.tabText}>Restriction</Text>
            {activeTab === 'restriction' && <View style={styles.underline} />}
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={[styles.tabButton, activeTab === 'limits' && styles.activeTab]}
            onPress={() => setActiveTab('limits')}
          >
            <Text style={styles.tabText}>Limits</Text>
            {activeTab === 'limits' && <View style={styles.underline} />}
          </TouchableOpacity> */}
        </View>

        {/* Render Content based on Active Tab */}
        {activeTab === 'restriction' && renderRestrictionContent()}
        {/* {activeTab === 'limits' && renderLimitsContent()} */}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveCoupon} disabled={loading}>
        <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Add Coupon'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
  };

  const styles = {
    container: {
      flex: 1,
      padding: wp(4),
      backgroundColor: '#fff',
      // marginBottom:hp(1.5)
    },
    title: {
      fontSize: FontSize(24),
      fontWeight: 'bold',
      marginBottom: hp(2),
      color: '#373737',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 10,
      backgroundColor: '#fff',
    },
    picker: {
      height: 50,
      color: '#333',
      paddingLeft: 10,
    },
    searchInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: wp(3),
      borderRadius: wp(1.5),
      marginBottom: hp(1.5),
    },
    tabsContainer: {
      flexDirection: 'row',
      marginBottom: hp(1),
    },
    tabButton: {
      flex: 1,
      padding: hp(1.5),
      alignItems: 'center',
    },
    activeTab: {
      fontWeight: 'bold',
    },
    tabText: {
      fontSize: FontSize(18),
      color: '#373737',
    },
    underline: {
      height: hp(0.5),
      backgroundColor: 'green',
      width: '100%',
      marginTop: hp(0.5),
    },
    sectionTitle: {
      fontSize: FontSize(18),
      fontWeight: 'bold',
      marginTop: hp(2),
      marginBottom: hp(1),
      color: '#373737',
    },
    inputContainer: {
      marginBottom: hp(1.5),
    },
    label: {
      fontSize: FontSize(16),
      marginBottom: hp(0.5),
      color: '#373737',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: wp(3),
      borderRadius: wp(1.5),
      
    },
    productItem: {
      padding: wp(2.5),
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: hp(1.5),
    },
    switchItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    saveButton: {
      backgroundColor: 'green',
      padding: hp(1.5),
      alignItems: 'center',
      borderRadius:wp(1),
    },
    saveButtonText: {
      color: '#fff',
      fontSize: FontSize(18),
      marginBottom:hp(1.5)
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: wp(5),
      margin: wp(5),
      borderRadius: wp(2),
    },
    modalTitle: {
      fontSize: FontSize(18),
      fontWeight: 'bold',
      marginBottom: hp(1),
    },
    modalActions: {
      marginTop: hp(1),
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    doneButton: {
      backgroundColor: 'green',
      padding: hp(1.5),
      borderRadius: wp(1.5),
    },
    doneButtonText: {
      color: '#fff',
      fontSize: FontSize(16),
    },
    selectedProductsContainer: {
      marginTop: hp(1),
    },
    selectedProduct: {
      color: 'green',
      fontSize: FontSize(16),
      marginRight: wp(2),
    },
    selectProductButton: {
      backgroundColor: '#007BFF',
      padding: hp(1.5),
      borderRadius: wp(1.5),
      marginTop: hp(1),
      marginBottom: hp(1),
    },
    selectProductText: {
      color: '#fff',
      textAlign: 'center',
    },
    calendarWrapper: {
      backgroundColor: '#fff',
      borderRadius: wp(2),
      padding: wp(5),
      width: '90%',
    },
    closeButton: {
      marginTop: hp(1),
      padding: hp(1.5),
      backgroundColor: '#007bff',
      borderRadius: wp(1.5),
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    filterButton: {
      backgroundColor: '#f1f1f1',
      borderRadius: wp(2),
      padding: wp(2.5),
      marginHorizontal: wp(1.5),
    },
    filterText: {
      color: '#666',
      fontSize: FontSize(14),
    },
  };
  
  export default AddCoupon;
  
